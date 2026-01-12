
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import HoverCard from '../components/animated/HoverCard';
import GlassCard from '../components/effects/GlassCard';
import NeumorphicButton from '../components/effects/NeumorphicButton';
import FlipCard from '../components/3d/FlipCard';
import ParallaxSection from '../components/3d/ParallaxSection';
import MicroInteractionInput from '../components/interactive/MicroInteractionInput';

const Dashboard: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    // Demo state for MicroInteractionInput
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");
    const [inputSuccess, setInputSuccess] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 3) {
            setInputError("Too short!");
            setInputSuccess(false);
        } else if (e.target.value.length >= 3) {
            setInputError("");
            setInputSuccess(true);
        } else {
            setInputError("");
            setInputSuccess(false);
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-gradient animate-text-gradient">Welcome to Surveyor</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Hi {user?.name}, your main UI is restored! Start building your surveys or explore existing ones.
            </p>

            {/* Parallax creative section */}
            <ParallaxSection speed={0.7} className="mb-12">
                <div className="flex flex-wrap justify-center gap-8">
                    {/* GlassCard demo */}
                    <GlassCard className="w-80 p-6">
                        <h2 className="text-2xl font-semibold mb-2 text-gradient">Glassmorphism Card</h2>
                        <p className="mb-4">A modern glass effect with blur and gradient border.</p>
                        <NeumorphicButton>Try Me</NeumorphicButton>
                    </GlassCard>

                    {/* HoverCard demo */}
                    <HoverCard className="w-80 p-6 bg-white/80 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Animated Hover Card</h2>
                        <p>Hover to see scale and rotation animation.</p>
                    </HoverCard>

                    {/* FlipCard demo */}
                    <FlipCard
                        front={
                            <div className="flex flex-col items-center justify-center h-full">
                                <span className="text-3xl">🃏</span>
                                <span className="mt-2 font-semibold">Flip Me!</span>
                            </div>
                        }
                        back={
                            <div className="flex flex-col items-center justify-center h-full">
                                <span className="text-3xl">🎉</span>
                                <span className="mt-2 font-semibold">Surprise!</span>
                            </div>
                        }
                        className="mx-auto"
                    />
                </div>
            </ParallaxSection>

            {/* MicroInteractionInput demo */}
            <div className="max-w-md mx-auto mt-12">
                <h3 className="text-xl font-bold mb-4">Microinteraction Input</h3>
                <MicroInteractionInput
                    label="Your Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    error={inputError}
                    success={inputSuccess}
                    placeholder="Type at least 3 characters..."
                />
            </div>

            {/* Quick Actions (original) */}
            <div className="mt-16">
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
