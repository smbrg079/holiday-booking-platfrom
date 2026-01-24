import Hero from "@/components/home/Hero";
import TopDestinations from "@/components/home/TopDestinations";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import { Plane, ShieldCheck, Headphones, MapPin } from "lucide-react";
import Newsletter from "@/components/home/Newsletter";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations('Homepage');
  const ht = await getTranslations('HowItWorks');

  const [activities, destinations, categories] = await Promise.all([
    prisma.activity.findMany({
      take: 3,
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

  // Cast activities to any to avoid deep typing issues in this step
  const serializedActivities = JSON.parse(JSON.stringify(activities));

  return (
    <div>
      <Hero
        destinations={destinations}
        categories={categories}
      />

      <TopDestinations />

      <FeaturedActivities
        activities={serializedActivities}
        trendingTitle={t('trendingTitle')}
        trendingSubtitle={t('trendingSubtitle')}
        viewAllLabel={t('viewAll')}
      />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{ht('title')}</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">{ht('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

            {[
              { id: 1, icon: MapPin, title: ht('step1Title'), desc: ht('step1Desc') },
              { id: 2, icon: ShieldCheck, title: ht('step2Title'), desc: ht('step2Desc') },
              { id: 3, icon: Plane, title: ht('step3Title'), desc: ht('step3Desc') },
            ].map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 mb-8 border-4 border-white">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-black">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 text-indigo-600 mb-8 border border-slate-50">
                <Plane size={36} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t('feature1Title')}</h3>
              <p className="text-slate-500 font-medium">{t('feature1Subtitle')}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 text-indigo-600 mb-8 border border-slate-50">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t('feature2Title')}</h3>
              <p className="text-slate-500 font-medium">{t('feature2Subtitle')}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 text-indigo-600 mb-8 border border-slate-50">
                <Headphones size={36} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t('feature3Title')}</h3>
              <p className="text-slate-500 font-medium">{t('feature3Subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-indigo-600 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
