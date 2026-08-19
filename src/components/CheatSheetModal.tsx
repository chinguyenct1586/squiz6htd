import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, BookOpen, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const cheatSheetText = `⚡ BÍ KÍP 5 GIÂY: THÌ HIỆN TẠI ĐƠN & NGÔI THỨ 3 SỐ ÍT (LỚP 6)

1. CÔNG THỨC CỐT LÕI:
• I / You / We / They / Số nhiều (Nam & Lan) ➔ Động từ NGUYÊN MẪU (V)
• He / She / It / Số ít (Nam / 1 người / 1 con vật) ➔ V + S / ES / IES
• Khi có DOES / DOESN’T ➔ Động từ chính trở về NGUYÊN MẪU (V)

2. BÍ KÍP THÊM S / ES / IES:
• Đuôi [O, S, X, CH, SH] ➔ Thêm ES (Mẹo nhớ: "Ông Sáu Chạy Xe SH")
  Ví dụ: go ➔ goes | watch ➔ watches | wash ➔ washes | fix ➔ fixes
• Phụ âm + Y ➔ Đổi Y thành IES (study ➔ studies | fly ➔ flies)
• Nguyên âm + Y ➔ Chỉ thêm S (play ➔ plays | enjoy ➔ enjoys)
• Từ đặc biệt: have ➔ has

3. VÍ DỤ NHANH:
✓ Khẳng định: She watches TV. / He plays football.
✓ Phủ định: She doesn’t watch TV.
✓ Nghi vấn: Does he play football?`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cheatSheetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                  ⚡ BẢNG NHỚ NHANH 5 GIÂY
                </h3>
                <p className="text-xs text-amber-100 font-medium">
                  Chụp màn hình hoặc sao chép để ôn tập bất kỳ lúc nào!
                </p>
              </div>
            </div>
            <button
              id="btn-close-cheatsheet"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content (Card formatted for easy viewing / screenshots) */}
          <div id="capture-cheatsheet-card" className="p-5 overflow-y-auto space-y-4 text-slate-800 text-sm">
            {/* Rule 1: The Core Formula */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
              <h4 className="font-extrabold text-amber-900 text-sm sm:text-base flex items-center gap-2 mb-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">1</span>
                Công thức cốt lõi (Ai cần chữ S?)
              </h4>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-amber-100 font-mono text-xs sm:text-sm flex flex-col gap-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>I / You / We / They / Số nhiều</span>
                    <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">➔ V (nguyên mẫu)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">Ví dụ: They play football. / Nam and Lan study.</div>
                </div>

                <div className="bg-amber-100/50 p-3 rounded-xl border border-amber-300 font-mono text-xs sm:text-sm flex flex-col gap-1">
                  <div className="flex items-center justify-between text-amber-950 font-bold">
                    <span>He / She / It / 1 người / 1 vật</span>
                    <span className="font-bold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-md">➔ V + S / ES / IES</span>
                  </div>
                  <div className="text-[11px] text-amber-800 font-sans">Ví dụ: He plays. / She watches TV. / The cat sleeps.</div>
                </div>
              </div>
            </div>

            {/* Rule 2: Spelling Rules + Mnemonic */}
            <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4">
              <h4 className="font-extrabold text-orange-950 text-sm sm:text-base flex items-center gap-2 mb-2.5">
                <span className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs font-black">2</span>
                Mẹo thần chú: S, ES hay IES?
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                {/* ES Mnemonic */}
                <div className="bg-white p-3 rounded-xl border border-orange-200">
                  <div className="font-bold text-orange-700 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Mẹo thêm ES: "Ông Sáu Chạy Xe SH"</span>
                  </div>
                  <p className="text-slate-600 mb-1.5 text-xs">
                    Tận cùng bằng <strong>O, S, X, CH, SH</strong> ➔ Thêm <strong>ES</strong>:
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">g<b>o</b> ➔ go<b>es</b></span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">wat<b>ch</b> ➔ watch<b>es</b></span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">wa<b>sh</b> ➔ wash<b>es</b></span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">fi<b>x</b> ➔ fix<b>es</b></span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">pas<b>s</b> ➔ pass<b>es</b></span>
                  </div>
                </div>

                {/* IES vs S */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-indigo-700 block mb-1">Phụ âm + Y ➔ IES:</span>
                    <p className="text-slate-600 font-mono">stu<b>dy</b> ➔ stud<b>ies</b></p>
                    <p className="text-slate-600 font-mono">f<b>ly</b> ➔ fl<b>ies</b></p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block mb-1">Nguyên âm + Y ➔ Chỉ +S:</span>
                    <p className="text-slate-600 font-mono">pl<b>ay</b> ➔ play<b>s</b></p>
                    <p className="text-slate-600 font-mono">enj<b>oy</b> ➔ enjoy<b>s</b></p>
                  </div>
                </div>

                <div className="bg-amber-100/60 p-2.5 rounded-xl border border-amber-300 text-xs font-medium text-amber-900">
                  ⚠️ <strong>Từ đặc biệt:</strong> <code>have</code> ➔ <code>has</code> (She has a cat).
                </div>
              </div>
            </div>

            {/* Rule 3: The DOES/DOESN'T Magnet */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4">
              <h4 className="font-extrabold text-sky-950 text-sm sm:text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xs font-black">3</span>
                Bẫy nam châm: DOES / DOESN’T
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed mb-2">
                Khi xuất hiện <strong>Does / Doesn’t</strong>, chữ S đã bị hút sang trợ động từ. Động từ chính bắt buộc quay về <strong>NGUYÊN MẪU</strong>!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-emerald-50 text-emerald-900 p-2 rounded-xl border border-emerald-200">
                  <span className="font-bold block">✓ ĐÚNG:</span>
                  Does she <strong>play</strong> tennis?<br/>
                  He doesn’t <strong>watch</strong> TV.
                </div>
                <div className="bg-rose-50 text-rose-900 p-2 rounded-xl border border-rose-200">
                  <span className="font-bold block">✗ SAI:</span>
                  Does she <s>plays</s> tennis?<br/>
                  He doesn’t <s>watches</s> TV.
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Copy button */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              id="btn-copy-cheatsheet"
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã sao chép vào bộ nhớ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao chép toàn bộ bí kíp</span>
                </>
              )}
            </button>
            <button
              id="btn-done-cheatsheet"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-200 active:bg-slate-300 font-semibold text-slate-700 text-sm cursor-pointer transition-colors"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
