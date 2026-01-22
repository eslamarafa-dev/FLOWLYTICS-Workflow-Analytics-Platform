const { useState, useEffect, useMemo, useCallback, createContext, useContext, memo, useRef, useId } = React;

// ============================================
// 🌐 LANGUAGE / I18N (React Context)
// ============================================
const LanguageContext = createContext(null);
const useLang = () => useContext(LanguageContext);

const TRANSLATIONS = {
  en: {
    app: { subtitle: 'Workflow Analytics Platform' },
    nav: { dashboard: 'Dashboard', tasks: 'Tasks', analytics: 'Analytics' },
    actions: { newTask: 'New Task', cancel: 'Cancel', create: 'Create Task', update: 'Update Task' },
    toast: {
      taskDeleted: 'Task deleted successfully',
      taskUpdated: 'Task updated successfully',
      taskCreated: 'Task created successfully',
      statusUpdated: 'Task status updated'
    },
    filters: {
      searchPlaceholder: 'Search tasks...',
      allStatus: 'All Status',
      allPriority: 'All Priority',
      allMembers: 'All Members'
    },
    status: { pending: 'Pending', inProgress: 'In Progress', done: 'Completed' },
    priority: { low: 'Low', medium: 'Medium', high: 'High' },
    form: {
      titleCreate: '✨ Create New Task',
      titleEdit: '✏️ Edit Task',
      taskTitle: 'Task Title',
      assignee: 'Assignee',
      status: 'Status',
      priority: 'Priority',
      timeSpent: 'Time Spent (hours)',
      estimatedTime: 'Estimated Time (hours)',
      taskTitlePlaceholder: 'Enter task title...'
    },
    errors: {
      titleRequired: 'Task title is required',
      mustBePositive: 'Must be positive'
    },
    dashboard: {
      tasksCompleted: 'Tasks Completed',
      activeUsers: 'Active Users',
      efficiencyRate: 'Efficiency Rate',
      totalHours: 'Total Hours',
      weeklyPerformance: 'Weekly Performance',
      weeklySubtitle: 'Tasks completed per day',
      vsLastWeek: '+18% vs last week',
      teamEfficiency: 'Team Efficiency',
      teamEfficiencySubtitle: 'Overall team performance',
      done: 'Done',
      active: 'Active',
      pending: 'Pending',
      bottleneckTitle: 'Bottleneck Analysis',
      bottleneckSubtitle: 'AI-powered workflow insights'
    },
    tasks: {
      showing: ({ shown, total }) => `Showing ${shown} of ${total} tasks`,
      emptyTitle: 'No tasks found',
      emptySubtitle: 'Try adjusting your filters or create a new task',
      progress: 'Progress'
    },
    analytics: { teamPerformance: '👥 Team Performance', efficiency: 'Efficiency', total: 'Total', hours: 'Hours' },
    footer: { prefix: '© 2024', suffix: '— Crafted with care using React & Tailwind CSS' }
  },
  ar: {
    app: { subtitle: 'منصة تحليل سير العمل' },
    nav: { dashboard: 'لوحة التحكم', tasks: 'المهام', analytics: 'التحليلات' },
    actions: { newTask: 'مهمة جديدة', cancel: 'إلغاء', create: 'إنشاء مهمة', update: 'تحديث المهمة' },
    toast: {
      taskDeleted: 'تم حذف المهمة بنجاح',
      taskUpdated: 'تم تحديث المهمة بنجاح',
      taskCreated: 'تم إنشاء المهمة بنجاح',
      statusUpdated: 'تم تحديث حالة المهمة'
    },
    filters: {
      searchPlaceholder: 'ابحث داخل المهام...',
      allStatus: 'كل الحالات',
      allPriority: 'كل الأولويات',
      allMembers: 'كل الأعضاء'
    },
    status: { pending: 'قيد الانتظار', inProgress: 'قيد التنفيذ', done: 'مكتملة' },
    priority: { low: 'منخفضة', medium: 'متوسطة', high: 'عالية' },
    form: {
      titleCreate: '✨ إنشاء مهمة جديدة',
      titleEdit: '✏️ تعديل المهمة',
      taskTitle: 'عنوان المهمة',
      assignee: 'المسؤول',
      status: 'الحالة',
      priority: 'الأولوية',
      timeSpent: 'الوقت المستغرق (ساعة)',
      estimatedTime: 'الوقت المتوقع (ساعة)',
      taskTitlePlaceholder: 'اكتب عنوان المهمة...'
    },
    errors: {
      titleRequired: 'عنوان المهمة مطلوب',
      mustBePositive: 'يجب أن تكون القيمة موجبة'
    },
    dashboard: {
      tasksCompleted: 'المهام المكتملة',
      activeUsers: 'أعضاء نشطون',
      efficiencyRate: 'معدل الكفاءة',
      totalHours: 'إجمالي الساعات',
      weeklyPerformance: 'أداء الأسبوع',
      weeklySubtitle: 'المهام المكتملة يوميًا',
      vsLastWeek: '+18% مقارنة بالأسبوع الماضي',
      teamEfficiency: 'كفاءة الفريق',
      teamEfficiencySubtitle: 'مؤشر الأداء العام للفريق',
      done: 'مكتملة',
      active: 'نشطة',
      pending: 'معلقة',
      bottleneckTitle: 'تحليل الاختناقات',
      bottleneckSubtitle: 'رؤى ذكية لتحسين سير العمل'
    },
    tasks: {
      showing: ({ shown, total }) => `عرض ${shown} من أصل ${total} مهمة`,
      emptyTitle: 'لا توجد مهام مطابقة',
      emptySubtitle: 'جرّب تعديل الفلاتر أو إنشاء مهمة جديدة',
      progress: 'التقدم'
    },
    analytics: { teamPerformance: '👥 أداء الفريق', efficiency: 'الكفاءة', total: 'الإجمالي', hours: 'الساعات' },
    footer: { prefix: '© 2024', suffix: '— مبني باحتراف باستخدام React و Tailwind CSS' }
  }
};

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('flowlytics-lang') || 'en');
  const isRTL = lang === 'ar';
  const locale = isRTL ? 'ar' : 'en';

  useEffect(() => {
    localStorage.setItem('flowlytics-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('dir-rtl', isRTL);
    document.title = lang === 'ar'
      ? 'FLOWLYTICS – منصة تحليل سير العمل'
      : 'FLOWLYTICS – Workflow Analytics Platform';
  }, [lang, isRTL]);

  const t = useCallback((key, vars) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const parts = key.split('.');
    let node = dict;
    for (const p of parts) node = node?.[p];

    if (typeof node === 'function') return node(vars || {});
    if (typeof node === 'string') return node;

    // fallback to EN
    let fallback = TRANSLATIONS.en;
    for (const p of parts) fallback = fallback?.[p];
    if (typeof fallback === 'function') return fallback(vars || {});
    if (typeof fallback === 'string') return fallback;

    return key;
  }, [lang]);

  const formatNumber = useCallback((n) => {
    try { return new Intl.NumberFormat(locale).format(n); }
    catch { return String(n); }
  }, [locale]);

  const toggleLang = useCallback(() => setLang(prev => prev === 'en' ? 'ar' : 'en'), []);

  return (
    <LanguageContext.Provider value={{ lang, isRTL, locale, t, toggleLang, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ============================================
// 🎨 THEME CONTEXT & PROVIDER
// ============================================
const ThemeContext = createContext(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('flowlytics-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('flowlytics-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================
// ✨ PARTICLE BACKGROUND COMPONENT
// ============================================
const ParticleBackground = memo(({ isDark }) => {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 4}s`,
      size: `${2 + Math.random() * 4}px`
    }))
  , []);

  if (!isDark) return null;

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  );
});

// ============================================
// 🔔 TOAST NOTIFICATION SYSTEM
// ============================================
const ToastContext = createContext(null);
const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const { isRTL } = useLang();
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const icons = {
    success: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    error: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    info: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    warning: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  };

  const colors = {
    success: 'from-emerald-500 to-emerald-600',
    error: 'from-red-500 to-red-600',
    info: 'from-indigo-500 to-purple-600',
    warning: 'from-amber-500 to-orange-600'
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 space-y-3`}>
        {toasts.map((toast, i) => (
          <div
            key={toast.id}
            className={`animate-slide-left px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 bg-gradient-to-r ${colors[toast.type]} text-white font-medium backdrop-blur-xl`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="animate-bounce-in">{icons[toast.type]}</div>
            <span>{toast.message}</span>
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full animate-[shimmer_4s_linear]" style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ============================================
// 📊 MOCK DATA
// ============================================
const USERS = [
  { id: 1, name: 'Sarah Chen', avatar: '👩‍💻', role: 'Lead Developer', efficiency: 94, color: '#6366f1' },
  { id: 2, name: 'Marcus Johnson', avatar: '👨‍💼', role: 'Project Manager', efficiency: 88, color: '#8b5cf6' },
  { id: 3, name: 'Elena Rodriguez', avatar: '👩‍🎨', role: 'UI Designer', efficiency: 91, color: '#a855f7' },
  { id: 4, name: 'James Wilson', avatar: '🧑‍💻', role: 'Backend Dev', efficiency: 85, color: '#ec4899' },
  { id: 5, name: 'Aisha Patel', avatar: '👩‍🔬', role: 'Data Analyst', efficiency: 97, color: '#14b8a6' },
];

const INITIAL_TASKS = [
  { id: 1, title: 'Implement Authentication Flow', userId: 1, status: 'done', priority: 'high', timeSpent: 16, estimatedTime: 20, createdAt: '2024-01-15' },
  { id: 2, title: 'Design Dashboard UI', userId: 3, status: 'done', priority: 'high', timeSpent: 12, estimatedTime: 15, createdAt: '2024-01-16' },
  { id: 3, title: 'API Integration - Users Module', userId: 4, status: 'in-progress', priority: 'high', timeSpent: 8, estimatedTime: 12, createdAt: '2024-01-17' },
  { id: 4, title: 'Performance Optimization', userId: 1, status: 'in-progress', priority: 'medium', timeSpent: 6, estimatedTime: 10, createdAt: '2024-01-18' },
  { id: 5, title: 'Write Unit Tests', userId: 4, status: 'pending', priority: 'medium', timeSpent: 0, estimatedTime: 8, createdAt: '2024-01-19' },
  { id: 6, title: 'Create Analytics Report', userId: 5, status: 'done', priority: 'high', timeSpent: 10, estimatedTime: 12, createdAt: '2024-01-14' },
  { id: 7, title: 'Sprint Planning Meeting', userId: 2, status: 'done', priority: 'medium', timeSpent: 2, estimatedTime: 2, createdAt: '2024-01-15' },
  { id: 8, title: 'Code Review - Feature Branch', userId: 1, status: 'in-progress', priority: 'high', timeSpent: 3, estimatedTime: 4, createdAt: '2024-01-19' },
  { id: 9, title: 'Update Design System', userId: 3, status: 'pending', priority: 'low', timeSpent: 0, estimatedTime: 6, createdAt: '2024-01-20' },
  { id: 10, title: 'Database Migration', userId: 4, status: 'pending', priority: 'high', timeSpent: 0, estimatedTime: 8, createdAt: '2024-01-20' },
  { id: 11, title: 'Client Presentation Prep', userId: 2, status: 'in-progress', priority: 'high', timeSpent: 4, estimatedTime: 6, createdAt: '2024-01-18' },
  { id: 12, title: 'Data Pipeline Setup', userId: 5, status: 'done', priority: 'medium', timeSpent: 14, estimatedTime: 16, createdAt: '2024-01-13' },
];

const STATUS_CONFIG = {
  pending: { labelKey: 'status.pending', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
  'in-progress': { labelKey: 'status.inProgress', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' },
  done: { labelKey: 'status.done', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' }
};

const PRIORITY_CONFIG = {
  low: { labelKey: 'priority.low', color: 'text-slate-400', dot: 'bg-slate-400' },
  medium: { labelKey: 'priority.medium', color: 'text-amber-400', dot: 'bg-amber-400' },
  high: { labelKey: 'priority.high', color: 'text-red-400', dot: 'bg-red-400' }
};

// ============================================
// 🔢 ANIMATED COUNTER HOOK
// ============================================
const useAnimatedCounter = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(end * easeOut));
        if (progress < 1) frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, delay]);

  return count;
};

// ============================================
// 🖱️ MAGNETIC HOVER HOOK
// ============================================
const useMagneticHover = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    };

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return ref;
};

// ============================================
// 🎯 UI COMPONENTS
// ============================================
const Button = memo(({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button' }) => {
  const magneticRef = useMagneticHover();
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick?.(e);
  };

  const baseStyles = 'relative overflow-hidden font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 magnetic-hover';
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95',
    secondary: 'bg-slate-700/80 hover:bg-slate-600 text-white backdrop-blur-xl border border-slate-600/50',
    ghost: 'bg-transparent hover:bg-slate-700/50 text-slate-300',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <button
      type={type}
      ref={magneticRef}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {ripple && (
        <span
          className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
          style={{ left: ripple.x, top: ripple.y, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
        />
      )}
      {children}
    </button>
  );
});

const Modal = memo(({ isOpen, onClose, title, children }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.25s ease-out' }}
      />
      <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl animate-bounce-in overflow-hidden ${
        isDark ? 'bg-slate-800/95 backdrop-blur-xl' : 'bg-white'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        <div className={`relative flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-300 hover:rotate-90 ${
              isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative p-6">{children}</div>
      </div>
    </div>
  );
});

const Input = memo(({ label, error, ...props }) => {
  const { isDark } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className={`block text-sm font-medium transition-colors ${
          focused ? 'text-indigo-400' : isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none ${
            isDark
              ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
          } ${focused ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : ''} ${error ? 'border-red-500' : ''}`}
        />
        {focused && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 pointer-events-none animate-pulse" />
        )}
      </div>
      {error && <p className="text-red-400 text-sm animate-slide-up">{error}</p>}
    </div>
  );
});

const Select = memo(({ label, options, ...props }) => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-2">
      {label && <label className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>}
      <select
        {...props}
        className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none cursor-pointer hover:border-indigo-500/50 ${
          isDark
            ? 'bg-slate-700/50 border-slate-600 text-white focus:border-indigo-500'
            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
        }`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
});

// ============================================
// 📈 ADVANCED CHART COMPONENTS
// ============================================
const AnimatedProgressRing = memo(({ progress, size = 140, strokeWidth = 10, delay = 0 }) => {
  const { isDark } = useTheme();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const uid = useId();
  const gradientId = useMemo(() => `ring-gradient-${uid}`, [uid]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - p, 4);
        setAnimatedProgress(progress * easeOut);
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [progress, delay]);

  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="relative group" style={{ width: size, height: size }}>
      <svg className="progress-ring w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle
          className={isDark ? 'text-slate-700' : 'text-slate-200'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          filter={`url(#glow-${uid})`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{Math.round(animatedProgress)}%</span>
        <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>efficiency</span>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
});

const AnimatedBarChart = memo(({ data, height = 220 }) => {
  const { isDark } = useTheme();
  const maxValue = Math.max(...data.map(d => d.value));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-end justify-between gap-2 px-2" style={{ height }}>
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
          <div className="relative w-full flex justify-center">
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2">
              <div className={`px-2 py-1 rounded-lg text-xs font-bold ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'}`}>{item.value}</div>
            </div>
            <div
              className="w-full max-w-[40px] rounded-xl bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-500 transition-all duration-500 hover:from-indigo-500 hover:to-pink-400 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40"
              style={{
                height: visible ? `${(item.value / maxValue) * (height - 50)}px` : '0px',
                transitionDelay: `${i * 80}ms`,
                transformOrigin: 'bottom'
              }}
            >
              <div className="w-full h-full shimmer-effect rounded-xl" />
            </div>
          </div>
          <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
});

const MiniSparkline = memo(({ data, color = '#6366f1' }) => {
  const width = 80;
  const height = 32;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  const uid = useId();
  const gradientId = useMemo(() => `spark-${uid}`, [uid]);

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - 4 - ((value - minValue) / range) * (height - 8);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="line-draw"
      />
      <circle
        cx={width}
        cy={height - 4 - ((data[data.length - 1] - minValue) / range) * (height - 8)}
        r="4"
        fill={color}
        className="animate-pulse"
      />
    </svg>
  );
});

// ============================================
// 📊 KPI CARD
// ============================================
const KPICard = memo(({ title, value, change, changeType, icon, trend, subtitle, index = 0 }) => {
  const { isDark } = useTheme();
  const { formatNumber, isRTL } = useLang();
  const animatedValue = useAnimatedCounter(value, 2000, index * 150);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 card-glow cursor-glow animate-slide-up parallax ${
        isDark ? 'bg-slate-800/60 backdrop-blur-xl border border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl'
      } ${isRTL ? 'rtl-text' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full animate-morph opacity-20 ${
        isDark ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-indigo-400 to-purple-500'
      }`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3.5 rounded-2xl animate-float ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`} style={{ animationDelay: `${index * 200}ms` }}>
            {icon}
          </div>
          {trend && (
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <MiniSparkline data={trend} color={changeType === 'up' ? '#10b981' : '#ef4444'} />
            </div>
          )}
        </div>
        <div>
          <p className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatNumber(animatedValue)}
              {subtitle && <span className="text-lg font-medium text-slate-500 ml-1">{subtitle}</span>}
            </span>
            {change && (
              <span className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${
                changeType === 'up' ? 'text-emerald-400 bg-emerald-500/20' : 'text-red-400 bg-red-500/20'
              }`}>
                <svg className={`w-4 h-4 ${changeType === 'up' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 shimmer-effect opacity-0 hover:opacity-100 transition-opacity rounded-3xl" />
    </div>
  );
});

// ============================================
// 🔍 BOTTLENECK CARD
// ============================================
const BottleneckCard = memo(({ bottleneck, index }) => {
  const { isDark } = useTheme();
  const { isRTL } = useLang();

  const severityConfig = {
    high: { border: 'border-l-red-500', bg: 'from-red-500/10 to-transparent', icon: '🔴', pulse: 'animate-pulse' },
    medium: { border: 'border-l-amber-500', bg: 'from-amber-500/10 to-transparent', icon: '🟡', pulse: '' },
    low: { border: 'border-l-emerald-500', bg: 'from-emerald-500/10 to-transparent', icon: '🟢', pulse: '' }
  };

  const config = severityConfig[bottleneck.severity];

  return (
    <div
      className={`relative overflow-hidden p-5 rounded-2xl border-l-4 ${config.border} transition-all duration-500 hover:scale-[1.02] animate-slide-up parallax ${
        isDark ? 'bg-slate-800/40 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl shadow-lg'
      } ${isRTL ? 'rtl-text' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${config.bg}`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className={`text-xl ${config.pulse}`}>{config.icon}</span>
            <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{bottleneck.title}</h4>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            bottleneck.severity === 'high' ? 'bg-red-500/20 text-red-400' :
            bottleneck.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
            'bg-emerald-500/20 text-emerald-400'
          }`}>
            {bottleneck.severity}
          </span>
        </div>
        <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{bottleneck.description}</p>
        {bottleneck.recommendation && (
          <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
            <p className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className="text-base">💡</span>
              {bottleneck.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

// ============================================
// 📋 TASK ITEM
// ============================================
const TaskItem = memo(({ task, user, onEdit, onDelete, onStatusChange, index }) => {
  const { isDark } = useTheme();
  const { t, formatNumber, isRTL } = useLang();
  const [isHovered, setIsHovered] = useState(false);
  const progress = task.estimatedTime > 0 ? Math.round((task.timeSpent / task.estimatedTime) * 100) : 0;
  const isOverdue = progress > 100;

  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-500 animate-slide-up cursor-glow parallax ${
        isDark
          ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-indigo-500/50'
          : 'bg-white/80 backdrop-blur-xl border-slate-200 hover:border-indigo-400 shadow-lg'
      } ${isRTL ? 'rtl-text' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className={`relative px-3 py-1.5 rounded-xl text-xs font-bold border ${STATUS_CONFIG[task.status].color}`}>
                <span className={`absolute -left-1 -top-1 w-2 h-2 rounded-full ${STATUS_CONFIG[task.status].dot} ${task.status === 'in-progress' ? 'animate-pulse' : ''}`} />
                {t(STATUS_CONFIG[task.status].labelKey)}
              </span>
              <span className={`flex items-center gap-2 text-xs font-semibold ${PRIORITY_CONFIG[task.priority].color}`}>
                <span className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[task.priority].dot} ${task.priority === 'high' ? 'animate-pulse' : ''}`} />
                {t(PRIORITY_CONFIG[task.priority].labelKey)}
              </span>
            </div>
            <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{task.title}</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 group/user">
                <span className="text-2xl group-hover/user:animate-bounce transition-all">{user?.avatar}</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{user?.name}</span>
              </div>
              <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
              <span className={`font-medium ${isOverdue ? 'text-red-400' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                ⏱️ {formatNumber(task.timeSpent)}h / {formatNumber(task.estimatedTime)}h
              </span>
            </div>
          </div>

          <div className={`flex items-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            {task.status !== 'done' && (
              <button
                onClick={() => onStatusChange(task.id)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDark ? 'hover:bg-emerald-500/20 text-emerald-400' : 'hover:bg-emerald-100 text-emerald-600'
                }`}
                aria-label="Advance status"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <button
              onClick={() => onEdit(task)}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
              aria-label="Edit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-500'
              }`}
              aria-label="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs mb-2">
            <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{t('tasks.progress')}</span>
            <span className={`font-bold ${isOverdue ? 'text-red-400' : isDark ? 'text-slate-300' : 'text-slate-600'}`}>{Math.min(progress, 100)}%</span>
          </div>
          <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                isOverdue ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                progress >= 75 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 shimmer-effect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ============================================
// 📝 TASK FORM MODAL
// ============================================
const TaskFormModal = memo(({ isOpen, onClose, task, onSave }) => {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    title: '', userId: USERS[0].id, status: 'pending', priority: 'medium', timeSpent: 0, estimatedTime: 8
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) setFormData(task);
    else setFormData({ title: '', userId: USERS[0].id, status: 'pending', priority: 'medium', timeSpent: 0, estimatedTime: 8 });
    setErrors({});
  }, [task, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t('errors.titleRequired');
    if (formData.estimatedTime <= 0) newErrors.estimatedTime = t('errors.mustBePositive');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? t('form.titleEdit') : t('form.titleCreate')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('form.taskTitle')}
          placeholder={t('form.taskTitlePlaceholder')}
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          error={errors.title}
        />
        <Select
          label={t('form.assignee')}
          value={formData.userId}
          onChange={(e) => setFormData(prev => ({ ...prev, userId: parseInt(e.target.value) }))}
          options={USERS.map(u => ({ value: u.id, label: `${u.avatar} ${u.name}` }))}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={t('form.status')}
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            options={[
              { value: 'pending', label: `⏳ ${t('status.pending')}` },
              { value: 'in-progress', label: `🔄 ${t('status.inProgress')}` },
              { value: 'done', label: `✅ ${t('status.done')}` }
            ]}
          />
          <Select
            label={t('form.priority')}
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            options={[
              { value: 'low', label: `🟢 ${t('priority.low')}` },
              { value: 'medium', label: `🟡 ${t('priority.medium')}` },
              { value: 'high', label: `🔴 ${t('priority.high')}` }
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('form.timeSpent')}
            type="number"
            min="0"
            value={formData.timeSpent}
            onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: parseFloat(e.target.value) || 0 }))}
          />
          <Input
            label={t('form.estimatedTime')}
            type="number"
            min="1"
            value={formData.estimatedTime}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseFloat(e.target.value) || 1 }))}
            error={errors.estimatedTime}
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">{t('actions.cancel')}</Button>
          <Button type="submit" className="flex-1">{task ? t('actions.update') : t('actions.create')}</Button>
        </div>
      </form>
    </Modal>
  );
});

// ============================================
// 🎛️ HEADER
// ============================================
const Header = memo(({ onAddTask }) => {
  const { isDark, toggle } = useTheme();
  const { t, toggleLang, lang, isRTL } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-500 ${
      scrolled
        ? `glass ${isDark ? 'bg-slate-900/80 shadow-2xl shadow-indigo-500/10' : 'bg-white/80 shadow-xl'}`
        : 'bg-transparent'
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 sm:gap-4 animate-slide-right ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-glow-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full" />
          </div>
          <div className={`${isRTL ? 'rtl-text' : ''} hidden sm:block`}>
            <h1 className="text-xl sm:text-2xl font-black gradient-text tracking-tight">FLOWLYTICS</h1>
            <p className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('app.subtitle')}</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 sm:gap-3 animate-slide-left ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button onClick={onAddTask} size="md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">{t('actions.newTask')}</span>
          </Button>

          <button
            onClick={toggleLang}
            className={`relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all duration-500 overflow-hidden group ${
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
            }`}
            aria-label="Toggle language"
            title={lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`relative flex items-center gap-1.5 sm:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.5 4-6 4-9s-1.5-6.5-4-9c-2.5 2.5-4 6-4 9s1.5 6.5 4 9z" />
              </svg>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{lang === 'en' ? 'AR' : 'EN'}</span>
            </div>
          </button>

          <button
            onClick={toggle}
            className={`relative p-2.5 sm:p-3 rounded-2xl transition-all duration-500 overflow-hidden group ${
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            <div className={`absolute inset-0 transition-transform duration-500 ${isDark ? 'translate-y-0' : '-translate-y-full'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20" />
            </div>
            <div className="relative">
              {isDark ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24" style={{ animation: 'spin 10s linear infinite' }}>
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </div>
          </button>

          <div className="relative group hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform cursor-pointer text-sm sm:text-base">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

// ============================================
// 🔍 FILTERS
// ============================================
const Filters = memo(({ filters, onChange }) => {
  const { isDark } = useTheme();
  const { t, isRTL } = useLang();

  const searchPadding = isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4';
  const searchIconPos = isRTL ? 'right-4' : 'left-4';

  return (
    <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-500 animate-slide-up parallax ${
      isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
    } ${isRTL ? 'rtl-text' : ''}`}>
      <div className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 ${isRTL ? 'rtl-flex-row-reverse' : ''}`}>
        <div className="flex-1 min-w-full sm:min-w-[240px]">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity" />
            <svg className={`absolute ${searchIconPos} top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('filters.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className={`relative w-full ${searchPadding} py-3.5 rounded-2xl border-2 transition-all duration-300 outline-none ${
                isDark
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10'
              }`}
            />
          </div>
        </div>

        {['status', 'priority', 'userId'].map((filterType, i) => (
          <select
            key={filterType}
            value={filters[filterType]}
            onChange={(e) => onChange({ ...filters, [filterType]: e.target.value })}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:border-indigo-500/50 animate-slide-up text-sm sm:text-base ${
              isDark
                ? 'bg-slate-700/50 border-slate-600 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            {filterType === 'status' && (
              <>
                <option value="all">📋 {t('filters.allStatus')}</option>
                <option value="pending">⏳ {t('status.pending')}</option>
                <option value="in-progress">🔄 {t('status.inProgress')}</option>
                <option value="done">✅ {t('status.done')}</option>
              </>
            )}
            {filterType === 'priority' && (
              <>
                <option value="all">🎯 {t('filters.allPriority')}</option>
                <option value="high">🔴 {t('priority.high')}</option>
                <option value="medium">🟡 {t('priority.medium')}</option>
                <option value="low">🟢 {t('priority.low')}</option>
              </>
            )}
            {filterType === 'userId' && (
              <>
                <option value="all">👥 {t('filters.allMembers')}</option>
                {USERS.map(u => (
                  <option key={u.id} value={u.id}>{u.avatar} {u.name}</option>
                ))}
              </>
            )}
          </select>
        ))}
      </div>
    </div>
  );
});

// ============================================
// 🚀 MAIN APP COMPONENT
// ============================================
const App = () => {
  const { isDark } = useTheme();
  const { addToast } = useToast();
  const { t } = useLang();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filters, setFilters] = useState({ search: '', status: 'all', priority: 'all', userId: 'all' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesUser = filters.userId === 'all' || task.userId === parseInt(filters.userId);
      return matchesSearch && matchesStatus && matchesPriority && matchesUser;
    });
  }, [tasks, filters]);

  const analytics = useMemo(() => {
    const completed = tasks.filter(tk => tk.status === 'done').length;
    const inProgress = tasks.filter(tk => tk.status === 'in-progress').length;
    const pending = tasks.filter(tk => tk.status === 'pending').length;
    const totalTime = tasks.reduce((sum, tk) => sum + tk.timeSpent, 0);
    const estimatedTotal = tasks.reduce((sum, tk) => sum + tk.estimatedTime, 0);
    const efficiency = estimatedTotal > 0 ? Math.round((1 - (totalTime - estimatedTotal) / estimatedTotal) * 100) : 100;

    return {
      completed, inProgress, pending, total: tasks.length,
      efficiency: Math.max(0, Math.min(100, efficiency)),
      activeUsers: new Set(tasks.filter(tk => tk.status !== 'done').map(tk => tk.userId)).size,
      totalHours: totalTime
    };
  }, [tasks]);

  const bottlenecks = useMemo(() => {
    const issues = [];
    const overdueTasks = tasks.filter(tk => tk.timeSpent > tk.estimatedTime && tk.status !== 'done');
    if (overdueTasks.length > 0) {
      issues.push({
        id: 1,
        title: 'Tasks Exceeding Estimates',
        description: `${overdueTasks.length} task(s) have exceeded their time estimates`,
        severity: 'high',
        recommendation: 'Review task complexity or reallocate resources'
      });
    }

    const userWorkload = {};
    tasks.filter(tk => tk.status !== 'done').forEach(tk => { userWorkload[tk.userId] = (userWorkload[tk.userId] || 0) + 1; });
    const overloadedUsers = Object.entries(userWorkload).filter(([_, count]) => count > 3);
    if (overloadedUsers.length > 0) {
      issues.push({
        id: 2,
        title: 'Workload Imbalance',
        description: `${overloadedUsers.length} team member(s) have more than 3 active tasks`,
        severity: 'medium',
        recommendation: 'Consider redistributing tasks among team members'
      });
    }

    const highPriorityPending = tasks.filter(tk => tk.priority === 'high' && tk.status === 'pending');
    if (highPriorityPending.length > 0) {
      issues.push({
        id: 3,
        title: 'High Priority Tasks Pending',
        description: `${highPriorityPending.length} high priority task(s) haven't started yet`,
        severity: 'high',
        recommendation: 'Prioritize starting these tasks immediately'
      });
    }

    if (issues.length === 0) {
      issues.push({
        id: 0,
        title: 'All Systems Optimal',
        description: 'No bottlenecks detected in current workflow',
        severity: 'low',
        recommendation: 'Keep up the great work!'
      });
    }

    return issues;
  }, [tasks]);

  const weeklyData = useMemo(() => [
    { label: 'Mon', value: 12 }, { label: 'Tue', value: 19 }, { label: 'Wed', value: 15 },
    { label: 'Thu', value: 22 }, { label: 'Fri', value: 18 }, { label: 'Sat', value: 8 }, { label: 'Sun', value: 5 }
  ], []);

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(tk => tk.id !== taskId));
    addToast(t('toast.taskDeleted'), 'success');
  }, [addToast, t]);

  const handleStatusChange = useCallback((taskId) => {
    setTasks(prev => prev.map(tk => tk.id === taskId ? { ...tk, status: tk.status === 'pending' ? 'in-progress' : 'done' } : tk));
    addToast(t('toast.statusUpdated'), 'info');
  }, [addToast, t]);

  const handleSaveTask = useCallback((formData) => {
    if (editingTask) {
      setTasks(prev => prev.map(tk => tk.id === editingTask.id ? { ...tk, ...formData } : tk));
      addToast(t('toast.taskUpdated'), 'success');
    } else {
      setTasks(prev => [...prev, { ...formData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }]);
      addToast(t('toast.taskCreated'), 'success');
    }
    setIsModalOpen(false);
  }, [editingTask, addToast, t]);

  const tabs = useMemo(() => ([
    { id: 'dashboard', icon: '📊', label: t('nav.dashboard') },
    { id: 'tasks', icon: '📋', label: t('nav.tasks') },
    { id: 'analytics', icon: '📈', label: t('nav.analytics') }
  ]), [t]);

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'animated-bg' : 'light-animated-bg'}`}>
      <ParticleBackground isDark={isDark} />
      <Header onAddTask={handleAddTask} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 p-1.5 sm:p-2 rounded-2xl w-full sm:w-auto overflow-x-auto bg-slate-800/30 backdrop-blur-xl parallax scrollbar-thin">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/30 scale-105'
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-base sm:text-lg">{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title={t('dashboard.tasksCompleted')} value={analytics.completed} change="+12%" changeType="up"
                trend={[4, 6, 5, 8, 7, 9, 12]} index={0}
                icon={<svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <KPICard
                title={t('dashboard.activeUsers')} value={analytics.activeUsers} change="+2" changeType="up"
                trend={[3, 4, 3, 5, 4, 5, 5]} index={1}
                icon={<svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
              />
              <KPICard
                title={t('dashboard.efficiencyRate')} value={analytics.efficiency} subtitle="%" change="+5%" changeType="up"
                trend={[78, 82, 79, 85, 88, 87, 91]} index={2}
                icon={<svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              />
              <KPICard
                title={t('dashboard.totalHours')} value={analytics.totalHours} subtitle="h" change="-8%" changeType="down"
                trend={[95, 88, 92, 85, 80, 78, 75]} index={3}
                icon={<svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-2 p-6 rounded-3xl border animate-slide-up parallax ${
                isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
              }`} style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('dashboard.weeklyPerformance')}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('dashboard.weeklySubtitle')}</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-sm font-bold">{t('dashboard.vsLastWeek')}</span>
                  </div>
                </div>
                <AnimatedBarChart data={weeklyData} height={240} />
              </div>

              <div className={`p-6 rounded-3xl border animate-slide-up parallax ${
                isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
              }`} style={{ animationDelay: '300ms' }}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('dashboard.teamEfficiency')}</h3>
                <div className="flex flex-col items-center">
                  <AnimatedProgressRing progress={analytics.efficiency} size={180} strokeWidth={14} delay={500} />
                  <p className={`mt-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('dashboard.teamEfficiencySubtitle')}</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { value: analytics.completed, label: t('dashboard.done'), color: 'emerald' },
                    { value: analytics.inProgress, label: t('dashboard.active'), color: 'blue' },
                    { value: analytics.pending, label: t('dashboard.pending'), color: 'amber' }
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${600 + i * 100}ms` }}>
                      <p className={`text-2xl font-black text-${stat.color}-400`}>{stat.value}</p>
                      <p className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border animate-slide-up parallax ${
              isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
            }`} style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 animate-pulse">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('dashboard.bottleneckTitle')}</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('dashboard.bottleneckSubtitle')}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bottlenecks.map((b, i) => <BottleneckCard key={b.id} bottleneck={b} index={i} />)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <Filters filters={filters} onChange={setFilters} />
            <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '100ms' }}>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('tasks.showing', { shown: filteredTasks.length, total: tasks.length })}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredTasks.map((task, i) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  user={USERS.find(u => u.id === task.userId)}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                  index={i}
                />
              ))}
            </div>
            {filteredTasks.length === 0 && (
              <div className={`text-center py-20 animate-bounce-in ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <div className="text-6xl mb-4 animate-float">📭</div>
                <p className="text-xl font-bold">{t('tasks.emptyTitle')}</p>
                <p className="text-sm mt-2">{t('tasks.emptySubtitle')}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border animate-slide-up parallax ${
              isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('analytics.teamPerformance')}</h3>
              <div className="space-y-4">
                {USERS.map((user, i) => {
                  const userTasks = tasks.filter(tsk => tsk.userId === user.id);
                  const completed = userTasks.filter(tsk => tsk.status === 'done').length;
                  const totalHours = userTasks.reduce((sum, tsk) => sum + tsk.timeSpent, 0);

                  return (
                    <div
                      key={user.id}
                      className={`p-5 rounded-2xl transition-all duration-500 hover:scale-[1.01] animate-slide-up ${
                        isDark ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl animate-float" style={{ animationDelay: `${i * 200}ms` }}>{user.avatar}</span>
                          <div>
                            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-2xl gradient-text">{user.efficiency}%</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('analytics.efficiency')}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{userTasks.length}</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('analytics.total')}</p>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-emerald-400">{completed}</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('status.done')}</p>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-blue-400">{totalHours}h</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('analytics.hours')}</p>
                        </div>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000" style={{ width: `${user.efficiency}%` }}>
                          <div className="w-full h-full shimmer-effect" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { status: 'done', label: t('status.done'), color: 'emerald', icon: '✅' },
                { status: 'in-progress', label: t('status.inProgress'), color: 'blue', icon: '🔄' },
                { status: 'pending', label: t('status.pending'), color: 'amber', icon: '⏳' }
              ].map((item, i) => {
                const count = tasks.filter(tsk => tsk.status === item.status).length;
                const percentage = tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;

                return (
                  <div
                    key={item.status}
                    className={`p-6 rounded-3xl border transition-all duration-500 hover:scale-105 animate-slide-up parallax ${
                      isDark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl'
                    }`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl animate-float">{item.icon}</span>
                      <span className={`text-4xl font-black text-${item.color}-400`}>{count}</span>
                    </div>
                    <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{percentage}%</p>
                    <div className={`mt-4 h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className={`h-full rounded-full bg-${item.color}-500 transition-all duration-1000`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />

      <footer className={`relative z-10 py-8 text-center border-t ${isDark ? 'border-slate-800/50 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
        <p className="text-sm">
          <span className="opacity-80">{t('footer.prefix')} </span>
          <span className="gradient-text font-bold">FLOWLYTICS</span>
          <span className="opacity-80"> {t('footer.suffix')}</span>
        </p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </LanguageProvider>
);
