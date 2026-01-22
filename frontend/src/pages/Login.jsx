import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, Loader } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if user already logged in
    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            setLoading(false);
            navigate('/'); // go to dashboard immediately
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="md:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex flex-col justify-center items-center text-white p-12 text-center md:text-left relative overflow-hidden">
                <div className="w-[600px] h-[600px] bg-white/10 rounded-full absolute -top-64 -left-64 blur-3xl animate-pulse"></div>
                <div className="w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full absolute -bottom-32 -right-32 blur-3xl"></div>
                <div className="relative z-10 max-w-md">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-violet-600 text-4xl font-extrabold mb-8 shadow-2xl mx-auto md:mx-0 transform hover:scale-110 transition-transform">₹</div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Welcome Back!</h1>
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                        Track every expense. Split every bill. Master your money.
                    </p>
                    <div className="mt-8 flex items-center gap-4 text-white/70">
                        <div className="flex -space-x-2">
                            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
                            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
                            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
                        </div>
                        <span className="text-sm font-medium">Trusted by 10,000+ users</span>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Sign In</h2>
                        <p className="text-gray-600 text-lg">Access your dashboard</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium flex items-center gap-3 animate-shake">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">⚠</div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                disabled={loading}
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                disabled={loading}
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-5 text-lg rounded-2xl shadow-2xl hover:shadow-violet-500/50 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {loading ? (
                                <>
                                    <Loader size={24} className="animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <LogIn size={24} /> Sign In
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-8 text-center border-t-2 border-gray-100">
                        <p className="text-gray-600 text-lg">
                            Don't have an account? <span className="text-violet-600 font-bold cursor-pointer hover:underline hover:text-fuchsia-600 transition-colors" onClick={() => navigate('/signup')}>Create Account</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
