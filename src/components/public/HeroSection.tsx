import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Flower2, HeartHandshake, Users, Award, Calendar, ArrowLeft, PhoneCall } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { platformInfo } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
      tag: platformInfo.heroTag || '🌸 بيئة تعليمية جاذبة ومحفزة',
      title: platformInfo.heroTitle || 'نزرع القيم ونبني مستقبل براعم القنفذة الواعد',
      subtitle: platformInfo.welcomeMessage || 'المنصة الإعلامية الموحدة لتوثيق إبداعات ومبادرات أطفال الروضة الأولى بالقنفذة'
    },
    {
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80',
      tag: '📚 قرائية مبكرة وتعلم رقمي',
      title: 'مبادرات تربوية حديثة تواكب تطلعات رؤية الوطن 2030',
      subtitle: 'تعزيز مهارات التفكير الابتكاري والقراءة الشغوفة والمهارات الحركية لدى الطفل'
    },
    {
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1600&q=80',
      tag: '🤝 شراكة مجتمعية فاعلة',
      title: 'تواصل دائم ومثمر بين الروضة وأسرة الطفل والمجتمع',
      subtitle: 'تغطيات مصورة وملفات إعلامية وخطة تشغيلية شفافة تحقق أعلى معايير الجودة'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-[520px] flex items-center py-12 lg:py-16">
      {/* Background Image Carousel with overlay */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? 'opacity-40 scale-105 transition-transform duration-10000' : 'opacity-0 scale-100'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Elegant Gradient Grids & Shading */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-rose-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-5">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{heroSlides[activeSlide].tag}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {heroSlides[activeSlide].title}
            </h1>

            {/* Subtitle / About Platform */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {platformInfo.aboutText}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#news"
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-rose-900/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>تصفح آخر الأخبار والمبادرات</span>
                <ArrowLeft className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-rose-400" />
                <span>تواصل معنا الآن</span>
              </a>
            </div>

            {/* Carousel Dots */}
            <div className="pt-4 flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeSlide ? 'w-8 bg-rose-500' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`شريحة ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats & Info Card (Left Side) */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Flower2 className="w-6 h-6 text-rose-400 animate-spin-slow" />
                  <div>
                    <h2 className="text-sm font-bold text-white">الروضة الأولى بالقنفذة</h2>
                    <p className="text-[11px] text-rose-200">إدارة التعليم بمحافظة القنفذة</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/30 text-emerald-300 font-bold rounded-full border border-emerald-400/30">
                  منصة رسمية 🌸
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-2xl font-black text-rose-300">{platformInfo.stats.totalStudents}</p>
                  <p className="text-[11px] text-slate-300 font-medium">طفل وطالبة 👶</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-2xl font-black text-amber-300">{platformInfo.stats.totalTeachers}</p>
                  <p className="text-[11px] text-slate-300 font-medium">معلمة وإدارية 👩‍🏫</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-2xl font-black text-sky-300">{platformInfo.stats.totalEvents}</p>
                  <p className="text-[11px] text-slate-300 font-medium">فعالية وبرنامج 🎯</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-2xl font-black text-emerald-300">{platformInfo.stats.totalInitiatives}</p>
                  <p className="text-[11px] text-slate-300 font-medium">مبادرة تعليمية 🌱</p>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-2xl border border-rose-500/20 text-xs text-rose-100 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-300 shrink-0" />
                <p className="leading-snug">
                  {platformInfo.heroCardMessage || 'نرحب بجميع أفكار وملاحظات أولياء الأمور للارتقاء بالمسيرة التعليمية.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
