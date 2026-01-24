import React from 'react'
import Image from 'next/image'
import { Heart, Globe, Users, Trophy } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                    alt="About Hero"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Our Story</h1>
                    <p className="text-xl max-w-2xl mx-auto text-white/80">
                        Redefining how the world explores and experiences the beauty of our planet.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div>
                    <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8">Since 2024</span>
                    <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">We believe in travel as a force for good.</h2>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        HolidaySync was born out of a passion for authentic travel experiences. We realized that while the world is full of incredible activities, find them and booking them seamlessly was still a challenge.
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Our mission is to connect travelers with unique local experiences, curated by experts and delivered with a focus on quality, safety, and unforgettable memories.
                    </p>
                </div>
                <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
                        alt="Team"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-center mb-16">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { title: 'Passion', desc: 'We love what we do and it shows in every experience we offer.', icon: Heart, color: 'text-rose-500' },
                            { title: 'Trust', desc: 'Your safety and satisfaction are our top priorities.', icon: Trophy, color: 'text-amber-500' },
                            { title: 'Community', desc: 'We support local guides and sustainable tourism.', icon: Users, color: 'text-indigo-500' },
                            { title: 'Innovation', desc: 'Continuous improvement through technology and feedback.', icon: Globe, color: 'text-emerald-500' },
                        ].map((value) => (
                            <div key={value.title} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                <div className={`${value.color} mb-6`}>
                                    <value.icon size={40} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
