import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe,
  Sparkles,
  AlertCircle,
  Flower2,
  ShieldAlert,
  Clock
} from 'lucide-react';

const LOCKOUT_KEY = 'kg1_login_lockout_info';

export const AdminLoginScreen: React.FC = () => {
  const { login, setViewMode, adminCreds } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Brute-force lockout state initialization
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCKOUT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.failedAttempts || 0;
      }
    } catch (e) {}
    return 0;
  });

  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(LOCKOUT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lockoutUntil && parsed.lockoutUntil > Date.now()) {
          return parsed.lockoutUntil;
        }
      }
    } catch (e) {}
    return null;
  });

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);

  // Countdown Timer Effect
  useEffect(() => {
    if (!lockoutUntil) {
      setTimeLeftSeconds(0);
      return;
    }

    const checkTime = () => {
      const now = Date.now();
      const diff = Math.ceil((lockoutUntil - now) / 1000);
      if (diff <= 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        setTimeLeftSeconds(0);
        setErrorMsg('');
        try {
          localStorage.removeItem(LOCKOUT_KEY);
        } catch (e) {}
      } else {
        setTimeLeftSeconds(diff);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const isLocked = lockoutUntil !== null && timeLeftSeconds > 0;

  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(mins)}:${pad(secs)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);

      if (success) {
        setFailedAttempts(0);
        setLockoutUntil(null);
        try {
          localStorage.removeItem(LOCKOUT_KEY);
        } catch (e) {}
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (newAttempts >= 5) {
          const lockEnd = Date.now() + 5 * 60 * 1000; // 5 minutes lockout
          setLockoutUntil(lockEnd);
          try {
            localStorage.setItem(
              LOCKOUT_KEY,
              JSON.stringify({
                failedAttempts: newAttempts,
                lockoutUntil: lockEnd
              })
            );
          } catch (e) {}
        } else {
          try {
            localStorage.setItem(
              LOCKOUT_KEY,
              JSON.stringify({
                failedAttempts: newAttempts,
                lockoutUntil: null
              })
            );
          } catch (e) {}
          setErrorMsg(`اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التثبت وإعادة المحاولة. (المحاولة ${newAttempts} من 5)`);
        }
      }
    }, 300);
  };

  const handleAutoFill = () => {
    if (isLocked) return;
    setUsername(adminCreds.username);
    setPassword(adminCreds.password);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-teal-100 selection:text-teal-800">
      
      {/* Top Banner Navigation */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button
          onClick={() => setViewMode('public')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 bg-white px-3.5 py-2 rounded-xl shadow-2xs border border-slate-200 transition cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>العودة للواجهة العامة</span>
        </button>

        <span className="text-[11px] font-extrabold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>نظام محمي وآمن 🔒</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
        
        {/* Top Decorative Flower Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md mb-3 transform hover:scale-105 transition-transform">
            🌸
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            لوحة تحكم الروضة الأولى
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            تسجيل الدخول الموحد لإدارة محتوى المنصة الإعلامية بالحي المدرس الموحد
          </p>
        </div>

        {/* Lockout Warning Banner */}
        {isLocked && (
          <div className="mb-5 p-4 bg-rose-500 text-white rounded-2xl shadow-md border border-rose-600 text-right space-y-2 animate-pulse">
            <div className="flex items-start gap-2 font-bold text-xs leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <span>
                تم حظر محاولات الدخول مؤقتاً لمدة 5 دقائق بسبب تكرار إدخال كلمة المرور الخاطئة لحماية الحساب.
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-rose-400/50 text-xs font-mono">
              <span className="font-sans text-[11px] font-bold text-rose-100 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>الوقت المتبقي لفك الحظر:</span>
              </span>
              <span className="bg-rose-950/80 text-amber-300 px-3 py-1 rounded-xl font-black text-sm tracking-widest border border-rose-400/30">
                {formatCountdown(timeLeftSeconds)}
              </span>
            </div>
          </div>
        )}

        {/* Demo Credentials Auto-Fill Box */}
        {!isLocked && (
          <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 mb-6 text-right">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>بيانات الدخول المعتمدة للمعاينة:</span>
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                disabled={isLocked}
                className="text-[11px] font-extrabold bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-lg transition shadow-2xs cursor-pointer disabled:opacity-50"
              >
                تعبئة تلقائية ✨
              </button>
            </div>
            <div className="text-[11px] font-mono font-medium text-amber-950 space-y-0.5 bg-white/80 p-2 rounded-xl border border-amber-100">
              <p className="flex justify-between">
                <span className="text-slate-500 font-sans">اسم المستخدم:</span>
                <span className="font-bold text-slate-800">{adminCreds.username}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500 font-sans">كلمة المرور:</span>
                <span className="font-bold text-slate-800">{adminCreds.password}</span>
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {!isLocked && errorMsg && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={isLocked}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم..."
                className="w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-2xl text-xs font-medium text-slate-800 transition outline-hidden disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLocked}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white rounded-2xl text-xs font-medium text-slate-800 transition outline-hidden disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <button
                type="button"
                disabled={isLocked}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isLocked}
            className={`w-full py-3.5 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2 ${
              isLocked
                ? 'bg-slate-400 cursor-not-allowed shadow-none'
                : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg disabled:opacity-70'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>محظور مؤقتاً ({formatCountdown(timeLeftSeconds)})</span>
              </>
            ) : isLoading ? (
              <span>جاري التوثيق...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>دخول لوحة التحكم</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-[11px] text-center text-slate-400 mt-6 pt-4 border-t border-slate-100">
          إدارة التعليم بمحافظة القنفذة • الروضة الأولى 🌸
        </p>

      </div>
    </div>
  );
};
