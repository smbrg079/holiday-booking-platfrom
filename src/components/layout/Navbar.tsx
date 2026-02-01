'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { Menu, X, User, Search, LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
    const t = useTranslations('Navbar');
    const { data: session, status } = useSession()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const accountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!isAccountOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
                setIsAccountOpen(false)
            }
        }
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsAccountOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isAccountOpen])

    const navLinks = [
        { name: t('destinations'), href: '/destinations' },
        { name: t('activities'), href: '/activities' },
        { name: t('tripPlanner'), href: '/planner' },
        { name: t('about'), href: '/about' },
        { name: t('contact'), href: '/contact' },
    ]

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <span className={cn(
                        "text-2xl font-bold tracking-tight",
                        isScrolled ? "text-slate-900" : "text-white"
                    )}>
                        Holiday<span className="text-indigo-600">Sync</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-indigo-500",
                                isScrolled ? "text-slate-600" : "text-white/90"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="hidden lg:block">
                        <LanguageSwitcher isScrolled={isScrolled} />
                    </div>
                    <Link
                        href="/activities"
                        aria-label={t('activities')}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
                        )}
                    >
                        <Search size={20} />
                    </Link>

                    <div className="relative" ref={accountRef}>
                        {status === 'authenticated' ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                                    aria-expanded={isAccountOpen}
                                    aria-haspopup="menu"
                                    aria-controls="account-menu"
                                    id="account-menu-button"
                                    className={cn(
                                        "flex items-center space-x-2 p-1 pl-3 rounded-full transition-all border",
                                        isScrolled
                                            ? "text-slate-600 border-slate-200 hover:bg-slate-50"
                                            : "text-white border-white/20 hover:bg-white/10"
                                    )}
                                >
                                    <span className="text-sm font-bold truncate max-w-[80px]">
                                        {session.user?.name?.split(' ')[0]}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/10">
                                        {session.user?.name?.[0]}
                                    </div>
                                </button>

                                {isAccountOpen && (
                                    <div id="account-menu" role="menu" aria-labelledby="account-menu-button" className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 animate-in fade-in zoom-in duration-200 origin-top-right">
                                        <div className="px-6 py-4 border-b border-slate-50">
                                            <p className="text-sm font-black text-slate-900">{session.user?.name}</p>
                                            <p className="text-xs text-slate-400 font-medium truncate">{session.user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/dashboard"
                                                className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all group"
                                                onClick={() => setIsAccountOpen(false)}
                                            >
                                                <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-bold">{t('myBookings')}</span>
                                            </Link>
                                            {session.user?.role === 'ADMIN' && (
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all group"
                                                    onClick={() => setIsAccountOpen(false)}
                                                >
                                                    <Settings size={18} className="group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-bold">{t('adminConsole')}</span>
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full flex items-center space-x-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
                                            >
                                                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                                                <span className="text-sm font-bold">{t('signOut')}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className={cn(
                                "flex items-center space-x-1 px-5 py-2.5 rounded-full font-bold text-sm transition-all",
                                isScrolled
                                    ? "bg-indigo-600 text-white hover:bg-slate-900 shadow-md shadow-indigo-100"
                                    : "bg-white text-slate-900 hover:bg-slate-50 shadow-xl"
                            )}>
                                <User size={18} className="mr-2" />
                                <span>{t('signIn')}</span>
                            </Link>
                        )}
                    </div>

                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} className={isScrolled ? "text-slate-900" : "text-white"} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4 lg:hidden">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('selectLanguage')}</span>
                            <LanguageSwitcher />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-slate-900 hover:text-indigo-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-slate-100" />
                        {status === 'authenticated' ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center space-x-3 text-lg font-medium text-slate-900"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard size={20} className="text-indigo-600" />
                                    <span>{t('myBookings')}</span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center space-x-3 text-lg font-medium text-rose-600"
                                >
                                    <LogOut size={20} />
                                    <span>{t('signOut')}</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center space-x-2 text-lg font-medium text-slate-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <User size={20} />
                                <span>{t('signIn')}</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
