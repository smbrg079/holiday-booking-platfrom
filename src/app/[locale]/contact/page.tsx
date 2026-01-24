import React from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

const ContactPage = () => {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left Column: Info */}
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 mb-8">Get in Touch</h1>
                        <p className="text-slate-500 text-lg mb-12 max-w-lg">
                            Have questions about a booking or want to partner with us? Our team is available 24/7 to assist you.
                        </p>

                        <div className="space-y-10">
                            <div className="flex items-start space-x-6 group">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Email Us</h3>
                                    <p className="text-slate-500 mb-2">Our support team will reply within 24h.</p>
                                    <p className="font-bold text-indigo-600">support@holidaysync.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Call Us</h3>
                                    <p className="text-slate-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                                    <p className="font-bold text-emerald-600">+1 (555) 000-0000</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                                    <p className="text-slate-500 mb-2">Come say hello at our office.</p>
                                    <p className="font-bold text-amber-600">123 Travel Lane, San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-slate-50 p-12 rounded-[3rem] shadow-inner">
                        <div className="flex items-center space-x-3 text-slate-900 font-bold mb-8">
                            <MessageSquare className="text-indigo-600" />
                            <span>Send us a message</span>
                        </div>

                        <form className="space-y-6 text-slate-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                                <select className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-indigo-500">
                                    <option>General Inquiry</option>
                                    <option>Booking Issue</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                                <textarea rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
                            </div>

                            <button className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-3">
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
