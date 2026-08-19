import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Lightbulb, RotateCcw, ArrowRight, CheckCircle2, XCircle, Trophy, Sparkles, Swords } from 'lucide-react';
import { Question, StageId, UserAnswerRecord } from '../../types';
import { GRAND_BATTLE_QUESTIONS } from '../../data/questions';
import { playSoundEffect } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface Mission5GrandBattleProps {
  onCompleteBattle: (
    finalScore: number,
    totalQuestions: number,
    history: UserAnswerRecord[],
    earnedXp: number
  ) => void;
  soundEnabled: boolean;
  onOpenCheatSheet: () => void;
}

export const Mission5GrandBattle: React.FC<Mission5GrandBattleProps> = ({
  onCompleteBattle,
  soundEnabled,
  onOpenCheatSheet,
}) => {
  // We can choose 10 questions for the main arena round (or allow continuous mode)
  const [battleQuestions, setBattleQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<UserAnswerRecord[]>([]);

  // Initialize randomized 10 questions covering all 5 categories
  useEffect(() => {
    // Pick 10 representative balanced questions
    const shuffled = [...GRAND_BATTLE_QUESTIONS].sort(() => 0.5 - Math.random());
    setBattleQuestions(shuffled.slice(0, 10));
  }, []);

  if (battleQuestions.length === 0) return null;

  const currentQ = battleQuestions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);

    const newHistoryItem: UserAnswerRecord = {
      questionId: currentQ.id,
      userAnswer: option,
      isCorrect: correct,
      questionText: currentQ.question,
      explanation: currentQ.explanation,
    };
    setAnswersHistory((prev) => [...prev, newHistoryItem]);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setSessionScore((prev) => prev + 1);

      // XP calculation with combo multiplier
      const baseXP = 15;
      const comboBonus = newStreak >= 3 ? 10 : 0;
      const earned = baseXP + comboBonus;
      setTotalXpEarned((prev) => prev + earned);

      if (newStreak >= 3) {
        playSoundEffect('combo', soundEnabled);
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.8 },
        });
      } else {
        playSoundEffect('correct', soundEnabled);
      }
    } else {
      setStreak(0);
      playSoundEffect('wrong', soundEnabled);
    }
  };

  const handleRetry = () => {
    // Remove last history entry if retrying
    setAnswersHistory((prev) => prev.slice(0, -1));
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    playSoundEffect('click', soundEnabled);
  };

  const handleNextQuestion = () => {
    playSoundEffect('click', soundEnabled);
    setShowHint(false);
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex + 1 < battleQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed boss battle
      playSoundEffect('fanfare', soundEnabled);
      onCompleteBattle(
        sessionScore + (isCorrect ? 0 : 0),
        battleQuestions.length,
        answersHistory,
        totalXpEarned
      );
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'easy':
        return <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">🟢 Dễ</span>;
      case 'medium':
        return <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">🟡 Trung bình</span>;
      case 'hard':
        return <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">🔴 Thử thách</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Boss Arena Top Bar */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-purple-500">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner shrink-0">
            <Swords className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs font-black uppercase tracking-wider bg-purple-900/60 px-2.5 py-0.5 rounded-full text-purple-200 border border-purple-400/40">
                Nhiệm Vụ 5: Đấu Trường Boss
              </span>
              {streak >= 2 && (
                <span className="inline-flex items-center gap-1 text-xs font-black bg-gradient-to-r from-orange-500 to-amber-400 text-white px-2 py-0.5 rounded-full animate-pulse shadow-xs">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {streak} Combo!
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              ĐẠI CHIẾN HE – SHE – IT
            </h2>
          </div>
        </div>

        {/* Live Arena Score Tracker */}
        <div className="flex items-center gap-2.5 bg-purple-900/60 p-2 rounded-2xl border border-purple-400/40 text-xs sm:text-sm font-bold">
          <div className="px-3 py-1 bg-white/10 rounded-xl">
            Điểm: <span className="text-amber-300 font-extrabold">{sessionScore}/{battleQuestions.length}</span>
          </div>
          <div className="px-3 py-1 bg-amber-400/20 text-amber-200 rounded-xl">
            + {totalXpEarned} XP
          </div>
        </div>
      </div>

      {/* Arena Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-purple-200 shadow-md space-y-5">
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-purple-700 font-extrabold">Câu hỏi {currentIndex + 1} / {battleQuestions.length}</span>
            {getDifficultyBadge(currentQ.difficulty)}
          </div>
          <button
            onClick={onOpenCheatSheet}
            className="text-xs text-sky-600 hover:text-sky-800 font-bold underline cursor-pointer"
          >
            Mở Bí Kíp 5s ⚡
          </button>
        </div>

        {/* Progress line */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / battleQuestions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question sentence */}
        <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 sm:p-7 text-center space-y-2">
          <div className="text-lg sm:text-2xl font-black text-slate-800 tracking-wide font-mono leading-relaxed">
            {currentQ.question}
          </div>
          {currentQ.vietnameseMeaning && (
            <div className="text-xs sm:text-sm text-slate-500 font-medium italic">
              (Dịch nghĩa: {currentQ.vietnameseMeaning})
            </div>
          )}
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options?.map((opt) => {
            const isSelected = selectedOption === opt;
            const isOptCorrect = opt === currentQ.correctAnswer;

            let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50/30';

            if (isAnswered) {
              if (isOptCorrect) {
                btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isOptCorrect) {
                btnStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl text-left font-bold text-sm sm:text-base transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span className="font-mono">{opt}</span>
                {isAnswered && isOptCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isAnswered && isSelected && !isOptCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Hint button & Panel */}
        <div className="space-y-3 pt-1">
          {!isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100/70 hover:bg-purple-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-purple-600" />
                <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý suy luận 💡'}</span>
              </button>
            </div>
          )}

          {showHint && !isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 text-xs text-purple-950 space-y-1.5"
            >
              <div className="font-bold flex items-center gap-1.5 text-purple-800">
                <Lightbulb className="w-4 h-4" />
                <span>Các bước suy luận từng bước:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {currentQ.hintSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Answer Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl p-4 sm:p-5 border-2 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl mt-0.5">
                    {isCorrect ? '🎉' : '💡'}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="font-black text-base sm:text-lg flex items-center gap-2">
                      <span>{isCorrect ? 'Tuyệt vời! Chính xác! 🎯' : 'Chưa đúng rồi, hãy đọc giải thích này:'}</span>
                      {isCorrect && streak >= 3 && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-black">
                          🔥 Combo x{streak}!
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {!isCorrect && (
                        <button
                          onClick={handleRetry}
                          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Thử lại 🔄</span>
                        </button>
                      )}
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs ml-auto"
                      >
                        <span>{currentIndex + 1 < battleQuestions.length ? 'Câu tiếp theo' : 'Xem Kết Quả & Vinh Danh 🏆'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
