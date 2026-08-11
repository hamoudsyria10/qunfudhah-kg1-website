import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Target, Calendar, MapPin, Users, CheckCircle, Clock, ArrowLeft, TrendingUp } from 'lucide-react';

export const PublicInitiativesEvents: React.FC = () => {
  const { initiatives, programEvents, setSelectedItemForModal } = useApp();

  return (
    <section id="initiatives" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 space-y-12">
        
        {/* Section 1: المبادرات 🌱 */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Sprout className="w-3.5 h-3.5" />
                <span>النمو والتطوير المستدام 🌱</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                مبادرات الروضة الأولى بالقنفذة 🌸
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                مبادرات تربوية ومجتمعية هادفة تعزز قيم الابتكار والاستدامة لدى الطفل والمجتمع
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((init) => (
              <div
                key={init.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img src={init.image} alt={init.title} className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-xs ${
                        init.status === 'مكتملة'
                          ? 'bg-emerald-600'
                          : init.status === 'قيد التنفيذ'
                          ? 'bg-amber-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      {init.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-snug">{init.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">{init.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-rose-600">
                      <Users className="w-3.5 h-3.5" />
                      {init.targetGroup}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        نسبة إنجاز المبادرة:
                      </span>
                      <span className="text-emerald-700">{init.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${init.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">الفترة: {init.startDate} إلى {init.endDate}</span>
                  <button
                    onClick={() => setSelectedItemForModal({ type: 'initiative', data: init })}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>تفاصيل المبادرة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: البرامج والفعاليات 🎯 */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>الأنشطة والفعاليات 🎯</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                البرامج والفعاليات المجدولة 🌸
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                جدول الأنشطة والبرامج الترفيهية والتثقيفية والوطنية لأطفال الروضة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-xs ${
                        event.status === 'قادمة'
                          ? 'bg-sky-600'
                          : event.status === 'مستمرة'
                          ? 'bg-emerald-600 animate-pulse'
                          : 'bg-slate-500'
                      }`}
                    >
                      {event.status}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                      {event.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug">{event.title}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{event.description}</p>

                    <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>التاريخ: {event.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span>الموقع: {event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>عدد المستفيدين: {event.attendeesCount} مستفيد</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <button
                    onClick={() => setSelectedItemForModal({ type: 'event', data: event })}
                    className="w-full py-2 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    عرض تفاصيل البرنامج 🎯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
