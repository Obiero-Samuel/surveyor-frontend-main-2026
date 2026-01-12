import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Dashboard: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to Surveyor</h1>
            <p className="text-gray-600 mb-8">
                Hi {user?.name}, your main UI is restored! Start building your surveys or explore existing ones.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Link
                    to="/surveys"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Surveys</h2>
                    <p>Create, edit, and analyze your surveys</p>
                </Link>

                <button className="bg-white border border-gray-300 px-8 py-4 rounded-lg shadow hover:bg-gray-50 transition duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Analytics</h2>
                    <p className="text-gray-600">View survey insights and reports</p>
                </button>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/surveys?create=true"
                        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                    >
                        Create New Survey
                    </Link>
                    <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300">
                        Import Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
