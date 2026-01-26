import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MobileNavBar from '../../components/layout/MobileNavBar';

const PostRequest = () => {
    return (
        <div className="font-body bg-gray-50 text-gray-900 min-h-screen">
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto relative p-6 lg:p-10 pb-24">
                    {/* Branding - Top Right */}
                    <div className="absolute top-6 right-6 lg:top-10 lg:right-10 flex items-center gap-2 pointer-events-none select-none opacity-80">
                        <img src="/icon.png" alt="TaskMate" className="h-6 w-6 object-contain" />
                        <span className="font-display font-bold text-lg text-green-700">TaskMate</span>
                    </div>

                    <div className="max-w-3xl mx-auto mt-8">
                        <div className="mb-8">
                            <Link className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mb-4 transition-colors" to="/dashboard">
                                <span className="material-icons-outlined text-lg mr-1">arrow_back</span>
                                Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Post a Request</h1>
                            <p className="mt-2 text-gray-600">Describe the task you need help with in Lagos, Abuja, or anywhere in Nigeria.</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                            <form className="p-6 space-y-8">
                                {/* Task Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                                        <span className="material-icons-outlined text-green-600">edit_note</span>
                                        <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">Task Title</label>
                                            <input 
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 placeholder-gray-400 focus:outline-none border" 
                                                id="title" 
                                                name="title" 
                                                placeholder="e.g., Fix leaking sink in kitchen" 
                                                type="text" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Category</label>
                                                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border focus:outline-none" id="category" name="category">
                                                    <option>Home Repairs</option>
                                                    <option>Cleaning</option>
                                                    <option>Delivery</option>
                                                    <option>IT Support</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">Budget (₦)</label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span className="text-gray-500 sm:text-sm">₦</span>
                                                    </div>
                                                    <input 
                                                        className="block w-full rounded-md border-gray-300 pl-8 focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border focus:outline-none" 
                                                        id="budget" 
                                                        name="budget" 
                                                        placeholder="0.00" 
                                                        type="text" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                                            <textarea 
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 placeholder-gray-400 border focus:outline-none" 
                                                id="description" 
                                                name="description" 
                                                placeholder="Provide more details about the task..." 
                                                rows="4"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Images */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                                        <span className="material-icons-outlined text-green-600">image</span>
                                        <h2 className="text-lg font-semibold text-gray-900">Images</h2>
                                    </div>
                                    <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="text-center">
                                            <span className="material-icons-outlined text-4xl text-gray-400 group-hover:text-green-600 transition-colors">cloud_upload</span>
                                            <div className="mt-4 flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none" htmlFor="file-upload">
                                                    <span>Upload a file</span>
                                                    <input className="sr-only" id="file-upload" name="file-upload" type="file"/>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Urgency */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                                        <span className="material-icons-outlined text-green-600">location_on</span>
                                        <h2 className="text-lg font-semibold text-gray-900">Location & Urgency</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">Service Location</label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="material-icons-outlined text-gray-400 text-sm">place</span>
                                                </div>
                                                <input 
                                                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border focus:outline-none" 
                                                    id="location" 
                                                    name="location" 
                                                    placeholder="Enter address or landmark" 
                                                    type="text" 
                                                />
                                                <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-600 hover:text-green-700 font-medium text-xs" type="button">
                                                    Use Current Location
                                                </button>
                                            </div>
                                            <div className="mt-2 h-32 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="material-icons-outlined">map</span>
                                                    <span>Map Preview</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Urgency Level</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                <label className="cursor-pointer">
                                                    <input className="peer sr-only" name="urgency" type="radio" value="low"/>
                                                    <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500 peer-checked:bg-green-50 transition-all text-center">
                                                        <span className="material-icons-outlined text-gray-400 peer-checked:text-green-600 mb-1 block">hourglass_empty</span>
                                                        <span className="block text-sm font-medium text-gray-900">Low</span>
                                                        <span className="block text-xs text-gray-500">Within a week</span>
                                                    </div>
                                                </label>
                                                <label className="cursor-pointer">
                                                    <input defaultChecked className="peer sr-only" name="urgency" type="radio" value="medium"/>
                                                    <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500 peer-checked:bg-green-50 transition-all text-center">
                                                        <span className="material-icons-outlined text-gray-400 peer-checked:text-green-600 mb-1 block">schedule</span>
                                                        <span className="block text-sm font-medium text-gray-900">Medium</span>
                                                        <span className="block text-xs text-gray-500">Within 48 hours</span>
                                                    </div>
                                                </label>
                                                <label className="cursor-pointer">
                                                    <input className="peer sr-only" name="urgency" type="radio" value="high"/>
                                                    <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-checked:border-red-500 peer-checked:ring-1 peer-checked:ring-red-500 peer-checked:bg-red-50 transition-all text-center">
                                                        <span className="material-icons-outlined text-gray-400 peer-checked:text-red-500 mb-1 block">priority_high</span>
                                                        <span className="block text-sm font-medium text-gray-900 peer-checked:text-red-600">Emergency</span>
                                                        <span className="block text-xs text-gray-500">ASAP</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
                                    <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors" type="button">
                                        Save Draft
                                    </button>
                                    <button className="w-full sm:w-auto px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center gap-2 transition-colors" type="submit">
                                        <span className="material-icons-outlined text-sm">send</span>
                                        Post Request
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <p className="mt-4 text-center text-xs text-gray-400">
                            By posting, you agree to TaskMate's <Link className="underline hover:text-green-600" to="#">Terms of Service</Link> and <Link className="underline hover:text-green-600" to="#">Privacy Policy</Link>.
                        </p>
                    </div>
                </main>
                <MobileNavBar />
            </div>
        </div>
    );
};

export default PostRequest;
