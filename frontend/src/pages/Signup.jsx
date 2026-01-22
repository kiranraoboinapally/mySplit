import React, { useState, useContext, useEffect } from 'react';
import ExpenseService from '../services/expenses';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await ExpenseService.signup(formData.name, formData.email, formData.password);
            setSuccess('Account created successfully! Redirecting to login...');
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Left Side - Brand */}
            <div className="md:w-1/2 bg-gradient-to-br from-violet-600 to-fuchsia-600 flex flex-col justify-center items-center text-white p-12 text-center md:text-left relative overflow-hidden">
                <div className="w-[500px] h-[500px] bg-white/10 rounded-full absolute -top-52 -left-52 blur-3xl"></div>
                <div className="relative z-10 max-w-md">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-violet-600 text-3xl font-extrabold mb-8 shadow-2xl mx-auto md:mx-0">
                        S
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Join mySplit</h1>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                        Start your journey to financial clarity. Track expenses, split bills, and gain insights into your spending.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2">Get started with your free account</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-bounce">
                            <CheckCircle size={18} /> {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                minLength="6"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-gray-500">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-gray-800 hover:scale-[1.02] transform transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <Loader size={20} className="animate-spin" /> Creating Account...
                                </>
                            ) : success ? (
                                <>
                                    <CheckCircle size={20} /> Success!
                                </>
                            ) : (
                                <>
                                    <UserPlus size={20} /> Create Account
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 text-center border-t border-gray-100">
                        <p className="text-gray-500">
                            Already have an account? <span className="text-violet-600 font-bold cursor-pointer hover:underline" onClick={() => navigate('/login')}>Sign In</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
