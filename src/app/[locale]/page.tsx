import Hero from "@/components/home/Hero";
import TopDestinations from "@/components/home/TopDestinations";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import { Plane, ShieldCheck, Headphones } from "lucide-react";
import Newsletter from "@/components/home/Newsletter";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations('Homepage');

  const activities = await prisma.activity.findMany({
    take: 3,
    include: {
      destination: true,
      category: true,
      reviews: { select: { rating: true } }
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Cast activities to any to avoid deep typing issues in this step
  const serializedActivities = JSON.parse(JSON.stringify(activities));

  return (
    <div>
      <Hero />

      <TopDestinations />

      <FeaturedActivities
        activities={serializedActivities}
        trendingTitle={t('trendingTitle')}
        trendingSubtitle={t('trendingSubtitle')}
        viewAllLabel={t('viewAll')}
      />

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
