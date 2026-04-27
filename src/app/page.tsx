"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeGift } from "@/lib/encode";

const MAX_LEN = 20;
const PLACEHOLDERS_A = ["스타벅스 아메리카노", "마라탕", "편의점 1만원권"];
const PLACEHOLDERS_B = ["에르메스 가방", "아이폰 16 Pro", "샤넬 향수"];

export default function HomePage() {
  const router = useRouter();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [openHelp, setOpenHelp] = useState(false);

  const isValid = a.trim().length > 0 && b.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const encoded = encodeGift({ a: a.trim(), b: b.trim() });
    router.push(`/share?d=${encoded}`);
  };

  const phA = PLACEHOLDERS_A[Math.floor(Math.random() * PLACEHOLDERS_A.length)];
  const phB = PLACEHOLDERS_B[Math.floor(Math.random() * PLACEHOLDERS_B.length)];

  return (
    <main className="full-screen flex flex-col items-center px-5 py-10 max-w-md mx-auto">
      <div className="text-center mb-8 mt-6">
        <div className="text-6xl mb-3 animate-float">🎁</div>
        <h1 className="font-hand text-3xl font-bold text-ink leading-tight">
          갖고싶은 선물있어??
          <br />
          <span className="text-primary-dark">내가 사줄게!!</span>
        </h1>
        <p className="text-muted text-sm mt-3">
          친구에게 선물 두 개를 보내보세요 ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-bold text-ink mb-2 ml-1">
            🎀 선물 A
          </label>
          <input
            className="input-field"
            type="text"
            value={a}
            maxLength={MAX_LEN}
            onChange={(e) => setA(e.target.value)}
            placeholder={phA}
            inputMode="text"
          />
          <div className="text-right text-xs text-muted mt-1 mr-1">
            {a.length}/{MAX_LEN}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2 ml-1">
            💝 선물 B
            <span className="ml-2 font-normal text-xs text-muted">
              (이건 절대 선택할 수 없음 🙈)
            </span>
          </label>
          <input
            className="input-field"
            type="text"
            value={b}
            maxLength={MAX_LEN}
            onChange={(e) => setB(e.target.value)}
            placeholder={phB}
            inputMode="text"
          />
          <div className="text-right text-xs text-muted mt-1 mr-1">
            {b.length}/{MAX_LEN}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="btn-primary w-full text-lg disabled:opacity-40 disabled:active:scale-100 mt-2"
        >
          선물 보내기 🚀
        </button>
      </form>

      <div className="mt-10 w-full">
        <button
          type="button"
          onClick={() => setOpenHelp((v) => !v)}
          className="w-full text-sm text-muted underline-offset-2 hover:underline"
        >
          {openHelp ? "닫기" : "어떻게 작동하나요? 🤔"}
        </button>
        {openHelp && (
          <div className="card mt-4 text-sm text-ink leading-relaxed animate-pop">
            <p className="font-bold mb-2">🎀 사용법</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted">
              <li>선물 A, B 두 개를 입력하세요</li>
              <li>친구에게 링크를 공유해요</li>
              <li>친구가 선물을 고르러 옵니다</li>
              <li>...과연 친구는 어떤 선물을 고를까요? 😏</li>
            </ol>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-10 text-xs text-muted text-center">
        made with 💖 for fun
      </footer>
    </main>
  );
}
