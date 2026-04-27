"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type Props = {
  label: string;
  onAttempt: () => void;
};

const ESCAPE_RADIUS = 140;
const MIN_JUMP = 160;
const MAX_JUMP = 280;
const ROTATIONS = [-12, -8, -4, 0, 4, 8, 12];
const PAD = 12;

function pickRotation() {
  return ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
}

export default function RunawayCard({ label, onAttempt }: Props) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [rotate, setRotate] = useState(0);
  const [origin, setOrigin] = useState<{ left: number; top: number; size: number } | null>(null);
  const lastEscapeAt = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (!placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      setOrigin({ left: rect.left, top: rect.top, size: rect.width });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const moveTo = (targetX: number, targetY: number, springy = true) => {
    if (!origin) return;
    const size = origin.size;
    const maxX = window.innerWidth - size - PAD;
    const maxY = window.innerHeight - size - PAD;
    const clampedX = Math.max(PAD, Math.min(maxX, targetX));
    const clampedY = Math.max(PAD, Math.min(maxY, targetY));
    setRotate(pickRotation());
    const opts = springy
      ? { type: "spring" as const, stiffness: 340, damping: 22 }
      : { duration: 0.25 };
    animate(x, clampedX - origin.left, opts);
    animate(y, clampedY - origin.top, opts);
  };

  const escapeAway = (cursorX: number, cursorY: number) => {
    if (!cardRef.current || !origin) return;
    const now = Date.now();
    if (now - lastEscapeAt.current < 100) return;
    lastEscapeAt.current = now;

    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - cursorX;
    const dy = cy - cursorY;
    const dist = Math.hypot(dx, dy) || 1;
    const jump = MIN_JUMP + Math.random() * (MAX_JUMP - MIN_JUMP);
    const nextLeft = cx + (dx / dist) * jump - rect.width / 2;
    const nextTop = cy + (dy / dist) * jump - rect.height / 2;
    moveTo(nextLeft, nextTop);
    onAttempt();
  };

  const jumpRandom = () => {
    if (!cardRef.current || !origin) return;
    const now = Date.now();
    if (now - lastEscapeAt.current < 100) return;
    lastEscapeAt.current = now;

    const rect = cardRef.current.getBoundingClientRect();
    const angle = Math.random() * Math.PI * 2;
    const jump = MIN_JUMP + Math.random() * (MAX_JUMP - MIN_JUMP);
    const nextLeft = rect.left + Math.cos(angle) * jump;
    const nextTop = rect.top + Math.sin(angle) * jump;
    moveTo(nextLeft, nextTop);
    onAttempt();
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < ESCAPE_RADIUS) escapeAway(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    jumpRandom();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    jumpRandom();
  };

  return (
    <>
      <div
        ref={placeholderRef}
        className="w-full aspect-square rounded-chunky border-2 border-dashed border-secondary/30"
        aria-hidden="true"
      />
      {origin && (
        <motion.div
          ref={cardRef}
          style={{
            x,
            y,
            rotate,
            position: "fixed",
            top: origin.top,
            left: origin.left,
            width: origin.size,
            height: origin.size,
            zIndex: 50,
          }}
          className="bg-white rounded-chunky shadow-soft border-2 border-secondary/60 p-4 text-center flex flex-col items-center justify-center select-none cursor-pointer touch-none"
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          tabIndex={-1}
        >
          <div className="text-5xl mb-1">💝</div>
          <p className="text-xs text-muted">B</p>
          <p className="font-bold text-ink text-sm mt-1 break-words px-1">{label}</p>
        </motion.div>
      )}
    </>
  );
}
