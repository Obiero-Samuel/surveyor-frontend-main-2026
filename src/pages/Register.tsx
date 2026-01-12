

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Logo SVG for left panel
const Logo = () => (
    <svg className="w-12 h-12 mb-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="url(#paint0_linear)" />
        <path d="M24 14L34 34H14L24 14Z" fill="white" />
        <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
        </defs>
    </svg>
);

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Password strength checker
    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(formData.password));
    }, [formData.password]);

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) errors.name = 'Name is required';
        else if (formData.name.length < 2) errors.name = 'Name must be at least 2 characters';

        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
        else if (passwordStrength < 3) errors.password = 'Password is too weak';

        if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        try {
            const result = await dispatch(register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })).unwrap();

            toast.success('Account created successfully!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err: any) {
            toast.error(err.message || 'Registration failed');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const passwordRequirements = [
        { regex: /.{8,}/, label: 'At least 8 characters' },
        { regex: /[A-Z]/, label: 'One uppercase letter' },
        { regex: /[a-z]/, label: 'One lowercase letter' },
        { regex: /[0-9]/, label: 'One number' },
        { regex: /[^A-Za-z0-9]/, label: 'One special character' },
    ];

    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-emerald-600'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-2 md:p-6 text-2xl">
            <Toaster position="top-right" />
            <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white/90 backdrop-blur-lg border border-gray-100 animate-fadeInUp">
                {/* Left side - Brand/Info */}
                <div className="md:w-2/5 flex flex-col justify-between bg-gradient-to-br from-blue-700/90 to-indigo-800/90 text-white p-8 md:p-12 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <Logo />
                        <Link to="/" className="text-3xl font-extrabold mb-4 block gradient-text tracking-tight hover:opacity-90 transition">Surveyor Pro</Link>
                        <h1 className="text-4xl font-extrabold mb-4 leading-tight">Join Our Community</h1>
                        <p className="text-blue-100 text-lg mb-8 font-medium">Create powerful surveys, collect meaningful insights, and make data-driven decisions with our advanced platform.</p>
                    </div>
                    <div className="relative z-10 space-y-6 mt-8">
                        <div className="flex items-center space-x-4">
                            <CheckCircleIcon className="w-6 h-6 text-green-300" />
                            <div>
                                <h3 className="font-semibold">Unlimited Surveys</h3>
                                <p className="text-blue-100 text-xs">Create as many surveys as you need</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CheckCircleIcon className="w-6 h-6 text-green-300" />
                            <div>
                                <h3 className="font-semibold">Real-time Analytics</h3>
                                <p className="text-blue-100 text-xs">Get instant insights from your data</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CheckCircleIcon className="w-6 h-6 text-green-300" />
                            <div>
                                <h3 className="font-semibold">Secure & Compliant</h3>
                                <p className="text-blue-100 text-xs">GDPR compliant with enterprise security</p>
                            </div>
                        </div>
                    </div>
                    <p className="relative z-10 text-blue-200 text-xs mt-8 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white font-semibold underline hover:text-blue-200">Sign in here</Link>
                    </p>
                </div>
                {/* Right side - Registration Form */}
                <div className="md:w-3/5 flex flex-col justify-center p-6 md:p-12 bg-white/95">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 gradient-text">Create Your Account</h2>
                        <p className="text-gray-500">Start your journey with us today</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-[20px]">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 transition`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {formErrors.name && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircleIcon className="w-6 h-6 mr-1" />
                                    {formErrors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-[20px]">Email Address</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 transition`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {formErrors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircleIcon className="w-6 h-6 mr-1" />
                                    {formErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-[20px]">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`pl-10 pr-10 w-full px-4 py-3 rounded-lg border ${formErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 transition`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            <div className="mt-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">Password strength</span>
                                    <span className={`text-sm font-medium ${passwordStrength >= 4 ? 'text-green-600' : passwordStrength >= 3 ? 'text-blue-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {strengthLabels[passwordStrength]}
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${strengthColors[passwordStrength]} transition-all duration-300`}
                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center">
                                            {req.regex.test(formData.password) ? (
                                                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                                            ) : (
                                                <XCircleIcon className="w-6 h-6 text-gray-300 mr-2" />
                                            )}
                                            <span className={`text-xs ${req.regex.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {formErrors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircleIcon className="w-6 h-6 mr-1" />
                                    {formErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-[20px]">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`pl-10 pr-10 w-full px-4 py-3 rounded-lg border ${formErrors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 transition`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {formErrors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircleIcon className="w-4 h-4 mr-1" />
                                    {formErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    id="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                                />
                                <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                                        <span className="text-[20px]">I agree to the</span>{' '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {formErrors.acceptTerms && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircleIcon className="w-4 h-4 mr-1" />
                                    {formErrors.acceptTerms}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 px-4 rounded-lg text-white font-semibold ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Social Login */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                <svg className="w-5 h-5 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
