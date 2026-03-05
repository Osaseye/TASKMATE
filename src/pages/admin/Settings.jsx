import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

const AdminSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        commissionRate: 10,
        enableNewRegistrations: true,
        maintenanceMode: false,
        supportEmail: 'admin@taskmate.ng',
        maxJobRadius: 25,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'settings', 'platform');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setSettings({ ...settings, ...snap.data() });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'platform'), settings, { merge: true });
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
    );

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in relative z-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h2>
                    <p className="text-gray-500">Configure global application parameters.</p>
                </div>
                 <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {saving && <Loader2 className="animate-spin h-4 w-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Financial Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-icons text-green-600">payments</span>
                        Financial Configuration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="number"
                                    name="commissionRate"
                                    value={settings.commissionRate}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    placeholder="10"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">%</span>
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Percentage taken from each completed job.</p>
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                     <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-icons text-blue-600">settings_applications</span>
                        General Configuration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                            <input
                                type="email"
                                name="supportEmail"
                                value={settings.supportEmail}
                                onChange={handleChange}
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Job Radius (km)</label>
                            <input
                                type="number"
                                name="maxJobRadius"
                                value={settings.maxJobRadius}
                                onChange={handleChange}
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                            />
                        </div>
                    </div>
                </div>

                {/* System Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 md:col-span-2">
                     <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-icons text-red-600">security</span>
                        System Controls
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Enable New Registrations</h4>
                                <p className="text-xs text-gray-500">Allow new users to sign up for the platform.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="enableNewRegistrations"
                                    checked={settings.enableNewRegistrations} 
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Maintenance Mode</h4>
                                <p className="text-xs text-gray-500">Temporarily disable access for non-admin users.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode} 
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminSettings;