import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center text-white">
                <Link to="/" className="text-xl font-bold">ExpenseTracker</Link>
                <div>
                    {user ? (
                        <div className="flex gap-4 items-center">
                            <span>Hello, {user.name}</span>
                            <Link to="/" className="hover:text-gray-200">Dashboard</Link>
                            <Link to="/add-expense" className="hover:text-gray-200">Add Expense</Link>
                            <Link to="/shared" className="hover:text-gray-200">Shared</Link>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="hover:text-gray-200">Login</Link>
                            <Link to="/register" className="hover:text-gray-200">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
