import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Trophy, Star, Heart, CheckCircle2, Medal, Gift } from 'lucide-react';

export const PublicAchievementsAppreciation: React.FC = () => {
  const { achievements, appreciations } = useApp();

  return (
    <section id="achievements" className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 space-y-12">
        
        {/* Section 1: إنجازات الروضة 👩‍🏫 */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>حصاد التميز والفرادة 👩‍🏫</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              إنجازات الروضة الأولى بالقنفذة 🌸
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              سجل حافل بالجوائز وشهادات الاعتماد والتميز على مستوى تعليم القنفذة والمنطقة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-gradient-to-b from-amber-50/50 to-orange-50/30 rounded-3xl p-6 border border-amber-200/70 shadow-xs hover:shadow-md transition flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-amber-200/20 rounded-br-full -z-0" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-amber-200/80 text-amber-900 rounded-full text-[10px] font-extrabold">
                      {ach.awardLevel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-base leading-snug">{ach.title}</h3>
                  <p className="text-xs font-bold text-rose-600 mt-1">المكرم: {ach.recipient}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{ach.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/50 flex items-center justify-between text-[11px] text-amber-800 font-medium">
                  <span className="font-bold text-amber-900">الروضة الأولى بالقنفذة 🌸</span>
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: الشكر والتقدير ⭐ */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-rose-700 bg-rose-100 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5" />
              <span>لمسات الوفاء والتقدير ⭐</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              بطاقات الشكر والامتنان 🌸
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              تقدير إدارة الروضة للمعلمات المبدعات وأولياء الأمور والشركاء الداعمين
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {appreciations.map((app) => (
              <div
                key={app.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-rose-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-rose-100 text-rose-800 text-[11px] font-bold rounded-full">
                      {app.role}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-base">{app.recipientName}</h3>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed italic bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
                    "{app.message}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end text-[11px] text-slate-400">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
