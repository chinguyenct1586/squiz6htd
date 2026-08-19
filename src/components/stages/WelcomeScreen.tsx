import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Sparkles, CheckCircle2, Trophy, Star, BookOpen, Shield, ChevronRight } from 'lucide-react';
import { StageId, Badge } from '../../types';
import { Mascot } from '../Mascot';

interface WelcomeScreenProps {
  completedMissions: StageId[];
  badges: Badge[];
  xp: number;
  onStart: (stage: StageId) => void;
  onOpenCheatSheet: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  completedMissions,
  badges,
  xp,
  onStart,
  onOpenCheatSheet,
}) => {
  const missions = [
    {
      id: 'mission1_subjects' as StageId,
      number: '1',
      title: 'Ai là nhân vật đặc biệt?',
      desc: 'Nhận biết He, She, It, 1 người, 1 vật và phân biệt số nhiều',
      icon: '👦',
      color: 'from-amber-400 to-orange-400',
    },
    {
      id: 'mission2_spelling' as StageId,
      number: '2',
      title: 'Siêu năng lực S / ES / IES',
      desc: 'Học mẹo "Ông Sáu Chạy Xe SH", quy tắc Y ➔ IES & have ➔ has',
      icon: '⚡',
      color: 'from-orange-400 to-amber-500',
    },
    {
      id: 'mission3_boss_spelling' as StageId,
      number: '3',
      title: 'Thử thách S / ES / IES',
      desc: 'Luyện 8 câu phản xạ với gợi ý 3 bước thông minh',
      icon: '🎯',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'mission4_does_trap' as StageId,
      number: '4',
      title: 'Cạm bẫy DOES & DOESN’T',
      desc: 'Khám phá nam châm hút chữ S trong câu phủ định & nghi vấn',
      icon: '🧲',
      color: 'from-sky-400 to-blue-500',
    },
    {
      id: 'mission5_grand_battle' as StageId,
      number: '5',
      title: 'Đại Chiến He – She – It',
      desc: 'Đấu trường 10 câu tổng hợp để nhận danh hiệu S Master 🏆',
      icon: '👑',
      color: 'from-violet-500 to-purple-600',
      isBoss: true,
    },
  ];

  const totalCompleted = completedMissions.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden border-2 border-amber-300">
        {/* Background decorative shapes */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-44 h-44 bg-orange-600/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950 shadow-xs border border-white/30">
              <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span>Tiếng Anh Lớp 6 • Present Simple</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-xs">
              BÍ KÍP HE – SHE – IT
            </h1>

            <p className="text-amber-100 font-semibold text-base sm:text-lg leading-snug">
              Chinh phục chữ S trong thì Hiện tại đơn!
            </p>

            <div className="bg-amber-600/40 border border-amber-300/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white font-medium italic">
              "Thêm đúng một chữ S – nói tiếng Anh tự tin hơn!"
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                id="btn-hero-start"
                onClick={() => onStart('mission1_subjects')}
                className="bg-white text-orange-600 hover:bg-amber-50 active:scale-95 font-extrabold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-2 text-base transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5 text-orange-500" />
                <span>Bắt đầu nhiệm vụ 🚀</span>
              </button>

              <button
                id="btn-hero-cheatsheet"
                onClick={onOpenCheatSheet}
                className="bg-amber-600/50 hover:bg-amber-600/70 border border-white/40 active:scale-95 font-bold px-4 py-3 rounded-2xl flex items-center gap-2 text-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-200" />
                <span>Bí Kíp 5 Giây ⚡</span>
              </button>
            </div>
          </div>

          {/* Animated Mascot display */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-2 shadow-2xl border-4 border-amber-200 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex flex-col items-center justify-center text-white relative">
                <span className="text-4xl sm:text-5xl font-black">S</span>
                <span className="text-[10px] sm:text-xs font-extrabold uppercase bg-amber-900/30 px-2 py-0.5 rounded-full mt-1">
                  S-Hero
                </span>
                <div className="absolute -top-2 -right-2 text-xl">⚡</div>
              </div>
            </motion.div>
            <div className="text-center text-xs font-semibold text-amber-100 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
              Nhiệm vụ đã xong: <span className="text-white font-bold">{totalCompleted}/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-amber-200 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 text-lg">
            ⭐
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Tổng điểm XP</div>
            <div className="text-lg font-black text-slate-800">{xp} XP</div>
          </div>
        </div>

        <div className="bg-white border border-amber-200 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
            🗺️
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Tiến độ 5 chặng</div>
            <div className="text-lg font-black text-slate-800">{Math.round((totalCompleted / 5) * 100)}%</div>
          </div>
        </div>

        <div className="bg-white border border-amber-200 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-lg">
            🏆
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Huy hiệu đạt</div>
            <div className="text-lg font-black text-slate-800">
              {badges.filter(b => b.unlocked).length}/{badges.length}
            </div>
          </div>
        </div>

        <div className="bg-white border border-amber-200 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 text-lg">
            📚
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Kho bài tập</div>
            <div className="text-lg font-black text-slate-800">30+ Câu</div>
          </div>
        </div>
      </div>

      {/* Mission Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <span>🗺️</span>
            <span>Bản Đồ 5 Nhiệm Vụ</span>
          </h2>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Học một chút ➔ Hiểu ngay ➔ Thực hành
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {missions.map((m) => {
            const isCompleted = completedMissions.includes(m.id);
            return (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart(m.id)}
                id={`card-mission-${m.number}`}
                className={`relative bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isCompleted
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : m.isBoss
                    ? 'border-purple-300 bg-purple-50/30'
                    : 'border-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center text-2xl shadow-sm shrink-0 font-black`}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        Nhiệm Vụ {m.number}
                      </span>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" /> Đã xong
                        </span>
                      )}
                      {m.isBoss && !isCompleted && (
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                          👑 Boss Arena
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-800 mt-1 leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>Vào thử thách</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Badges Preview Carousel */}
      <div className="bg-white border border-amber-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Huy Hiệu Vinh Danh ({badges.filter(b => b.unlocked).length}/{badges.length})</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1">{b.icon}</div>
              <div className="text-xs font-bold truncate">{b.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                {b.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
