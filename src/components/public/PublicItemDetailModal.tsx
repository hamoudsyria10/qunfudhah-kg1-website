import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Eye, Users, MapPin, Download, Heart, Video, Camera, Award, Star, Flower2 } from 'lucide-react';

export const PublicItemDetailModal: React.FC = () => {
  const { selectedItemForModal, setSelectedItemForModal, likePhoto, incrementReportDownload } = useApp();

  if (!selectedItemForModal) return null;

  const { type, data } = selectedItemForModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-right">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
              🌸
            </span>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              {type === 'news' && 'تفاصيل الخبر الإخباري 📰'}
              {type === 'coverage' && 'التغطية الإعلامية والمرئية 📸'}
              {type === 'photo' && 'معاينة الصورة ألبوم 🖼️'}
              {type === 'initiative' && 'تفاصيل المبادرة 🌱'}
              {type === 'event' && 'تفاصيل الفعالية والبرنامج 🎯'}
            </h3>
          </div>

          <button
            onClick={() => setSelectedItemForModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* News View */}
          {type === 'news' && (
            <div className="space-y-4">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 object-cover rounded-2xl shadow-xs"
              />
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-bold rounded-full">
                  {data.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  {data.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {data.views} مشاهدة
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-snug">{data.title}</h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {data.content}
              </div>
            </div>
          )}

          {/* Media Coverage View */}
          {type === 'coverage' && (
            <div className="space-y-4">
              {data.type === 'video' ? (
                <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-md border border-slate-800 flex items-center justify-center p-1 min-h-[240px] max-h-[70vh]">
                  {data.mediaUrl?.includes('youtube') || data.mediaUrl?.includes('vimeo') ? (
                    <div className="w-full aspect-video">
                      <iframe
                        src={data.mediaUrl}
                        title={data.title}
                        className="w-full h-full rounded-xl"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={data.mediaUrl}
                      controls
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                      className="w-full max-h-[65vh] object-contain rounded-xl mx-auto bg-black"
                    />
                  )}
                </div>
              ) : (
                <img
                  src={data.thumbnail || data.mediaUrl}
                  alt={data.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                />
              )}

              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full flex items-center gap-1">
                  {data.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                  {data.publisher}
                </span>
                <span className="text-slate-400">{data.coverageDate}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{data.title}</h2>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">{data.description}</p>
            </div>
          )}

          {/* Gallery Photo / Video View */}
          {type === 'photo' && (
            <div className="space-y-4 text-center">
              {data.mediaType === 'video' || data.imageUrl?.startsWith('data:video') || data.imageUrl?.endsWith('.mp4') || data.imageUrl?.endsWith('.webm') ? (
                <video
                  src={data.imageUrl}
                  controls
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="w-full max-h-[60vh] object-contain rounded-2xl bg-slate-900 mx-auto"
                />
              ) : (
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="w-full max-h-[60vh] object-contain rounded-2xl bg-slate-900 mx-auto"
                />
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{data.title}</span>
                <span className="text-slate-400">{data.album} • {data.date}</span>
              </div>

              {data.description && (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed text-right border border-slate-100">
                  {data.description}
                </p>
              )}

              <button
                onClick={() => likePhoto(data.id)}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>إعجاب بالصورة ({data.likesCount})</span>
              </button>
            </div>
          )}

          {/* Initiative View */}
          {type === 'initiative' && (
            <div className="space-y-4">
              <img src={data.image} alt={data.title} className="w-full h-52 object-cover rounded-2xl" />
              <h2 className="text-xl font-black text-slate-900">{data.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">{data.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <div>
                  <span className="text-slate-500 font-medium">الفئة المستهدفة:</span>
                  <p className="font-bold text-emerald-900">{data.targetGroup}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">نسبة الإنجاز:</span>
                  <p className="font-bold text-emerald-900">{data.progressPercentage}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Program Event View */}
          {type === 'event' && (
            <div className="space-y-4">
              <img src={data.image} alt={data.title} className="w-full h-52 object-cover rounded-2xl" />
              <h2 className="text-xl font-black text-slate-900">{data.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">{data.description}</p>

              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  <span>تاريخ الفعالية: {data.eventDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span>الموقع: {data.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>عدد الحضور المتوقع: {data.attendeesCount} شخص</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
