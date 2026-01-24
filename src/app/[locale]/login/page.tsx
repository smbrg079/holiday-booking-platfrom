'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ShieldCheck, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { Link, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const LoginPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Invalid email or password')
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
            >
                {/* Left Column: Form */}
                <div className="p-12 md:p-16 flex flex-col justify-center">
                    <div className="mb-10">
                        <Link href="/" className="inline-block mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <span className="text-white font-bold text-2xl">H</span>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-400 font-medium">
                            Log in to manage your bookings and explore more adventures.
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3 mb-8">
                        <button
                            onClick={() => signIn('google', { callbackUrl })}
                            className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all group"
                        >
                            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" />
                            <span className="font-bold text-slate-700 text-sm">Continue with Google</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-bold tracking-wider">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed group mt-6"
                        >
                            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?{' '}
                            <Link href="/auth/register" className="text-indigo-600 font-bold hover:text-indigo-700">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            <span>Secure & Private Connection</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual */}
                <div className="relative hidden md:block">
                    <Image
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Login Visual"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-slate-900/40 backdrop-blur-[1px]" />
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30"
                        >
                            <p className="text-xl font-medium leading-relaxed mb-4">
                                &quot;The journey of a thousand miles begins with a single step. Let HolidaySync take that step with you.&quot;
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" width={40} height={40} alt="Avatar" />
                                </div>
                                <div>
                                    <p className="font-bold">Sarah Jenkins</p>
                                    <p className="text-xs text-white/60">Adventure Enthusiast</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginPage
