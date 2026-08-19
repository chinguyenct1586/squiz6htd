import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { Question, StageId } from '../../types';
import { MISSION1_QUESTIONS } from '../../data/questions';
import { playSoundEffect } from '../../utils/sound';
import { Mascot } from '../Mascot';

interface Mission1SubjectsProps {
  onComplete: (xpEarned: number, badgeId?: string) => void;
  onNextStage: (next: StageId) => void;
  soundEnabled: boolean;
}

export const Mission1Subjects: React.FC<Mission1SubjectsProps> = ({
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

  const question: Question = MISSION1_QUESTIONS[currentQIndex];

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

    if (currentQIndex + 1 < MISSION1_QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSoundEffect('fanfare', soundEnabled);
      onComplete(80, 'subject_scout');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Visual Flashcards Theory Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">👦</span>
            <div>
              <h2 className="text-xl font-black text-slate-800">
                Khám phá: Ai là "Nhân Vật Đặc Biệt"?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Ngôi thứ 3 số ít (Chỉ 1 người hoặc 1 con vật / đồ vật)
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            Nhiệm Vụ 1/5
          </span>
        </div>

        {/* Character Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 text-center">
            <div className="text-3xl mb-1">👦</div>
            <div className="font-extrabold text-amber-950 text-sm">Nam / Tom</div>
            <div className="text-xs font-bold text-amber-600 bg-amber-100/80 rounded-md py-0.5 mt-1">
              ➔ HE (Anh ấy)
            </div>
          </div>

          <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3 text-center">
            <div className="text-3xl mb-1">👧</div>
            <div className="font-extrabold text-rose-950 text-sm">Lan / Mai</div>
            <div className="text-xs font-bold text-rose-600 bg-rose-100/80 rounded-md py-0.5 mt-1">
              ➔ SHE (Cô ấy)
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 text-center">
            <div className="text-3xl mb-1">🐶</div>
            <div className="font-extrabold text-emerald-950 text-sm">The dog / cat</div>
            <div className="text-xs font-bold text-emerald-600 bg-emerald-100/80 rounded-md py-0.5 mt-1">
              ➔ IT (Nó - 1 con vật)
            </div>
          </div>

          <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3 text-center">
            <div className="text-3xl mb-1">📚</div>
            <div className="font-extrabold text-sky-950 text-sm">The book / car</div>
            <div className="text-xs font-bold text-sky-600 bg-sky-100/80 rounded-md py-0.5 mt-1">
              ➔ IT (Nó - 1 đồ vật)
            </div>
          </div>
        </div>

        {/* The Golden Rule banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-xs">
          <div className="font-bold text-xs uppercase tracking-wider text-amber-200 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Quy tắc 5 giây cực ngắn:</span>
          </div>
          <div className="text-sm sm:text-base font-extrabold leading-snug">
            👉 <span className="underline decoration-amber-200 underline-offset-2">He, She, It</span> và <span className="underline decoration-amber-200 underline-offset-2">MỘT người/vật</span> ➔ Động từ CẦN THÊM S/ES!
          </div>
          <div className="text-xs text-amber-100 mt-1 font-medium">
            (Ngược lại: I / You / We / They và 2 người trở lên như Nam & Lan ➔ Động từ giữ NGUYÊN MẪU)
          </div>
        </div>
      </div>

      {/* Mini-Game: "Ai Cần Chữ S?" */}
      {!isFinished ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-extrabold">🎮 Mini Game:</span>
              <span className="text-slate-800">Ai Cần Chữ S?</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-0.5 rounded-full">
              Câu {currentQIndex + 1} / {MISSION1_QUESTIONS.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQIndex + 1) / MISSION1_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-6 text-center space-y-2">
            <div className="text-lg sm:text-2xl font-black text-slate-800 tracking-wide font-mono">
              {question.question}
            </div>
            {question.vietnameseMeaning && (
              <div className="text-xs sm:text-sm text-slate-500 font-medium italic">
                (Dịch nghĩa: {question.vietnameseMeaning})
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {question.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              const isOptCorrect = opt === question.correctAnswer;

              let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

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

          {/* Hint Button & Step-by-Step Hint Card */}
          <div className="space-y-3 pt-1">
            {!isAnswered && (
              <div className="flex justify-end">
                <button
                  id="btn-show-hint"
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/70 hover:bg-amber-200/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
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

            {/* Smart Feedback Panel */}
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
                    <div className="flex-1 space-y-1.5">
                      <div className="font-black text-base">
                        {isCorrect ? 'Tuyệt vời! Chính xác! 🎯' : 'Chưa chính xác rồi, hãy xem bước suy luận nhé:'}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                        {question.explanation}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {!isCorrect && (
                          <button
                            id="btn-retry-question"
                            onClick={handleRetry}
                            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Thử lại 🔄</span>
                          </button>
                        )}
                        <button
                          id="btn-next-question"
                          onClick={handleNextQuestion}
                          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs ml-auto"
                        >
                          <span>{currentQIndex + 1 < MISSION1_QUESTIONS.length ? 'Câu tiếp theo' : 'Hoàn thành nhiệm vụ'}</span>
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
        /* Mission 1 Completion Celebration Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
            🏆
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            Xuất Sắc! Hoàn Thành Nhiệm Vụ 1!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Bạn đã nhận diện thành thạo He, She, It và phân biệt chính xác chủ ngữ số ít với số nhiều!
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 inline-flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <div className="text-left">
              <div className="text-xs font-bold text-amber-900">Đã mở khóa huy hiệu mới!</div>
              <div className="text-sm font-extrabold text-amber-700">Nhận Diện Siêu Đẳng ⭐ +80 XP</div>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              id="btn-goto-mission2"
              onClick={() => onNextStage('mission2_spelling')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-base transition-all cursor-pointer"
            >
              <span>Tiến vào Nhiệm Vụ 2 (Quy tắc S / ES)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
