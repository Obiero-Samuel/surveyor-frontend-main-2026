import React, { Suspense, lazy } from 'react';
import AnimatedGradient from './components/backgrounds/AnimatedGradient';
import ParticleBackground from './components/backgrounds/ParticleBackground';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Surveys = lazy(() => import('./pages/Surveys'));
const SurveyDetail = lazy(() => import('./pages/SurveyDetail'));

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Animated creative backgrounds */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <AnimatedGradient />
                <ParticleBackground particleCount={80} />
            </div>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <Header />

            <main className="container mx-auto px-4 py-8">
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/surveys"
                            element={
                                <PrivateRoute>
                                    <Surveys />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/surveys/:id"
                            element={
                                <PrivateRoute>
                                    <SurveyDetail />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;