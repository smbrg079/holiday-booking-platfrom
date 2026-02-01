'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const t = useTranslations('Auth')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-4">{t('forgotPasswordTitle')}</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">{t('forgotPasswordDesc')}</p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center space-x-2 w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
        >
          <ArrowLeft size={18} />
          <span>{t('backToLogin')}</span>
        </Link>
      </div>
    </div>
  )
}
