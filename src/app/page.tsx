"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeGift } from "@/lib/encode";
import { logGift, Relation } from "@/lib/supabase";

const MAX_LEN = 20;
const PLACEHOLDERS_A = ["스타벅스 아메리카노", "마라탕", "편의점 1만원권"];
const PLACEHOLDERS_B = ["에르메스 가방", "아이폰 16 Pro", "샤넬 향수"];
const RELATIONS: { value: Relation; label: string; emoji: string }[] = [
  { value: "가족", label: "가족", emoji: "👨‍👩‍👧" },
  { value: "연인", label: "연인", emoji: "💑" },
  { value: "친구", label: "친구", emoji: "🧑‍🤝‍🧑" },
  { value: "직장동료", label: "직장동료", emoji: "💼" },
  { value: "기타", label: "기타", emoji: "✨" },
];

export default function HomePage() {
  const router = useRouter();
  const [relation, setRelation] = useState<Relation | null>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [openHelp, setOpenHelp] = useState(false);

  const isValid = !!relation && a.trim().length > 0 && b.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !relation) return;
    const giftA = a.trim();
    const giftB = b.trim();
    void logGift({ relation, giftA, giftB });
    const encoded = encodeGift({ a: giftA, b: giftB });
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

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div>
          <label className="block text-sm font-bold text-ink mb-2 ml-1">
            🎯 선물을 누구한테 줄건가요?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {RELATIONS.map((r) => {
              const selected = relation === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRelation(r.value)}
                  className={`rounded-2xl py-3 px-2 border-2 transition-all text-sm font-bold active:scale-95 ${
                    selected
                      ? "bg-primary text-white border-primary shadow-soft"
                      : "bg-white text-ink border-primary/30"
                  }`}
                >
                  <div className="text-xl mb-0.5">{r.emoji}</div>
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

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
              <li>선물 받을 사람 관계를 골라요</li>
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
