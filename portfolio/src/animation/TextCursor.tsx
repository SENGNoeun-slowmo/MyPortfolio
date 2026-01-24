// src/components/CursorTrail.tsx

"use client";

import { useEffect, useState, useRef, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiCplusplus,
//   SiCsharp,
  SiC,
  SiHtml5,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiPython,
//   SiJava,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiGo,
  SiRust,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiLaravel,
} from "react-icons/si";

interface TrailItem {
  id: string;
  x: number;
  y: number;
  angle: number;
  icon: JSX.Element;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastSpawn = useRef<number>(0);

  // All programming language icons with their official colors
  const languageIcons: JSX.Element[] = [
    <SiCplusplus className="text-blue-600" title="C++" />,
    <SiC className="text-blue-500" title="C" />,
    // <SiCsharp className="text-purple-600" title="C#" />,
    <SiHtml5 className="text-orange-600" title="HTML" />,
    <SiPhp className="text-indigo-600" title="PHP" />,
    <SiJavascript className="text-yellow-500" title="JavaScript" />,
    <SiTypescript className="text-blue-600" title="TypeScript" />,
    <SiPython className="text-yellow-400" title="Python" />,
    // <SiJava className="text-red-600" title="Java" />,
    <SiReact className="text-cyan-400" title="React" />,
    <SiNodedotjs className="text-green-600" title="Node.js" />,
    <SiNextdotjs className="text-black" title="Next.js" />,
    <SiGo className="text-cyan-500" title="Go" />,
    <SiRust className="text-orange-600" title="Rust" />,
    <SiTailwindcss className="text-teal-500" title="Tailwind CSS" />,
    <SiMysql className="text-blue-600" title="MySQL" />,
    <SiGit className="text-red-600" title="Git" />,
    <SiLaravel className="text-red-500" title="Laravel" />,
  ];

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const currentTime = Date.now();
      const dx = clientX - lastPosition.current.x;
      const dy = clientY - lastPosition.current.y;
      const distance = Math.hypot(dx, dy);

      // Spawn new icon every ~30-35 pixels of movement
      if (distance >= 32 && currentTime - lastSpawn.current > 50) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const newItem: TrailItem = {
          id: crypto.randomUUID(),
          x: clientX,
          y: clientY,
          angle,
          icon: languageIcons[Math.floor(Math.random() * languageIcons.length)],
        };

        setTrail((prev) => [...prev, newItem].slice(-22)); // max 22 icons on screen

        lastSpawn.current = currentTime;

        // Auto-remove after 3 seconds
        setTimeout(() => {
          setTrail((prev) => prev.filter((item) => item.id !== newItem.id));
        }, 3000);
      }

      lastPosition.current = { x: clientX, y: clientY };
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, rotate: item.angle }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.15, 0.7],
              x: item.x,
              y: item.y,
              rotate: item.angle,
              translateX: [0, Math.random() * 30 - 15],
              translateY: [0, Math.random() * 40 - 20],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ fontSize: "38px", left: 0, top: 0 }}
          >
            {item.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}