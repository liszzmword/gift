"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { decodeGift } from "@/lib/encode";

function CongratsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const encoded = params.get("d") ?? "";
  const tries = Number(params.get("t") ?? "0");
  const gift = decodeGift(encoded);

  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#FFB6C1", "#B5EAD7", "#FFDAC1", "#FF8FA3", "#FFFFFF"],
      });
    };
    fire();
    const t1 = setTimeout(fire, 400);
    const t2 = setTimeout(fire, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!gift) {
    return (
      <main className="full-screen flex flex-col items-center justify-center px-5">
        <button onClick={() => router.push("/")} className="btn-primary">
          처음으로
        </button>
      </main>
    );
  }

  return (
    <main className="full-screen flex flex-col items-center px-5 py-10 max-w-md mx-auto text-center">
      <div className="mt-8 mb-2 text-7xl animate-float">🎉</div>
      <h1 className="font-hand text-4xl font-bold text-primary-dark mb-3">
        축하합니다!!
      </h1>
      <p className="text-ink text-base mb-1">당신은</p>
      <div className="card w-full my-3 animate-pop">
        <div className="text-5xl mb-2">🎀</div>
        <p className="font-hand text-2xl font-bold text-ink break-words">
          {gift.a}
        </p>
        <p className="text-sm text-muted mt-2">에 당첨되셨습니다!</p>
      </div>

      {tries >= 3 && (
        <p className="text-xs text-muted mt-2">
          B를 <span className="font-bold text-primary-dark">{tries}번</span>이나 시도했지만 잡지 못했네요 🙈
        </p>
      )}

      <div className="w-full mt-8 space-y-3">
        <button
          onClick={() => router.push("/")}
          className="btn-primary w-full text-lg animate-wiggle"
        >
          나도 친구에게 선물하기 🎁
        </button>
        <button
          onClick={() => router.push(`/gift/choose?d=${encoded}`)}
          className="text-sm text-muted underline-offset-2 hover:underline"
        >
          다시 선택해보기
        </button>
      </div>

      <footer className="mt-auto pt-10 text-xs text-muted">
        made with 💖 for fun
      </footer>
    </main>
  );
}

export default function CongratsPage() {
  return (
    <Suspense
      fallback={
        <main className="full-screen flex items-center justify-center">
          <div className="text-3xl animate-float">🎉</div>
        </main>
      }
    >
      <CongratsContent />
    </Suspense>
  );
}
