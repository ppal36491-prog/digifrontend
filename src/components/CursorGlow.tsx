import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] hidden md:block transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: hidden ? 0 : 1,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.22 265 / 0.18), transparent 60%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
