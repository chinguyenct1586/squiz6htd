import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, Home, BookOpen, CheckCircle2, XCircle, Award, Sparkles, ChevronDown } from 'lucide-react';
import { Badge, UserAnswerRecord, StageId } from '../../types';
import { playSoundEffect } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  xp: number;
  badges: Badge[];
  history: UserAnswerRecord[];
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenCheatSheet: () => void;
  soundEnabled: boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  xp,
  badges,
  history,
  onPlayAgain,
  onGoHome,
  onOpenCheatSheet,
  soundEnabled,
}) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  useEffect(() => {
    if (percentage >= 70) {
      playSoundEffect('fanfare', soundEnabled);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [percentage, soundEnabled]);

  const getEvaluation = () => {
    if (percentage >= 90) {
      return {
        badgeIcon: '🏆',
        title: 'S Master Đại Tài!',
        message: 'Bạn đã rất chắc tay với He – She – It và các quy tắc chia động từ. Bậc thầy ngữ pháp tiếng Anh!',
        theme: 'from-amber-500 via-orange-500 to-amber-600',
        textColor: 'text-amber-900',
        bgPill: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    } else if (percentage >= 70) {
      return {
        badgeIcon: '🌟',
        title: 'Rất Tốt!',
        message: 'Bạn đã hiểu rất tốt các quy tắc chính. Hãy luyện thêm một chút phần đuôi ES và IES nhé!',
        theme: 'from-emerald-500 to-teal-600',
        textColor: 'text-emerald-900',
        bgPill: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      };
    } else if (percentage >= 50) {
      return {
        badgeIcon: '💪',
        title: 'Đang Tiến Bộ!',
        message: 'Bạn đang đi đúng hướng! Hãy ôn lại quy tắc He / She / It + S/ES và bẫy Does nhé.',
        theme: 'from-sky-500 to-blue-600',
        textColor: 'text-sky-900',
        bgPill: 'bg-sky-100 text-sky-900 border-sky-300',
      };
    } else {
      return {
        badgeIcon: '🌱',
        title: 'Đừng Lo Lắng!',
        message: 'Hãy mở Bí kíp 5 giây xem lại một chút và bấm "Thử lại" nhé. Bạn hoàn toàn có thể làm được!',
        theme: 'from-slate-600 to-slate-800',
        textColor: 'text-slate-900',
        bgPill: 'bg-slate-100 text-slate-900 border-slate-300',
      };
    }
  };

  const evalData = getEvaluation();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      {/* Result Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-3xl p-6 sm:p-10 text-white text-center shadow-xl relative overflow-hidden bg-gradient-to-br ${evalData.theme} border-2 border-white/20`}
      >
        <div className="text-5xl sm:text-6xl mb-2">{evalData.badgeIcon}</div>
        
        <div className="inline-block bg-white/20 backdrop-blur-xs px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 border border-white/30">
          Bạn đã hoàn thành {score}/{totalQuestions} câu ({percentage}%)!
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
          {evalData.title}
        </h1>

        <p className="text-white/90 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
          {evalData.message}
        </p>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-3 gap-2.5 max-w-md mx-auto">
          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <div className="text-xs text-white/80 font-medium">Chính xác</div>
            <div className="text-lg sm:text-xl font-black text-white">{percentage}%</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <div className="text-xs text-white/80 font-medium">Tổng điểm</div>
            <div className="text-lg sm:text-xl font-black text-amber-200">{xp} XP</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <div className="text-xs text-white/80 font-medium">Huy hiệu</div>
            <div className="text-lg sm:text-xl font-black text-white">
              {badges.filter((b) => b.unlocked).length}/{badges.length}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            id="btn-result-play-again"
            onClick={onPlayAgain}
            className="bg-white text-slate-900 hover:bg-amber-50 active:scale-95 font-extrabold px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-amber-600" />
            <span>Thử Thách Lại 🔄</span>
          </button>

          <button
            id="btn-result-cheatsheet"
            onClick={onOpenCheatSheet}
            className="bg-black/20 hover:bg-black/30 border border-white/40 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl flex items-center gap-2 text-sm transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span>Xem Bí Kíp 5 Giây ⚡</span>
          </button>

          <button
            id="btn-result-home"
            onClick={onGoHome}
            className="bg-black/20 hover:bg-black/30 border border-white/40 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl flex items-center gap-2 text-sm transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Bản Đồ 5 Nhiệm Vụ 🗺️</span>
          </button>
        </div>
      </motion.div>

      {/* Badges Unlocked Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-xs space-y-3">
        <h3 className="font-extrabold text-base sm:text-lg text-slate-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Kho Huy Hiệu Đã Chinh Phục</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
              }`}
            >
              <div className="text-3xl mb-1">{b.icon}</div>
              <div className="text-xs font-bold truncate">{b.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {b.unlocked ? '✓ Đã sở hữu' : 'Chưa mở khóa'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answers History & Detailed Explanations */}
      {history.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-600" />
              <span>Xem Lại & Giải Thích Chi Tiết Từng Câu</span>
            </div>
            <span className="text-xs font-normal text-slate-500">
              ({history.filter((h) => h.isCorrect).length}/{history.length} câu đúng)
            </span>
          </h3>

          <div className="space-y-3">
            {history.map((record, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 space-y-1.5 ${
                  record.isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-sm sm:text-base font-bold text-slate-800">
                    <span className="text-slate-400 font-sans mr-2">#{index + 1}</span>
                    {record.questionText}
                  </div>
                  <div className="shrink-0">
                    {record.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5" /> Bạn chọn: {record.userAnswer}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-100">
                  💡 <strong>Giải thích:</strong> {record.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
