"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2, Sparkles, Calendar, Users, Wallet, Sun, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getPlan } from '@/app/actions/ai';
import { GeneratedItinerary, ItineraryRequest } from '@/types/ai';
import { motion, AnimatePresence } from 'framer-motion';

const MOROCCAN_HERO = "/images/ai-planner-hero.png";



export default function TripPlannerPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<GeneratedItinerary | null>(null);

    const [formData, setFormData] = useState<ItineraryRequest>({
        duration: 5,
        travelers: 'couple',
        interests: [],
        budget: 'Medium'
    });

    const interestsOptions = ['Surfing', 'Culture', 'Relaxation', 'Food', 'Hiking', 'Photography', 'Nightlife'];

    const toggleInterest = (interest: string) => {
        setFormData(prev => {
            const exists = prev.interests.includes(interest);
            if (exists) return { ...prev, interests: prev.interests.filter(i => i !== interest) };
            return { ...prev, interests: [...prev.interests, interest] };
        });
    };

    const handleSubmit = async () => {
        setStep(2);
        setLoading(true);
        try {
            const itinerary = await getPlan(formData);
            setResult(itinerary);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={MOROCCAN_HERO}
                    alt="AI Trip Planner Hero"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full text-white text-sm font-black mb-8 border border-white/20 shadow-2xl"
                    >
                        <Sparkles size={16} />
                        <span className="uppercase tracking-widest">Ayoub AI Assistant</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                    >
                        Craft Your <span className="text-amber-400">Perfect</span> Journey
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed"
                    >
                        Tell us your dreams, and our AI guide will curate a personlized Moroccan itinerary tailored specifically to your taste and pace.
                    </motion.p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-24 pb-32">
                <AnimatePresence mode="wait">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <motion.div
                            key="form-step"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-200/50 p-8 md:p-16 border border-slate-100"
                        >
                            <div className="space-y-12">
                                <section>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Calendar size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">How long is your escape?</h2>
                                    </div>
                                    <div className="px-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="14"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                            className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                                        />
                                        <div className="flex justify-between mt-4">
                                            <span className="text-slate-400 font-bold">1 Day</span>
                                            <span className="text-2xl font-black text-indigo-600">{formData.duration} Days</span>
                                            <span className="text-slate-400 font-bold">14 Days</span>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-50" />

                                <section>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Users size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">With whom are you exploring?</h2>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { id: 'solo', label: 'Solo' },
                                            { id: 'couple', label: 'Couple' },
                                            { id: 'family', label: 'Family' },
                                            { id: 'friends', label: 'Friends' }
                                        ].map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => setFormData({ ...formData, travelers: item.id })}
                                                className={`py-4 rounded-[1.5rem] font-bold text-sm border-2 transition-all ${formData.travelers === item.id
                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100'
                                                    : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'
                                                    }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <hr className="border-slate-50" />

                                <section>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Sun size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">Your heart&apos;s desires</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {interestsOptions.map(interest => (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={`px-8 py-3 rounded-full text-sm font-black transition-all border-2 ${formData.interests.includes(interest)
                                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-2px]'
                                                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <hr className="border-slate-50" />

                                <section>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Wallet size={20} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">Budget preference</h2>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Budget', 'Medium', 'Luxury'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFormData({ ...formData, budget: opt })}
                                                className={`py-4 rounded-[1.5rem] text-sm font-black border-2 transition-all ${formData.budget === opt
                                                    ? 'border-amber-400 bg-amber-50 text-amber-700 shadow-lg shadow-amber-100'
                                                    : 'border-slate-100 bg-white text-slate-500 hover:border-amber-100'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <button
                                    onClick={handleSubmit}
                                    disabled={formData.interests.length === 0}
                                    className="group w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl flex items-center justify-center gap-3"
                                >
                                    Generate My Adventure
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Loading Result */}
                    {step === 2 && loading && (
                        <motion.div
                            key="loading-step"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[3rem] shadow-2xl p-20 flex flex-col items-center justify-center text-center border border-slate-100 min-h-[500px]"
                        >
                            <Loader2 size={64} className="animate-spin text-indigo-600 mb-8" />
                            <h3 className="text-3xl font-black text-slate-900 mb-4">Consulting with Ayoub...</h3>
                            <p className="text-slate-500 text-xl font-medium max-w-sm">We are meticulously braiding your perfect Moroccan experience together.</p>
                        </motion.div>
                    )}

                    {/* Step 2: Result Itinerary */}
                    {step === 2 && !loading && result && (
                        <motion.div
                            key="result-step"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                                <div className="p-12 md:p-20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-6">
                                            <CheckCircle2 size={16} />
                                            Generated Successfully
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">{result.title}</h2>
                                        <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
                                            {result.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-8 md:p-16 space-y-16">
                                    {result.days.map((day, idx) => (
                                        <div key={day.day} className="relative last:pb-0">
                                            <div className="flex items-start gap-8">
                                                <div className="hidden md:flex flex-col items-center pt-2">
                                                    <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                                                        {day.day}
                                                    </div>
                                                    {idx !== result.days.length - 1 && (
                                                        <div className="w-1 h-32 bg-slate-100 mt-4 rounded-full" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-8">
                                                        <span className="md:hidden w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">
                                                            {day.day}
                                                        </span>
                                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{day.title}</h3>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        {[
                                                            { time: 'Morning', content: day.morning, color: 'bg-amber-50 text-amber-900 border-amber-100' },
                                                            { time: 'Afternoon', content: day.afternoon, color: 'bg-indigo-50 text-indigo-900 border-indigo-100' },
                                                            { time: 'Evening', content: day.evening, color: 'bg-slate-50 text-slate-900 border-slate-200' },
                                                        ].map((item, i) => (
                                                            <div key={i} className={`p-8 rounded-[2rem] border-2 transition-all hover:scale-105 duration-300 ${item.color}`}>
                                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-4">{item.time}</span>
                                                                <p className="font-bold leading-relaxed">{item.content}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center border-t border-slate-50">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-10 py-5 rounded-[2rem] font-black text-slate-600 border-2 border-slate-100 hover:bg-slate-50 transition-all"
                                        >
                                            Adjust Preferences
                                        </button>
                                        <button className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black hover:bg-slate-900 shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3">
                                            Save Full Itinerary
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {step === 2 && !loading && !result && (
                        <motion.div
                            key="error-step"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3rem] shadow-2xl p-20 text-center border-2 border-dashed border-slate-100"
                        >
                            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-8">
                                <Sparkles size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4">Something went wrong</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Ayoub is currently taking a break. Please try to generate your plan again in a moment.</p>
                            <button
                                onClick={() => setStep(1)}
                                className="px-10 py-4 bg-slate-900 text-white rounded-full font-black shadow-xl"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Local Tip Footer */}
                <div className="mt-20 flex items-center justify-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Ayoub AI Powered by HolidaySync</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
            </div>
        </div>
    );
}
