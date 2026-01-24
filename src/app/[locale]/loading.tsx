'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
            <div className="relative">
                {/* Animated Rings */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-xl">H</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
