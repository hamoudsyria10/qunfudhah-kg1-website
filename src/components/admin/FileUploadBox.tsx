import React, { useState, useRef } from 'react';
import { Upload, FileText, Film, Image as ImageIcon, CheckCircle2, X, Link, FileUp } from 'lucide-react';

interface FileUploadBoxProps {
  label?: string;
  acceptTypes?: 'image' | 'video' | 'document' | 'all';
  valueUrl?: string;
  onChangeUrl: (url: string) => void;
  onFileMetadataChange?: (meta: { name: string; size: string; type: string }) => void;
  required?: boolean;
}

export const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  label = 'رفع / اختيار ملف',
  acceptTypes = 'image',
  valueUrl = '',
  onChangeUrl,
  onFileMetadataChange,
  required = false
}) => {
  const safeUrl = valueUrl || '';
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formats file bytes to human readable string (KB, MB)
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getAcceptAttribute = () => {
    switch (acceptTypes) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*,image/*';
      case 'document':
        return '.pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.txt';
      case 'all':
      default:
        return 'image/*,video/*,.pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls';
    }
  };

  const handleFileChange = (file: File) => {
    if (!file) return;

    const formattedSize = formatBytes(file.size);
    let detectedType = file.type;
    
    // Fallback detection for documents & videos
    if (file.name.endsWith('.pdf')) detectedType = 'application/pdf';
    else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) detectedType = 'application/docx';
    else if (file.name.endsWith('.pptx') || file.name.endsWith('.ppt')) detectedType = 'application/pptx';
    else if (file.name.endsWith('.mp4') || file.name.endsWith('.mov') || file.name.endsWith('.webm') || file.name.endsWith('.mkv')) detectedType = 'video/mp4';

    setFileName(file.name);
    setFileSize(formattedSize);
    setFileType(detectedType);

    if (onFileMetadataChange) {
      let ext = 'PDF';
      if (file.name.endsWith('.docx')) ext = 'DOCX';
      else if (file.name.endsWith('.pptx')) ext = 'PPTX';
      else if (file.name.endsWith('.xlsx')) ext = 'XLSX';
      else if (file.type.startsWith('image/')) ext = 'IMAGE';
      else if (file.type.startsWith('video/') || detectedType.startsWith('video/')) ext = 'VIDEO';

      onFileMetadataChange({
        name: file.name,
        size: formattedSize,
        type: ext
      });
    }

    // Use URL.createObjectURL for all local files (zero memory overhead, no base64 string crash, unlimited video duration)
    try {
      const objectUrl = URL.createObjectURL(file);
      onChangeUrl(objectUrl);
    } catch (err) {
      // Fallback if Blob URL creation fails
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChangeUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    onChangeUrl('');
    setFileName('');
    setFileSize('');
    setFileType('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDataUrl = safeUrl.startsWith('data:');
  const isBlobUrl = safeUrl.startsWith('blob:');
  const isVideo = safeUrl.startsWith('data:video') || 
                  fileType.startsWith('video') || 
                  acceptTypes === 'video' || 
                  safeUrl.includes('youtube') || 
                  safeUrl.includes('vimeo') || 
                  safeUrl.endsWith('.mp4') || 
                  safeUrl.endsWith('.mov') || 
                  safeUrl.endsWith('.webm') || 
                  safeUrl.endsWith('.mkv');

  const isImage = !isVideo && (
                    safeUrl.startsWith('data:image') || 
                    fileType.startsWith('image') || 
                    acceptTypes === 'image' || 
                    Boolean(safeUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)/i))
                  );

  return (
    <div className="space-y-2 text-right">
      
      {/* Label and Mode Selector */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>رفع / اختيار ملف</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'url' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <Link className="w-3 h-3" />
            <span>رابط خارجي</span>
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div className="space-y-2">
          
          {/* File Picker Input Area */}
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptAttribute()}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {!safeUrl ? (
            /* Empty Drop Area */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-teal-500 bg-teal-50/80'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 hover:border-teal-400'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-700 flex items-center justify-center shadow-2xs">
                <FileUp className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-800">
                  انقر هنا اختيار / رفع ملف من جهازك 📱💻
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  يدعم التصفح المباشر لألبوم الصور أو الكاميرا أو المستندات (PDF/صور/فيديو)
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-teal-700 font-bold rounded-xl text-xs shadow-2xs hover:bg-teal-50 transition mt-1">
                <Upload className="w-3.5 h-3.5" />
                <span>اختر ملفاً من الجهاز</span>
              </span>
            </div>
          ) : (
            /* Selected File Live Preview Box */
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3 relative">
              <div className="flex items-center gap-3 overflow-hidden">
                
                {/* Preview Thumbnail or Live Video Player */}
                {isVideo ? (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-950 rounded-xl overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center relative">
                    <video
                      src={safeUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                ) : isImage ? (
                  <img
                    src={safeUrl}
                    alt="معاينة المرفق"
                    className="w-14 h-14 object-cover rounded-xl border border-slate-200 shadow-2xs shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-teal-100 text-teal-800 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 border border-teal-200">
                    <FileText className="w-6 h-6" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">مستند</span>
                  </div>
                )}

                <div className="truncate text-right flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {fileName || (isVideo ? 'فيديو مرفوع جاهز للنشر 📹' : 'ملف مرفوع جاهز للنشر')}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  {fileSize && (
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      الحجم: {fileSize}
                    </p>
                  )}
                  <p className="text-[10px] text-teal-600 font-bold mt-0.5">
                    {isVideo ? 'تم تحميل الفيديو بنجاح (طولي/أفقي • بلا حد للمدة) ✔️' : 'تمت المعاينة بنجاح ✔️'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:text-teal-700 text-[11px] font-bold rounded-xl transition cursor-pointer shadow-2xs"
                >
                  تغيير
                </button>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                  title="إلغاء الملف"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* URL Input Fallback */
        <div>
          <input
            type="url"
            value={safeUrl}
            onChange={(e) => onChangeUrl(e.target.value)}
            placeholder="أدخل رابط المرفق أو الصورة (https://...)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden"
          />
        </div>
      )}

    </div>
  );
};
