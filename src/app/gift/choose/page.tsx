"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeGift } from "@/lib/encode";
import RunawayCard from "@/components/RunawayCard";

function ChooseContent() {
  const router = useRouter();
  const params = useSearchParams();
  const encoded = params.get("d") ?? "";
  const gift = decodeGift(encoded);
  const [attempts, setAttempts] = useState(0);

  if (!gift) {
    return (
      <main className="full-screen flex flex-col items-center justify-center px-5">
        <div className="text-5xl mb-4">😢</div>
        <p className="text-ink mb-6">선물 링크가 깨진 것 같아요</p>
        <button onClick={() => router.push("/")} className="btn-primary">
          내가 선물 보내볼래!
        </button>
      </main>
    );
  }

  const pickA = () => {
    router.push(`/congrats?d=${encoded}&t=${attempts}`);
  };

  return (
    <main className="full-screen flex flex-col items-center px-5 py-8 max-w-md mx-auto overflow-hidden">
      <div className="text-center mb-6 mt-2">
        <h1 className="font-hand text-2xl font-bold text-ink mb-1">
          어떤 선물 받을래?
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          type="button"
          onClick={pickA}
          className="bg-white rounded-chunky shadow-soft border-2 border-primary/40 p-4 text-center w-full aspect-square flex flex-col items-center justify-center active:scale-95 hover:border-primary transition-all hover:animate-wiggle"
        >
          <div className="text-5xl mb-1">🎀</div>
          <p className="text-xs text-muted">A</p>
          <p className="font-bold text-ink text-sm mt-1 break-words px-1">{gift.a}</p>
        </button>

        <RunawayCard label={gift.b} onAttempt={() => setAttempts((n) => n + 1)} />
      </div>

      {attempts >= 5 && (
        <div className="mt-8 text-center text-sm text-muted animate-pop">
          🤣 B를 <span className="font-bold text-primary-dark">{attempts}번</span>이나 시도했어요!
        </div>
      )}
    </main>
  );
}

export default function ChoosePage() {
  return (
    <Suspense
      fallback={
        <main className="full-screen flex items-center justify-center">
          <div className="text-3xl animate-float">🎁</div>
        </main>
      }
    >
      <ChooseContent />
    </Suspense>
  );
}
