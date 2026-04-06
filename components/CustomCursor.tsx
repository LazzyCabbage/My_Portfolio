"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3.5 h-3.5 border-2 rounded-full pointer-events-none z-50 transition-colors duration-200"
      style={{
        borderColor: "var(--accent)",
        backgroundColor: isHovering ? "var(--accent-glow)" : "transparent",
        boxShadow: isHovering ? "0 0 10px var(--accent)" : "none",
        mixBlendMode: "Screen" as any,
      }}
      animate={{
        x: mousePosition.x - 7,
        y: mousePosition.y - 7,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        stiffness: 400,
        damping: 30, // approximately 80ms lag calculation
      }}
    />
  );
}
