"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeGift } from "@/lib/encode";

function GiftIntroContent() {
  const router = useRouter();
  const params = useSearchParams();
  const encoded = params.get("d") ?? "";
  const gift = decodeGift(encoded);

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

  return (
    <main className="full-screen flex flex-col items-center justify-center px-5 py-10 max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="text-8xl mb-4 animate-wiggle">🎁</div>
        <p className="font-hand text-xl text-primary-dark font-bold mb-2">두구두구두구...</p>
      </div>

      <h1 className="font-hand text-3xl font-bold text-ink leading-snug mb-3">
        친구가 너에게
        <br />
        <span className="text-primary-dark">선물을 준비했어!</span>
      </h1>
      <p className="text-muted text-base mb-10">
        둘 중 마음에 드는 걸 골라봐 ✨
      </p>

      <button
        onClick={() => router.push(`/gift/choose?d=${encoded}`)}
        className="btn-primary w-full text-lg animate-float"
      >
        선물 고르러 가기 🎀
      </button>

      <p className="text-xs text-muted mt-6">
        * 진짜 선물은 친구에게 받으세요 💌
      </p>
    </main>
  );
}

export default function GiftIntroPage() {
  return (
    <Suspense
      fallback={
        <main className="full-screen flex items-center justify-center">
          <div className="text-3xl animate-float">🎁</div>
        </main>
      }
    >
      <GiftIntroContent />
    </Suspense>
  );
}
