import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Lightbulb, Heart, ShieldCheck } from 'lucide-react';

export type MascotMood = 'happy' | 'thinking' | 'cheering' | 'hint' | 'victory';

interface MascotProps {
  mood?: MascotMood;
  speech?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  speech,
  className = '',
}) => {
  const getMascotEmoji = () => {
    switch (mood) {
      case 'thinking':
        return '🤔';
      case 'cheering':
        return '🎉';
      case 'hint':
        return '💡';
      case 'victory':
        return '👑';
      case 'happy':
      default:
        return '⚡';
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Animated Character Avatar */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: mood === 'cheering' ? [-4, 4, -4] : [0, 0, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: 'easeInOut',
        }}
        className="relative shrink-0"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-300 p-0.5 shadow-md flex items-center justify-center border-2 border-white">
          <div className="w-full h-full bg-gradient-to-b from-amber-500 to-orange-500 rounded-[14px] flex items-center justify-center relative overflow-hidden text-2xl sm:text-3xl select-none">
            {/* S-Hero Emblem */}
            <span className="font-black text-white drop-shadow-md text-2xl tracking-tighter">
              S
            </span>
            <div className="absolute -bottom-1 -right-1 text-xs bg-white/90 rounded-full px-1 py-0.5 shadow-xs">
              {getMascotEmoji()}
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-amber-400/20 rounded-2xl blur-xs -z-10 animate-pulse" />
      </motion.div>

      {/* Speech Bubble */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white border border-amber-200 text-slate-800 text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-2xl rounded-tl-xs shadow-xs max-w-md leading-relaxed"
        >
          <div className="flex items-start gap-1.5">
            {mood === 'hint' && <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
            {mood === 'cheering' && <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />}
            {mood === 'victory' && <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
            <span>{speech}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
