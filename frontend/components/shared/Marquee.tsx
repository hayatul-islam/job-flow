"use client";
import { useEffect, useRef } from "react";
type Props = {
  data: any[];
};

const Marquee = ({ data }: Props) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    const speed = 0.7;

    const tick = () => {
      const halfW = el.scrollWidth / 2;
      posRef.current -= speed;
      if (Math.abs(posRef.current) >= halfW) posRef.current = 0;
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={`${
        data.length > 0 ? "block" : "hidden"
      } relative overflow-hidden bg-white py-3`}
    >
      <div
        ref={tickerRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...data, ...data, ...data].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-xs font-medium text-black/70"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
