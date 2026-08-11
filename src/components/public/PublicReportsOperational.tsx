import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Calendar, Download, FileText, CheckCircle2, Clock, Check, Layers, AlertCircle } from 'lucide-react';

export const PublicReportsOperational: React.FC = () => {
  const { mediaReports, operationalPlans, incrementReportDownload } = useApp();

  return (
    <section id="reports" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 space-y-12">
        
        {/* Section 1: ملفات وتقارير إعلامية 📚 */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>المكتبة الإعلامية والوثائق 📚</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                الملفات والتقارير الإعلامية 🌸
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                حمل الأدلة التنظيمية والتقارير السنوية والختامية الموثقة إلكترونياً
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaReports.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-extrabold uppercase">
                      {file.fileType} • {file.fileSize}
                    </span>
                    <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold">
                      {file.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm leading-snug">{file.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-2">تاريخ الرفع: {file.uploadDate}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{file.downloadCount} مرات التحميل</span>
                  <button
                    onClick={() => incrementReportDownload(file.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الملف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: الخطة التشغيلية 🗓️ */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-rose-700 bg-rose-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>التخطيط والجودة 🗓️</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                الخطة التشغيلية للروضة 🌸
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                استعراض أهداف الخطة التشغيلية المعتمدة ونسب إنجازها عبر الفصول الدراسية
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">هدف الخطة التشغيلية</th>
                    <th className="p-4">الفصل الدراسي</th>
                    <th className="p-4">الجهة المنفذة</th>
                    <th className="p-4">فترة التنفيذ</th>
                    <th className="p-4">الحالة ونسبة الإنجاز</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {operationalPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-rose-50/30 transition">
                      <td className="p-4 font-bold text-slate-800 max-w-xs">{plan.goalTitle}</td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[11px] font-semibold">
                          {plan.term}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{plan.responsibleParty}</td>
                      <td className="p-4 text-slate-500 whitespace-nowrap">{plan.executionPeriod}</td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-rose-600 rounded-full"
                              style={{ width: `${plan.completionRate}%` }}
                            />
                          </div>
                          <span className="font-extrabold text-slate-800 text-[11px]">
                            {plan.completionRate}%
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              plan.status === 'تم الإنجاز'
                                ? 'bg-emerald-100 text-emerald-800'
                                : plan.status === 'جاري العمل'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {plan.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
