import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles, ChevronRight, Target } from 'lucide-react';
import { Question, StageId } from '../../types';
import { MISSION3_QUESTIONS } from '../../data/questions';
import { playSoundEffect } from '../../utils/sound';

interface Mission3BossSpellingProps {
  onComplete: (xpEarned: number, badgeId?: string) => void;
  onNextStage: (next: StageId) => void;
  soundEnabled: boolean;
}

export const Mission3BossSpelling: React.FC<Mission3BossSpellingProps> = ({
  onComplete,
  onNextStage,
  soundEnabled,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question: Question = MISSION3_QUESTIONS[currentQIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      playSoundEffect('correct', soundEnabled);
    } else {
      playSoundEffect('wrong', soundEnabled);
    }
  };

  const handleRetry = () => {
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

    if (currentQIndex + 1 < MISSION3_QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSoundEffect('fanfare', soundEnabled);
      onComplete(100, 'ies_wizard');
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
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-emerald-100">
            Nhiệm Vụ 3/5
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Boss "S hay ES hay IES?"
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
            Áp dụng thần chú chia động từ và giải thích từng bước suy luận.
          </p>
        </div>
        <div className="text-3xl sm:text-4xl">🎯</div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-200 shadow-md space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-extrabold">Thử thách:</span>
              <span className="text-slate-800">Câu {currentQIndex + 1} / {MISSION3_QUESTIONS.length}</span>
              {getDifficultyBadge(question.difficulty)}
            </div>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-0.5 rounded-full">
              Đúng {score} câu
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQIndex + 1) / MISSION3_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-lg sm:text-2xl font-black text-slate-800 tracking-wide font-mono">
              {question.question}
            </div>
            {question.vietnameseMeaning && (
              <div className="text-xs sm:text-sm text-slate-500 font-medium italic">
                (Dịch nghĩa: {question.vietnameseMeaning})
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {question.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              const isOptCorrect = opt === question.correctAnswer;

              let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/40';

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
                  className={`p-4 rounded-2xl text-base sm:text-lg font-extrabold transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isOptCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  {isAnswered && isSelected && !isOptCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint & Feedback */}
          <div className="space-y-3 pt-1">
            {!isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-100/70 hover:bg-teal-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-teal-600" />
                  <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý suy luận 💡'}</span>
                </button>
              </div>
            )}

            {showHint && !isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-xs text-teal-900 space-y-1.5"
              >
                <div className="font-bold flex items-center gap-1.5 text-teal-800">
                  <Lightbulb className="w-4 h-4" />
                  <span>Các bước suy luận từng bước:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {question.hintSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Smart Step Feedback */}
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
                      {isCorrect ? '🎯' : '💡'}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="font-black text-base sm:text-lg">
                        {isCorrect ? 'CHÍNH XÁC! 🎯' : 'Chưa đúng, hãy xem cách suy luận từng bước:'}
                      </div>

                      {/* Explicit Step-by-Step reasoning box */}
                      <div className="bg-white/80 border border-emerald-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 space-y-1">
                        {question.hintSteps.map((s, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700 shrink-0">{i + 1}.</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-slate-700">
                        {question.explanation}
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
                          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs ml-auto"
                        >
                          <span>{currentQIndex + 1 < MISSION3_QUESTIONS.length ? 'Câu tiếp theo' : 'Hoàn thành nhiệm vụ'}</span>
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
      ) : (
        /* Finished Mission 3 Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg"
        >
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
            ✨
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            Tuyệt Đỉnh! Bạn Đã Hạ Gục Boss S / ES / IES!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Bạn đã hiểu rõ bản chất từng bước suy luận ngữ pháp từ chủ ngữ đến đuôi động từ!
          </p>

          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 inline-flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div className="text-left">
              <div className="text-xs font-bold text-teal-900">Đã mở khóa huy hiệu mới!</div>
              <div className="text-sm font-extrabold text-teal-700">Phù Thủy IES ⭐ +100 XP</div>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onNextStage('mission4_does_trap')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-base transition-all cursor-pointer"
            >
              <span>Tiến vào Nhiệm Vụ 4 (Cạm Bẫy DOES)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
