import React from 'react';
import { Volume2, VolumeX, BookOpen, Flame, Award, Home } from 'lucide-react';
import { StageId } from '../types';

interface NavbarProps {
  currentStage: StageId;
  xp: number;
  combo: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCheatSheet: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  xp,
  combo,
  soundEnabled,
  onToggleSound,
  onOpenCheatSheet,
  onGoHome,
}) => {
  const getStageTitle = () => {
    switch (currentStage) {
      case 'welcome':
        return 'Khởi Hành';
      case 'mission1_subjects':
        return 'Nhiệm Vụ 1: Ai Là He / She / It?';
      case 'mission2_spelling':
        return 'Nhiệm Vụ 2: Siêu Năng Lực S / ES / IES';
      case 'mission3_boss_spelling':
        return 'Nhiệm Vụ 3: Thử Thách S / ES / IES';
      case 'mission4_does_trap':
        return 'Nhiệm Vụ 4: Cạm Bẫy DOES & DOESN’T';
      case 'mission5_grand_battle':
        return 'Nhiệm Vụ 5: Đại Chiến He - She - It';
      case 'results':
        return 'Bảng Vinh Danh S Master';
      default:
        return 'S QUEST';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-amber-200/80 shadow-xs px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Home */}
        <button
          id="btn-nav-home"
          onClick={onGoHome}
          className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-sm border border-amber-300 group-hover:rotate-6 transition-transform">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-800 tracking-tight">
                S QUEST
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Lớp 6
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium truncate max-w-[200px] md:max-w-xs">
              {getStageTitle()}
            </p>
          </div>
        </button>

        {/* Dynamic Game Stats & Quick Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Pill */}
          <div 
            id="pill-xp-counter"
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold shadow-2xs"
            title="Điểm kinh nghiệm (XP)"
          >
            <span className="text-amber-500">⭐</span>
            <span>{xp}</span>
            <span className="text-[10px] text-amber-600 font-semibold uppercase">XP</span>
          </div>

          {/* Combo Multiplier (Shows when > 1) */}
          {combo > 1 && (
            <div 
              id="pill-combo-counter"
              className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-full text-xs font-black animate-bounce shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>x{combo} Combo!</span>
            </div>
          )}

          {/* 5-Sec Formula Cheat Sheet Modal Trigger */}
          <button
            id="btn-open-cheatsheet"
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 text-sky-700 border border-sky-200 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            title="Bí kíp công thức 5 giây"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
            <span className="hidden md:inline">Bí Kíp</span>
            <span className="text-sky-600 font-bold">5s ⚡</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className="p-1.5 sm:p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-amber-100/60 active:scale-95 transition-all cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>

          {/* Home shortcut if in a mission */}
          {currentStage !== 'welcome' && (
            <button
              id="btn-nav-return-map"
              onClick={onGoHome}
              className="p-1.5 sm:p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-amber-100/60 active:scale-95 transition-all cursor-pointer"
              title="Về Bản đồ nhiệm vụ"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
