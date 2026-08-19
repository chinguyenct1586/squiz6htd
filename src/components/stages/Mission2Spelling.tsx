import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, RotateCcw, ChevronRight, Wand2 } from 'lucide-react';
import { StageId } from '../../types';
import { playSoundEffect } from '../../utils/sound';

interface Mission2SpellingProps {
  onComplete: (xpEarned: number, badgeId?: string) => void;
  onNextStage: (next: StageId) => void;
  soundEnabled: boolean;
}

interface VerbTransformItem {
  base: string;
  category: 'S' | 'ES' | 'IES' | 'HAS';
  transformed: string;
  ruleExplanation: string;
  mnemonicNote?: string;
}

const VERB_ITEMS: VerbTransformItem[] = [
  {
    base: 'watch',
    category: 'ES',
    transformed: 'watches',
    ruleExplanation: 'Kết thúc bằng "CH" (Chạy) ➔ Thêm ES!',
    mnemonicNote: 'Ông Sáu [Ch]ạy Xe SH',
  },
  {
    base: 'play',
    category: 'S',
    transformed: 'plays',
    ruleExplanation: 'Nguyên âm "A" + Y (không phải phụ âm) ➔ Chỉ thêm S!',
  },
  {
    base: 'study',
    category: 'IES',
    transformed: 'studies',
    ruleExplanation: 'Phụ âm "D" + Y ➔ Đổi Y thành I rồi thêm ES!',
  },
  {
    base: 'go',
    category: 'ES',
    transformed: 'goes',
    ruleExplanation: 'Kết thúc bằng "O" (Ông) ➔ Thêm ES!',
    mnemonicNote: '[Ô]ng Sáu Chạy Xe SH',
  },
  {
    base: 'fly',
    category: 'IES',
    transformed: 'flies',
    ruleExplanation: 'Phụ âm "L" + Y ➔ Đổi Y thành I rồi thêm ES!',
  },
  {
    base: 'wash',
    category: 'ES',
    transformed: 'washes',
    ruleExplanation: 'Kết thúc bằng "SH" (SH) ➔ Thêm ES!',
    mnemonicNote: 'Ông Sáu Chạy Xe [SH]',
  },
  {
    base: 'read',
    category: 'S',
    transformed: 'reads',
    ruleExplanation: 'Động từ thông thường kết thúc bằng D ➔ Chỉ thêm S!',
  },
  {
    base: 'fix',
    category: 'ES',
    transformed: 'fixes',
    ruleExplanation: 'Kết thúc bằng "X" (Xe) ➔ Thêm ES!',
    mnemonicNote: 'Ông Sáu Chạy [X]e SH',
  },
  {
    base: 'have',
    category: 'HAS',
    transformed: 'has',
    ruleExplanation: 'Trường hợp đặc biệt: have biến thành "has"!',
  },
];

export const Mission2Spelling: React.FC<Mission2SpellingProps> = ({
  onComplete,
  onNextStage,
  soundEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'transformer'>('rules');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = VERB_ITEMS[currentIndex];

  const handleSelectCategory = (cat: 'S' | 'ES' | 'IES' | 'HAS') => {
    if (isAnswered) return;
    setSelectedCategory(cat);
    setIsAnswered(true);

    const correct = cat === currentItem.category;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      playSoundEffect('correct', soundEnabled);
    } else {
      playSoundEffect('wrong', soundEnabled);
    }
  };

  const handleNextItem = () => {
    playSoundEffect('click', soundEnabled);
    setSelectedCategory(null);
    setIsAnswered(false);

    if (currentIndex + 1 < VERB_ITEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      playSoundEffect('fanfare', soundEnabled);
      onComplete(90, 'es_explorer');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
            Nhiệm Vụ 2/5
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
            Siêu Năng Lực S / ES / IES
          </h2>
        </div>

        <div className="flex rounded-2xl bg-amber-100/60 p-1 border border-amber-200">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 Bí Kíp Thần Chú
          </button>
          <button
            onClick={() => setActiveTab('transformer')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'transformer'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Máy Biến Hình</span>
          </button>
        </div>
      </div>

      {activeTab === 'rules' ? (
        /* Rules / Theory Display Cards */
        <div className="space-y-4">
          {/* Rule 1: +S */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black text-sm">
                1
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                Quy Tắc 1: Thêm S (Đa số các động từ bình thường)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Với hầu hết các động từ thông thường, ta chỉ cần thêm chữ <strong>S</strong> vào sau:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs sm:text-sm">
              <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-center">
                play ➔ <span className="font-bold text-sky-700">plays</span>
              </div>
              <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-center">
                read ➔ <span className="font-bold text-sky-700">reads</span>
              </div>
              <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-center">
                run ➔ <span className="font-bold text-sky-700">runs</span>
              </div>
              <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-center">
                like ➔ <span className="font-bold text-sky-700">likes</span>
              </div>
            </div>
          </div>

          {/* Rule 2: +ES with Mnemonic */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 sm:p-6 border-2 border-orange-300 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                2
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-orange-950">
                Quy Tắc 2: Thêm ES – Thần Chú "Ông Sáu Chạy Xe SH"
              </h3>
            </div>
            <div className="bg-white/80 border border-orange-200 rounded-2xl p-3 mb-3">
              <div className="text-xs font-black text-orange-800 uppercase tracking-wide">
                🔥 Mẹo nhớ siêu tốc:
              </div>
              <div className="text-base sm:text-lg font-black text-orange-600 mt-0.5">
                <span className="underline">Ô</span>ng (O) - <span className="underline">S</span>áu (S) - <span className="underline">Ch</span>ạy (CH) - <span className="underline">X</span>e (X) - <span className="underline">SH</span> (SH)
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs sm:text-sm">
              <div className="bg-orange-100/70 border border-orange-200 p-2.5 rounded-xl text-center">
                g<strong>o</strong> ➔ <span className="font-bold text-orange-800">goes</span>
              </div>
              <div className="bg-orange-100/70 border border-orange-200 p-2.5 rounded-xl text-center">
                pas<strong>s</strong> ➔ <span className="font-bold text-orange-800">passes</span>
              </div>
              <div className="bg-orange-100/70 border border-orange-200 p-2.5 rounded-xl text-center">
                wat<strong>ch</strong> ➔ <span className="font-bold text-orange-800">watches</span>
              </div>
              <div className="bg-orange-100/70 border border-orange-200 p-2.5 rounded-xl text-center">
                fi<strong>x</strong> ➔ <span className="font-bold text-orange-800">fixes</span>
              </div>
              <div className="bg-orange-100/70 border border-orange-200 p-2.5 rounded-xl text-center">
                wa<strong>sh</strong> ➔ <span className="font-bold text-orange-800">washes</span>
              </div>
            </div>
          </div>

          {/* Rule 3: Phụ âm + Y vs Nguyên âm + Y */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-black text-sm">
                3
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                Quy Tắc 3: Đổi Y thành IES
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl space-y-1">
                <div className="font-bold text-indigo-900">
                  ✓ Phụ âm + Y ➔ Đổi thành <strong>IES</strong>:
                </div>
                <div className="text-slate-600 font-mono">
                  stu<strong>dy</strong> ➔ <span className="font-bold text-indigo-700">studies</span>
                </div>
                <div className="text-slate-600 font-mono">
                  f<strong>ly</strong> ➔ <span className="font-bold text-indigo-700">flies</span>
                </div>
                <div className="text-slate-600 font-mono">
                  c<strong>ry</strong> ➔ <span className="font-bold text-indigo-700">cries</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl space-y-1">
                <div className="font-bold text-emerald-900">
                  ⚠️ Lưu ý: Nguyên âm (u, e, o, a, i) + Y ➔ Chỉ + <strong>S</strong>:
                </div>
                <div className="text-slate-600 font-mono">
                  pl<strong>ay</strong> ➔ <span className="font-bold text-emerald-700">plays</span> (có chữ a)
                </div>
                <div className="text-slate-600 font-mono">
                  enj<strong>oy</strong> ➔ <span className="font-bold text-emerald-700">enjoys</span> (có chữ o)
                </div>
              </div>
            </div>

            <div className="mt-3 bg-amber-50 border border-amber-300 p-3 rounded-2xl flex items-center gap-2 text-xs text-amber-950 font-medium">
              <span>🌟</span>
              <span><strong>Đặc biệt:</strong> Động từ <code>have</code> đi với He/She/It chuyển thành <code>has</code>!</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveTab('transformer')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm sm:text-base cursor-pointer active:scale-95 transition-all"
            >
              <Wand2 className="w-5 h-5" />
              <span>Chơi Mini Game "Máy Biến Hình Động Từ" 🚀</span>
            </button>
          </div>
        </div>
      ) : (
        /* Transformer Mini Game */
        !isFinished ? (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md space-y-5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-extrabold">🪄 Mini Game:</span>
                <span className="text-slate-800">Biến Hình Động Từ</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-0.5 rounded-full">
                Từ {currentIndex + 1} / {VERB_ITEMS.length}
              </div>
            </div>

            {/* Transform Machine Visual Display */}
            <div className="bg-gradient-to-b from-amber-500/10 to-orange-500/10 border-2 border-dashed border-amber-300 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
                Động từ gốc khi gặp He / She / It:
              </div>

              {/* Word Morphing Box */}
              <div className="my-3 flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-black text-slate-800 bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-200">
                  {currentItem.base}
                </span>

                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="text-2xl text-amber-500 font-black"
                >
                  ➔
                </motion.span>

                <div className="min-w-[120px] text-3xl sm:text-4xl font-mono font-black px-5 py-2 rounded-2xl border-2 flex items-center justify-center transition-all bg-white shadow-sm border-amber-300 text-amber-600">
                  {isAnswered ? (
                    <motion.span
                      initial={{ scale: 0.5, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="font-bold text-amber-700"
                    >
                      {currentItem.transformed}
                    </motion.span>
                  ) : (
                    <span className="text-slate-300">???</span>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Chọn quy tắc biến hình phù hợp nhất:
              </div>
            </div>

            {/* 4 Category Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { cat: 'S', label: '+ S', sub: 'Động từ bình thường' },
                { cat: 'ES', label: '+ ES', sub: 'Ông Sáu Chạy Xe SH' },
                { cat: 'IES', label: '➔ IES', sub: 'Phụ âm + Y' },
                { cat: 'HAS', label: 'has', sub: 'Đặc biệt (have)' },
              ].map((item) => {
                const isSelected = selectedCategory === item.cat;
                const isCatCorrect = item.cat === currentItem.category;

                let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50';

                if (isAnswered) {
                  if (isCatCorrect) {
                    btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCatCorrect) {
                    btnStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={item.cat}
                    onClick={() => handleSelectCategory(item.cat as any)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-2xl text-center transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col items-center justify-center ${btnStyle}`}
                  >
                    <span className="text-xl sm:text-2xl font-black font-mono">{item.label}</span>
                    <span className="text-[11px] text-slate-500 font-semibold mt-0.5">{item.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-4 sm:p-5 border-2 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{isCorrect ? '🎉' : '💡'}</span>
                    <div className="flex-1 space-y-1">
                      <div className="font-black text-sm sm:text-base">
                        {isCorrect ? 'Tuyệt vời! Biến hình thành công!' : 'Hãy xem lại quy tắc nhé:'}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {currentItem.ruleExplanation}
                      </p>
                      {currentItem.mnemonicNote && (
                        <div className="text-xs font-bold text-orange-700 mt-1">
                          👉 Mẹo nhớ: {currentItem.mnemonicNote}
                        </div>
                      )}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextItem}
                          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          <span>{currentIndex + 1 < VERB_ITEMS.length ? 'Từ tiếp theo' : 'Hoàn thành máy biến hình'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Finished Mission 2 Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
              ⚡
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              Xuất Sắc! Bạn Đã Làm Chủ Thần Chú S / ES / IES!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Không gì có thể làm khó bạn với mẹo "Ông Sáu Chạy Xe SH" và bí kíp đổi Y thành IES!
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 inline-flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <div className="text-xs font-bold text-orange-900">Đã mở khóa huy hiệu mới!</div>
                <div className="text-sm font-extrabold text-orange-700">Thần Chú ES ⭐ +90 XP</div>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => onNextStage('mission3_boss_spelling')}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-base transition-all cursor-pointer"
              >
                <span>Tiến vào Nhiệm Vụ 3 (Thử Thách S / ES / IES)</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};
