import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark)] overflow-hidden">
            <div className="flex flex-col items-center space-y-6">
                {/* Spinner with custom colors and glow effect */}
                <div
                    className="w-20 h-20 border-4 border-t-4
          border-[color-mix(in_srgb,var(--color-dark-100)_80%,transparent)]
          border-t-[var(--color-primary)]
          rounded-full
          animate-spin
          shadow-glow-sm"
                />

                {/* Loading text with gradient effect */}
                <p className="text-2xl text-gradient text-gradient-primary font-semibold tracking-wide">
                    Loading...
                </p>

                {/* Optional subtle pulse effect */}
                <div
                    className="w-12 h-1 bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]
          animate-pulse-slow rounded-full"
                />
            </div>
        </div>
    );
};

export default Loading;
