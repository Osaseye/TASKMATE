import React, { useState } from 'react';

const AdminSettings = () => {
    // MOCK DATA for Admin Settings
    const [platformSettings, setPlatformSettings] = useState({
        commissionRate: 10,
        enableNewRegistrations: true,
        maintenanceMode: false,
        supportEmail: 'admin@taskmate.ng',
        maxJobRadius: 25, // km
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlatformSettings({
            ...platformSettings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = () => {
        // Logic to save settings to backend
        console.log('Settings Saved:', platformSettings);
        alert('Settings updated successfully!');
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h2>
                <p className="text-gray-500">Configure global parameters for the TaskMate platform.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
                {/* Financial Settings */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Financials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                            <input
                                type="number"
                                name="commissionRate"
                                value={platformSettings.commissionRate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1">Percentage taken from each completed job.</p>
                        </div>
                    </div>
                </div>

                {/* Operations Settings */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Operations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                            <input
                                type="email"
                                name="supportEmail"
                                value={platformSettings.supportEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Job Radius (km)</label>
                            <input
                                type="number"
                                name="maxJobRadius"
                                value={platformSettings.maxJobRadius}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1">Maximum distance for job matching.</p>
                        </div>
                    </div>
                </div>

                {/* System Toggle Settings */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">System Controls</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <h4 className="font-medium text-gray-900">New Registrations</h4>
                                <p className="text-sm text-gray-500">Allow new providers and customers to sign up.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="enableNewRegistrations"
                                    checked={platformSettings.enableNewRegistrations}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                         <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                            <div>
                                <h4 className="font-medium text-red-900">Maintenance Mode</h4>
                                <p className="text-sm text-red-500">Suspend all platform activity for updates.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={platformSettings.maintenanceMode}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-colors shadow-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;