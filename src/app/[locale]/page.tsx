import Hero from "@/components/home/Hero";
import TopDestinations from "@/components/home/TopDestinations";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import Newsletter from "@/components/home/Newsletter";
import PromotedDestinations from "@/components/home/PromotedDestinations";
import WhyChoose from "@/components/home/WhyChoose";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MapPin, ShieldCheck, Plane } from "lucide-react";

const NEWSLETTER_BG = "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2670&auto=format&fit=crop";

export default async function Home() {
  const t = await getTranslations('Homepage');
  const ht = await getTranslations('HowItWorks');

  const [activities, destinations, categories] = await Promise.all([
    prisma.activity.findMany({
      take: 6,
      include: {
        destination: true,
        category: true,
        reviews: { select: { rating: true } }
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.destination.findMany({ select: { id: true, name: true } }),
    prisma.category.findMany({ select: { id: true, name: true } })
  ])

  const serializedActivities = JSON.parse(JSON.stringify(activities));

  const featuresList = [
    { title: t('feature1Title'), desc: t('feature1Subtitle'), iconName: 'Globe', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: t('feature2Title'), desc: t('feature2Subtitle'), iconName: 'ShieldCheck', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: t('feature3Title'), desc: t('feature3Subtitle'), iconName: 'Compass', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="bg-white">
      <Hero
        destinations={destinations}
        categories={categories}
      />

      <PromotedDestinations />

      <TopDestinations />

      <FeaturedActivities
        activities={serializedActivities}
        trendingTitle={t('trendingTitle')}
        trendingSubtitle={t('trendingSubtitle')}
        viewAllLabel={t('viewAll')}
      />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">{ht('title')}</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-xl">{ht('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { id: 1, icon: MapPin, title: ht('step1Title'), desc: ht('step1Desc'), color: 'bg-indigo-600' },
              { id: 2, icon: ShieldCheck, title: ht('step2Title'), desc: ht('step2Desc'), color: 'bg-amber-500' },
              { id: 3, icon: Plane, title: ht('step3Title'), desc: ht('step3Desc'), color: 'bg-emerald-500' },
            ].map((step, idx) => (
              <div key={step.id} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-28 h-28 ${step.color} rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 mb-10`}>
                    <step.icon size={44} />
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-black shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed px-6 text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChoose
        title={<>{t('featuresTitle').split('HolidaySync')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">HolidaySync</span>{t('featuresTitle').split('HolidaySync')[1]}</>}
        subtitle={t('featuresSubtitle')}
        features={featuresList}
      />

      {/* Newsletter Section */}
      <section className="py-40 relative overflow-hidden">
        <Image
          src={NEWSLETTER_BG}
          alt="Newsletter Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
