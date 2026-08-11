import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Heart, Flower2, CheckCircle2, ExternalLink } from 'lucide-react';

export const PublicContact: React.FC = () => {
  const { platformInfo, addContactMessage } = useApp();
  
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mapQuery = platformInfo.mapLocationUrl || platformInfo.address || 'الروضة الأولى بالقنفذة';
  const mapEmbedSrc = mapQuery.includes('google.com/maps/embed')
    ? mapQuery
    : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  const mapExternalUrl = (platformInfo.mapLocationUrl && !platformInfo.mapLocationUrl.includes('embed'))
    ? platformInfo.mapLocationUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !phone || !message) return;

    addContactMessage({
      senderName,
      email: email || 'غير محدد',
      phone,
      subject: subject || 'استفسار عام',
      message
    });

    setSubmitted(true);
    setSenderName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <Phone className="w-3.5 h-3.5" />
            <span>نحن هنا لخدمتكم 📞</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            تواصل مع إدارة الروضة الأولى بالقنفذة 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            يسعدنا استقبال استفساراتكم وملاحظاتكم واقتراحاتكم للارتقاء براحة وأداء براعمنا الصغار
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Info (Right side) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full" />

            <div className="space-y-2 relative z-10">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-full border border-rose-400/30">
                بيانات الاتصال المباشر 📍
              </span>
              <h3 className="text-xl font-bold">{platformInfo.schoolName}</h3>
              <p className="text-xs text-slate-300">{platformInfo.region}</p>
            </div>

            <div className="space-y-4 pt-2 text-xs sm:text-sm relative z-10">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">العنوان والفرع:</p>
                  <p className="text-slate-300 text-xs mt-0.5">{platformInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">الهاتف والواتساب الرسميان:</p>
                  <p className="text-slate-300 text-xs mt-0.5" dir="ltr">{platformInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">البريد الإلكتروني الرسمي:</p>
                  <p className="text-slate-300 text-xs mt-0.5">{platformInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">ساعات العمل الرسمية:</p>
                  <p className="text-slate-300 text-xs mt-0.5">من الأحد إلى الخميس | 7:00 صباحاً - 1:00 ظهراً</p>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={platformInfo.whatsappLink || `https://wa.me/966${platformInfo.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>تواصل عبر الواتساب</span>
                </a>
                <a
                  href={platformInfo.callLink || `tel:${platformInfo.phone}`}
                  className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Section */}
            <div className="pt-2">
              <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-lg space-y-0">
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <iframe
                    title="موقع الروضة الأولى بالقنفذة على الخريطة"
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0 filter opacity-90 hover:opacity-100 transition"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="p-3.5 bg-slate-900 flex items-center justify-between gap-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 animate-bounce" />
                    <div>
                      <p className="font-bold">موقع الروضة الأولى بالقنفذة</p>
                      <p className="text-[10px] text-slate-400">تصفح الخريطة المباشرة أو افتحها في Google Maps</p>
                    </div>
                  </div>
                  <a
                    href={mapExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow-xs transition shrink-0 cursor-pointer"
                  >
                    <span>تصفح الموقع عبر الخريطة</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Form (Left side) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-rose-600" />
              <span>إرسال رسالة مباشرة لمدير الروضة 🌸</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              يرجى تعبئة الحقول التالية وسيقوم الفريق الإداري بالرد عليكم في أقرب وقت
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">تم إرسال رسالتكم بنجاح!</p>
                  <p className="text-xs">شكرًا لتواصلكم مع المنصة الإعلامية للروضة الأولى بالقنفذة.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكريم <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="مثال: أم الطفل خالد الشهري"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-rose-500 rounded-2xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الجوال لللتواصل <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-rose-500 rounded-2xl text-xs focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-rose-500 rounded-2xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    موضوع الرسالة
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="مثال: استفسار عن التسجيل / اقتراح"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-rose-500 rounded-2xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نص الرسالة أو الاقتراح <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك بالتفصيل هنا..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-rose-500 rounded-2xl text-xs focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة إلى إدارة الروضة</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
