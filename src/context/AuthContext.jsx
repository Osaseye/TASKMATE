import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set up real-time listener for user document
        const docRef = doc(db, "users", user.uid);
        unsubscribeFirestore = onSnapshot(docRef, (docSnap) => {
           if (docSnap.exists()) {
             setCurrentUser({ ...user, ...docSnap.data() });
           } else {
             setCurrentUser(user);
           }
           setLoading(false);
        }, (error) => {
           console.error("Error listening to user data:", error);
           setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (data) => {
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, data, { merge: true });
    
    // Update local state
    setCurrentUser(prev => ({ ...prev, ...data }));
  };

  const register = async (email, password, name, role) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update Auth Profile
    await updateProfile(user, { displayName: name });

    // Create User Document in Firestore
    const userData = {
      uid: user.uid,
      email: email,
      displayName: name,
      role: role, // 'customer' or 'provider'
      createdAt: new Date().toISOString(),
      isVerified: role === 'customer' // Customers auto-verified, providers need review
    };

    await setDoc(doc(db, "users", user.uid), userData);
    
    // IMMEDIATE STATE UPDATE: Ensure currentUser has role before navigation occurs
    setCurrentUser({ ...user, ...userData });

    return user;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
