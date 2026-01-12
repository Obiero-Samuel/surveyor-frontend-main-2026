import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import ThemeToggle from '../theme/ThemeToggle';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md transition-colors">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    Surveyor
                </Link>

                <nav className="flex items-center space-x-6">
                    <ThemeToggle />
                    {user ? (
                        <>
                            <Link to="/surveys" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
                                Surveys
                            </Link>
                            <span className="text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
