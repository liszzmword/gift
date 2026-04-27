"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeGift } from "@/lib/encode";

function ShareContent() {
  const router = useRouter();
  const params = useSearchParams();
  const encoded = params.get("d") ?? "";
  const gift = decodeGift(encoded);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && encoded) {
      setShareUrl(`${window.location.origin}/gift?d=${encoded}`);
    }
  }, [encoded]);

  if (!gift) {
    return (
      <main className="full-screen flex flex-col items-center justify-center px-5">
        <p className="text-ink mb-6">선물을 다시 만들어주세요 🥲</p>
        <button onClick={() => router.push("/")} className="btn-primary">
          처음으로
        </button>
      </main>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("링크를 복사하세요:", shareUrl);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "🎁 선물 골라줘!",
          text: "친구가 너에게 선물을 준비했어! 둘 중 하나 골라봐 ✨",
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <main className="full-screen flex flex-col items-center px-5 py-10 max-w-md mx-auto">
      <div className="text-center mb-6 mt-4">
        <div className="text-5xl mb-2 animate-wiggle">📮</div>
        <h1 className="font-hand text-2xl font-bold text-ink">
          선물이 준비됐어요!
        </h1>
        <p className="text-muted text-sm mt-2">
          친구에게 링크를 보내주세요 💌
        </p>
      </div>

      <div className="card w-full mb-6">
        <p className="text-xs text-muted mb-3 font-bold">미리보기</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-cream rounded-2xl p-4 text-center border-2 border-primary/20">
            <div className="text-2xl mb-1">🎀</div>
            <p className="text-xs text-muted">A</p>
            <p className="font-bold text-ink text-sm mt-1 break-words">{gift.a}</p>
          </div>
          <div className="flex-1 bg-cream rounded-2xl p-4 text-center border-2 border-secondary/40">
            <div className="text-2xl mb-1">💝</div>
            <p className="text-xs text-muted">B</p>
            <p className="font-bold text-ink text-sm mt-1 break-words">{gift.b}</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button onClick={handleNativeShare} className="btn-primary w-full text-base">
          🔗 친구에게 공유하기
        </button>
        <button onClick={handleCopy} className="btn-secondary w-full text-base">
          {copied ? "✅ 복사 완료!" : "📋 링크 복사하기"}
        </button>
        <div className="bg-white border-2 border-dashed border-primary/30 rounded-2xl p-3 text-xs text-muted break-all">
          {shareUrl || "링크 생성 중..."}
        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-8 text-sm text-muted underline-offset-2 hover:underline"
      >
        ← 다시 만들기
      </button>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <main className="full-screen flex items-center justify-center">
          <div className="text-2xl animate-float">🎁</div>
        </main>
      }
    >
      <ShareContent />
    </Suspense>
  );
}
