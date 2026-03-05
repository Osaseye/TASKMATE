import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const DataContext = createContext({
    requests: [],
    jobs: [],
    earnings: [],
    loading: true,
    createRequest: async () => {},
    getProviders: async () => []
});

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProviderIds, setSavedProviderIds] = useState([]);

  // Fetch Saved Providers List (Customer)
  useEffect(() => {
    if (currentUser?.role === 'customer') {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
        if (docSnap.exists() && docSnap.data().savedProviders) {
          setSavedProviderIds(docSnap.data().savedProviders);
        } else {
          setSavedProviderIds([]);
        }
      });
      return () => unsub();
    }
  }, [currentUser]);

  // Fetch Requests (Customer) - Real-time
  useEffect(() => {
    if (currentUser && currentUser.role === 'customer') {
      const q = query(
        collection(db, "requests"), 
        where("customerId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // Detect changes for notifications
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
                const data = change.doc.data();
                // Notify if status changes (basic check)
                if (data.status) {
                    toast.info(`Request Update: ${data.title || 'Service'}`, {
                        description: `Status is now: ${data.status}`
                    });
                }
            }
        });

        const userRequests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(userRequests);
        setLoading(false);
      }, (error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
      });
      
      return () => unsubscribe();
    }
  }, [currentUser]);

  // Fetch Jobs (Provider) - Real-time
  useEffect(() => {
    if (currentUser && currentUser.role === 'provider') {
        setLoading(true);
        
        // 1. Listen for OPEN jobs
        const qOpen = query(
            collection(db, "requests"),
            where("status", "==", "Open")
        );

        // 2. Listen for ASSIGNED jobs
        const qAssigned = query(
            collection(db, "requests"),
            where("providerId", "==", currentUser.uid)
        );

        let openJobs = [];
        let assignedJobs = [];

        const updateJobs = () => {
            const combined = [...openJobs, ...assignedJobs].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
            // Sort by createdAt desc in memory
            combined.sort((a,b) => {
               const timeA = a.createdAt?.seconds || 0;
               const timeB = b.createdAt?.seconds || 0;
               return timeB - timeA;
            });
            setJobs(combined);
            setLoading(false);
        };

        const unsubOpen = onSnapshot(qOpen, (snap) => {
            openJobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            updateJobs();
        }, (err) => console.error("Error fetching open jobs:", err));

        const unsubAssigned = onSnapshot(qAssigned, (snap) => {
            assignedJobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            updateJobs();
        }, (err) => console.error("Error fetching assigned jobs:", err));

        return () => {
            unsubOpen();
            unsubAssigned();
        };
    }
  }, [currentUser]);

  const createRequest = async (requestData) => {
    if (!currentUser) return;
    
    try {
        const docRef = await addDoc(collection(db, "requests"), {
            ...requestData,
            customerId: currentUser.uid,
            customerName: currentUser.displayName,
            customerPhoto: currentUser.photoURL,
            status: requestData.status || "Open", // Open, Pending, In Progress, Completed, Cancelled
            createdAt: serverTimestamp(),
        });
        
        // Optimistic update
        const newRequest = { 
            id: docRef.id, 
            ...requestData, 
            customerId: currentUser.uid, 
            status: requestData.status || "Open", 
            createdAt: new Date() 
        };
        setRequests(prev => [newRequest, ...prev]);
        
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
  };

  const toggleSavedProvider = async (providerId) => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    try {
        if (savedProviderIds.includes(providerId)) {
            await updateDoc(userRef, {
                savedProviders: arrayRemove(providerId)
            });
            toast.success("Provider removed from favorites");
        } else {
            await updateDoc(userRef, {
                savedProviders: arrayUnion(providerId)
            });
            toast.success("Provider saved to favorites");
        }
    } catch (error) {
        console.error("Error toggling saved provider:", error);
        toast.error("Failed to update favorites");
    }
  };

  const getProviders = async (category = null) => {
    try {
      let q = query(
        collection(db, "users"), 
        where("role", "==", "provider")
      );
      
      if (category && category !== 'All') {
        // This assumes providers have a 'services' array or 'category' field
        // Since we didn't strictly define provider profile structure yet, 
        // we might need to adjust this based on how provider profile updates are handled.
        // For now, let's assume filtering happens client side or we add a simple check
        // Or we can query by 'preferences' if that's where services are stored
         q = query(
            collection(db, "users"), 
            where("role", "==", "provider"),
            where("preferences", "array-contains", category)
          );
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching providers:", error);
      return [];
    }
  };

  const value = {
    requests,
    jobs,
    earnings,
    loading,
    createRequest,
    getProviders,
    savedProviderIds, 
    toggleSavedProvider
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
