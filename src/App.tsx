
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store/store';
import Header from './components/common/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Surveys from './pages/Surveys';
import SurveyDetail from './pages/SurveyDetail';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
    <>
        <Header />
        <main className="container mx-auto px-4 py-8">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/surveys" element={<PrivateRoute><Surveys /></PrivateRoute>} />
                <Route path="/surveys/:id" element={<PrivateRoute><SurveyDetail /></PrivateRoute>} />
            </Routes>
        </main>
    </>
);

const App = () => (
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>
);

export default App;
