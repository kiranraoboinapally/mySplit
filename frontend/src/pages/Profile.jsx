import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, LogOut, Download, Shield } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleExport = () => {
        alert('Export functionality coming soon!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
                            <p className="text-sm text-gray-500">Manage your account</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h2>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Mail size={16} /> {user.email || 'email@example.com'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">{user.id || 'N/A'}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">Account Type</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">Premium</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    <button
                        onClick={handleExport}
                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Download size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Export Data</p>
                                <p className="text-sm text-gray-500">Download your expense history as CSV</p>
                            </div>
                        </div>
                        <ArrowLeft size={20} className="text-gray-400 rotate-180" />
                    </button>

                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                <Shield size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Privacy & Security</p>
                                <p className="text-sm text-gray-500">Your data is encrypted and secure</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full p-6 flex items-center justify-between hover:bg-red-50 transition-colors text-left group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-200 transition-colors">
                                <LogOut size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-red-600">Sign Out</p>
                                <p className="text-sm text-gray-500">Logout from your account</p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* App Info */}
                <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">mySplit v1.0.0</p>
                    <p className="text-gray-400 text-xs mt-1">Made with ❤️ for better expense tracking</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
