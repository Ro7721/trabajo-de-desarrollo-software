import React, { useEffect, useState } from "react";

const icons = {
    success: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
    ),
};

const themes = {
    success: {
        bg: "from-emerald-500/90 to-emerald-600/90",
        border: "border-emerald-400/30",
        text: "text-white",
        progress: "bg-emerald-200",
        glow: "shadow-emerald-500/25",
    },
    error: {
        bg: "from-rose-500/90 to-rose-600/90",
        border: "border-rose-400/30",
        text: "text-white",
        progress: "bg-rose-200",
        glow: "shadow-rose-500/25",
    },
    warning: {
        bg: "from-amber-400/90 to-amber-500/90",
        border: "border-amber-300/30",
        text: "text-amber-950",
        progress: "bg-amber-800/40",
        glow: "shadow-amber-400/25",
    },
    info: {
        bg: "from-blue-500/90 to-blue-600/90",
        border: "border-blue-400/30",
        text: "text-white",
        progress: "bg-blue-200",
        glow: "shadow-blue-500/25",
    },
};

const DURATION = 3500;

export default function EdgeNotification({ message, type = "info", onClose, index = 0 }) {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const theme = themes[type] || themes.info;
    const icon = icons[type] || icons.info;

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
            setProgress(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => onClose(), 300);
    };

    const offset = index * 72;

    return (
        <div
            className="fixed right-5 z-[9999]"
            style={{
                top: `${20 + offset}px`,
                animation: isExiting
                    ? "notif-slide-out 0.3s cubic-bezier(0.4, 0, 1, 1) forwards"
                    : "notif-slide-in 0.4s cubic-bezier(0, 0, 0.2, 1) forwards",
            }}
        >
            <div
                className={`
                    relative overflow-hidden
                    flex items-center gap-3
                    pl-4 pr-3 py-3
                    min-w-[300px] max-w-[420px]
                    rounded-xl border ${theme.border}
                    bg-gradient-to-r ${theme.bg}
                    backdrop-blur-xl
                    shadow-2xl ${theme.glow}
                    ${theme.text}
                `}
            >
                {/* Icon */}
                <div className="flex items-center justify-center">
                    {icon}
                </div>

                {/* Message */}
                <p className="flex-1 text-sm font-medium leading-snug pr-1">
                    {message}
                </p>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center w-6 h-6 rounded-full
                               hover:bg-white/20 transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Cerrar notificación"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                </button>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10">
                    <div
                        className={`h-full ${theme.progress} transition-none rounded-full`}
                        style={{ width: `${progress}%`, opacity: 0.7 }}
                    />
                </div>
            </div>

            {/* Inline keyframes */}
            <style>{`
                @keyframes notif-slide-in {
                    0% {
                        opacity: 0;
                        transform: translateX(100%) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                @keyframes notif-slide-out {
                    0% {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(100%) scale(0.95);
                    }
                }
            `}</style>
        </div>
    );
}