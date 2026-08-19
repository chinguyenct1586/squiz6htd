import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Magnet, Lightbulb, RotateCcw, ArrowRight, CheckCircle2, XCircle, ChevronRight, Zap } from 'lucide-react';
import { Question, StageId } from '../../types';
import { MISSION4_QUESTIONS } from '../../data/questions';
import { playSoundEffect } from '../../utils/sound';

interface Mission4DoesTrapProps {
  onComplete: (xpEarned: number, badgeId?: string) => void;
  onNextStage: (next: StageId) => void;
  soundEnabled: boolean;
}

export const Mission4DoesTrap: React.FC<Mission4DoesTrapProps> = ({
  onComplete,
  onNextStage,
  soundEnabled,
}) => {
  const [demoState, setDemoState] = useState<'positive' | 'negative' | 'question'>('positive');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question: Question = MISSION4_QUESTIONS[currentQIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
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

    if (currentQIndex + 1 < MISSION4_QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSoundEffect('fanfare', soundEnabled);
      onComplete(100, 'does_detective');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-5 sm:p-7 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-sky-100">
            Nhiệm Vụ 4/5
          </span>
          <span className="text-3xl">🧲</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Cạm Bẫy "DOES & DOESN'T" – Nam Châm Hút Chữ S!
        </h2>
        <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed max-w-xl">
          Khi trợ động từ <strong>DOES</strong> hoặc <strong>DOESN'T</strong> xuất hiện, chữ <strong>S</strong> bị hút sang trợ động từ, động từ chính lập tức trở về <strong>NGUYÊN MẪU</strong>!
        </p>
      </div>

      {/* Interactive S-Magnet Simulator */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Magnet className="w-5 h-5 text-sky-600 animate-bounce" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
              Mô Phỏng: Nam Châm DOES Hút Chữ S
            </h3>
          </div>
          <div className="flex rounded-xl bg-sky-50 p-1 border border-sky-200 text-xs font-bold">
            <button
              onClick={() => { setDemoState('positive'); playSoundEffect('click', soundEnabled); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                demoState === 'positive' ? 'bg-sky-600 text-white' : 'text-slate-600'
              }`}
            >
              1. Khẳng định
            </button>
            <button
              onClick={() => { setDemoState('negative'); playSoundEffect('powerup', soundEnabled); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                demoState === 'negative' ? 'bg-sky-600 text-white' : 'text-slate-600'
              }`}
            >
              2. Phủ định
            </button>
            <button
              onClick={() => { setDemoState('question'); playSoundEffect('powerup', soundEnabled); }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                demoState === 'question' ? 'bg-sky-600 text-white' : 'text-slate-600'
              }`}
            >
              3. Nghi vấn (Hỏi)
            </button>
          </div>
        </div>

        {/* Dynamic Sentence Stage Display */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
          <div className="text-xs uppercase font-bold text-sky-400 tracking-wider">
            {demoState === 'positive' && 'Câu khẳng định (Chưa có Does):'}
            {demoState === 'negative' && 'Câu phủ định (Doesn’t hút chữ S):'}
            {demoState === 'question' && 'Câu nghi vấn (Does hút chữ S):'}
          </div>

          <div className="text-xl sm:text-3xl font-mono font-bold flex items-center justify-center gap-2 flex-wrap min-h-[48px]">
            {demoState === 'positive' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <span className="text-amber-300">She</span>
                <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-xl font-black">
                  play<span className="text-white underline">s</span>
                </span>
                <span>tennis.</span>
              </motion.div>
            )}

            {demoState === 'negative' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-amber-300">She</span>
                <motion.span
                  initial={{ scale: 1.3, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-sky-500 text-white px-3 py-1 rounded-xl font-black shadow-md"
                >
                  doesn’t
                </motion.span>
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-xl font-black">
                  play
                </span>
                <span>tennis.</span>
              </motion.div>
            )}

            {demoState === 'question' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 flex-wrap justify-center">
                <motion.span
                  initial={{ scale: 1.3, rotate: 5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-sky-500 text-white px-3 py-1 rounded-xl font-black shadow-md"
                >
                  Does
                </motion.span>
                <span className="text-amber-300">she</span>
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-xl font-black">
                  play
                </span>
                <span>tennis?</span>
              </motion.div>
            )}
          </div>

          <div className="text-xs text-slate-300 font-medium">
            {demoState === 'positive' && '👉 Động từ "play" thêm "s" vì chủ ngữ là She.'}
            {demoState === 'negative' && '👉 "doesn’t" đã giữ chữ S, nên "play" quay về NGUYÊN MẪU (không có s)!'}
            {demoState === 'question' && '👉 "Does" đã giữ chữ S, nên "play" quay về NGUYÊN MẪU (không có s)!'}
          </div>
        </div>
      </div>

      {/* Mini Game: "S Đang Ở Đâu?" */}
      {!isFinished ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-md space-y-5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-sky-600 font-extrabold">🎮 Mini Game:</span>
              <span className="text-slate-800">S Đang Ở Đâu?</span>
            </div>
            <div className="bg-sky-50 border border-sky-200 text-sky-800 px-3 py-0.5 rounded-full">
              Câu {currentQIndex + 1} / {MISSION4_QUESTIONS.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-sky-400 to-blue-600 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQIndex + 1) / MISSION4_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question text */}
          <div className="bg-sky-50/50 border border-sky-200 rounded-2xl p-5 text-center space-y-2">
            <div className="text-lg sm:text-2xl font-black text-slate-800 tracking-wide font-mono">
              {question.question}
            </div>
            {question.vietnameseMeaning && (
              <div className="text-xs sm:text-sm text-slate-500 font-medium italic">
                ({question.vietnameseMeaning})
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              const isOptCorrect = opt === question.correctAnswer;

              let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/30';

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
                  className={`p-3.5 sm:p-4 rounded-2xl text-left font-bold text-sm sm:text-base transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="font-mono">{opt}</span>
                  {isAnswered && isOptCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isOptCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-100/70 hover:bg-sky-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-sky-600" />
                  <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý suy luận 💡'}</span>
                </button>
              </div>
            )}

            {showHint && !isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-sky-900 space-y-1.5"
              >
                <div className="font-bold flex items-center gap-1.5 text-sky-800">
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
                        {isCorrect ? 'CHÍNH XÁC! 🎯' : 'Chưa đúng, hãy xem cách suy luận nhé:'}
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
                          <span>{currentQIndex + 1 < MISSION4_QUESTIONS.length ? 'Câu tiếp theo' : 'Hoàn thành nhiệm vụ'}</span>
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
        /* Finished Mission 4 Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-sky-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg"
        >
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
            🕵️
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            Tuyệt Vời! Bạn Là Thám Tử Phá Bẫy DOES!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Không còn bẫy "Does + V-s" nào có thể đánh lừa được bạn nữa!
          </p>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 inline-flex items-center gap-3">
            <span className="text-2xl">🕵️</span>
            <div className="text-left">
              <div className="text-xs font-bold text-sky-900">Đã mở khóa huy hiệu mới!</div>
              <div className="text-sm font-extrabold text-sky-700">Thám Tử DOES ⭐ +100 XP</div>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onNextStage('mission5_grand_battle')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 text-base sm:text-lg transition-all cursor-pointer"
            >
              <span>⚔️ TIẾN VÀO ĐẠI CHIẾN HE – SHE – IT (BOSS CUỐI)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
