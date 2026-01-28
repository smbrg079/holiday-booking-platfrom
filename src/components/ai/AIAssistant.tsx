"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User, Sparkles } from 'lucide-react';
import { askAyoub } from '@/app/actions/ai';
import { ChatMessage } from '@/types/ai';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'model',
            text: "Salam! I'm Ayoub, your local AI guide. Need help finding hidden Moroccan gems or planning your surf sessions?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const responseText = await askAyoub(userMsg.text, history);

            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-6 w-[95vw] sm:w-[420px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[600px] shadow-indigo-500/20"
                    >
                        {/* Premium Header */}
                        <div className="bg-slate-900 p-6 flex justify-between items-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-white/20 shadow-lg">
                                        <Sparkles size={24} className="text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-sm"></div>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg tracking-tight">Ayoub <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-indigo-300 font-bold ml-1">v2.0</span></h3>
                                    <p className="text-xs text-white/60 font-medium">Your Personal Moroccan Expert</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm font-medium shadow-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-slate-900 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-5 py-4 rounded-[1.5rem] rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-3">
                                        <Loader2 size={18} className="animate-spin text-indigo-600" />
                                        <span className="text-xs font-bold text-slate-400">Ayoub is drafting...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-50">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Where should I go for sunset?"
                                    className="flex-1 bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600/30 focus:outline-none transition-all placeholder:text-slate-300"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 bg-slate-900 rounded-[1.5rem] shadow-2xl shadow-indigo-500/30 flex items-center justify-center text-white transition-all overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageCircle size={32} className="relative z-10" />

                    {/* Pulsing indicator */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 z-20 animate-pulse" />
                </motion.button>
            )}
        </div>
    );
};

export default AIAssistant;
