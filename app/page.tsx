"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── types ──────────────────────────────────────────────────────────────────
interface Obstacle {
  x: number;
  w: number;
  h: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  r: number;
}

// ── constants ─────────────────────────────────────────────────────────────
const GROUND_H = 48;
const DINO_W = 28;
const DINO_H = 36;
const GRAVITY = 0.55;
const JUMP_V = -13;
const BASE_SPEED = 4.5;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    dinoY: 0,
    dinoVY: 0,
    onGround: true,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    score: 0,
    speed: BASE_SPEED,
    frameCount: 0,
    gameOver: false,
    started: false,
    legPhase: 0,
  });
  const rafRef = useRef<number>(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);

  // ── jump ────────────────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver) {
      // restart
      s.dinoY = 0;
      s.dinoVY = 0;
      s.onGround = true;
      s.obstacles = [];
      s.particles = [];
      s.score = 0;
      s.speed = BASE_SPEED;
      s.frameCount = 0;
      s.gameOver = false;
      s.started = true;
      setDead(false);
      setDisplayScore(0);
      setStarted(true);
      return;
    }
    if (!s.started) {
      s.started = true;
      setStarted(true);
    }
    if (s.onGround) {
      s.dinoVY = JUMP_V;
      s.onGround = false;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    const onTouch = () => jump();
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [jump]);

  // ── game loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const accent = "#6c63ff";
    const accentGlow = "rgba(108,99,255,0.35)";
    const textPrimary = "#e8e8f0";
    const textMuted = "#7a7a8c";
    const bgColor = "#1a1a1f";
    const canvasBg = "#1a1a1f";

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    // Small delay so layout is settled before first measure
    setTimeout(resize, 50);
    window.addEventListener("resize", resize);

    const s = stateRef.current;

    // helper: ground Y position (top of ground line)
    const groundY = () => canvas.height - GROUND_H;
    // dino foot Y
    const dinoFootY = () => groundY() - s.dinoY;
    // dino top Y
    const dinoTopY = () => dinoFootY() - DINO_H;

    const spawnObstacle = () => {
      const h = 20 + Math.random() * 26;
      s.obstacles.push({ x: canvas.width + 20, w: 14, h });
    };

    const spawnDust = (x: number, y: number, count = 5) => {
      for (let i = 0; i < count; i++) {
        s.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * 2 + 0.5),
          alpha: 0.7,
          r: Math.random() * 3 + 1,
        });
      }
    };

    const drawDino = (ctx: CanvasRenderingContext2D) => {
      const H = canvas.height;
      if (H === 0) return; // canvas not yet sized
      const fx = 80;
      const fy = dinoFootY();
      // Clamp so the dino never renders above canvas top
      const rawTy = dinoTopY();
      const headClearance = 14; // head extends 14px above body
      const ty = Math.max(headClearance + 2, rawTy);
      const cx = fx + DINO_W / 2;

      ctx.save();

      // glow
      ctx.shadowColor = accentGlow;
      ctx.shadowBlur = 16;

      // tail (draw first so body overlaps)
      ctx.beginPath();
      ctx.moveTo(fx, ty + 6);
      ctx.quadraticCurveTo(fx - 14, ty + 14, fx - 6, ty + 22);
      ctx.lineWidth = 6;
      ctx.strokeStyle = accent;
      ctx.lineCap = "round";
      ctx.stroke();

      // body
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.roundRect(fx, ty, DINO_W, DINO_H - 8, 6);
      ctx.fill();

      // head
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.roundRect(fx + 6, ty - headClearance, DINO_W - 2, 16, 5);
      ctx.fill();

      // eye
      ctx.shadowBlur = 0;
      ctx.fillStyle = canvasBg;
      ctx.beginPath();
      ctx.arc(fx + DINO_W - 4, ty - 8, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = textPrimary;
      ctx.beginPath();
      ctx.arc(fx + DINO_W - 3, ty - 8, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // legs (animated)
      const phase = s.legPhase;
      const legSwing = s.onGround ? Math.sin(phase) * 6 : 0;

      ctx.shadowColor = accentGlow;
      ctx.shadowBlur = 8;
      ctx.fillStyle = accent;
      // left leg
      ctx.beginPath();
      ctx.roundRect(fx + 4, fy - 10 + legSwing, 8, 12, 3);
      ctx.fill();
      // right leg
      ctx.beginPath();
      ctx.roundRect(fx + 14, fy - 10 - legSwing, 8, 12, 3);
      ctx.fill();

      ctx.restore();

      // ground shadow ellipse
      if (s.onGround) {
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.ellipse(cx, fy + 2, 16, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawObstacle = (ctx: CanvasRenderingContext2D, obs: Obstacle) => {
      const gy = groundY();
      ctx.save();
      ctx.shadowColor = "rgba(255,80,80,0.3)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#ff6060";
      // cactus-like: 3 pillars
      const mx = obs.x + obs.w / 2;
      ctx.fillRect(obs.x, gy - obs.h, obs.w, obs.h);
      // arms
      ctx.fillRect(mx - 10, gy - obs.h * 0.65, 6, obs.h * 0.25);
      ctx.fillRect(mx + obs.w - 2, gy - obs.h * 0.65, 6, obs.h * 0.25);
      ctx.restore();
    };

    const tick = () => {
      if (!s.started) {
        // idle — just draw static scene
        drawScene(ctx);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (s.gameOver) {
        drawScene(ctx);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      s.frameCount++;
      s.speed = BASE_SPEED + s.frameCount * 0.002;
      s.score = Math.floor(s.frameCount / 6);
      if (s.frameCount % 2 === 0 && s.onGround) s.legPhase += 0.3;

      // physics
      s.dinoVY += GRAVITY;
      s.dinoY -= s.dinoVY;
      if (s.dinoY <= 0) {
        if (s.dinoY < 0) spawnDust(80 + DINO_W / 2, groundY());
        s.dinoY = 0;
        s.dinoVY = 0;
        s.onGround = true;
      }

      // obstacles
      if (s.frameCount % Math.floor(70 - s.speed * 4) === 0) spawnObstacle();
      s.obstacles = s.obstacles.filter((o) => o.x + o.w + 20 > 0);
      for (const obs of s.obstacles) obs.x -= s.speed;

      // collision
      const dinoLeft = 80 + 4;
      const dinoRight = 80 + DINO_W - 4;
      const dinoTop = dinoTopY() + 4;
      const dinoBottom = dinoFootY();
      for (const obs of s.obstacles) {
        const gy = groundY();
        if (
          dinoRight > obs.x + 2 &&
          dinoLeft < obs.x + obs.w - 2 &&
          dinoBottom > gy - obs.h + 4 &&
          dinoTop < gy
        ) {
          s.gameOver = true;
          spawnDust(80 + DINO_W / 2, dinoFootY(), 20);
          setDead(true);
          setDisplayScore(s.score);
          break;
        }
      }

      // particles
      for (const p of s.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.alpha -= 0.025;
      }
      s.particles = s.particles.filter((p) => p.alpha > 0);

      setDisplayScore(s.score);
      drawScene(ctx);
      rafRef.current = requestAnimationFrame(tick);
    };

    const drawScene = (ctx: CanvasRenderingContext2D) => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);

      // flat bg — same as page background, no gradient
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, W, H);

      // ground line
      const gy = groundY();
      ctx.save();
      ctx.shadowColor = accentGlow;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
      ctx.restore();

      // dashed ground stripe
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 8;
      ctx.setLineDash([24, 20]);
      ctx.beginPath();
      ctx.moveTo(0, gy + 12);
      ctx.lineTo(W, gy + 12);
      ctx.stroke();
      ctx.restore();

      // obstacles
      for (const obs of s.obstacles) drawObstacle(ctx, obs);

      // dino
      drawDino(ctx);

      // particles
      for (const p of s.particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // score (top right)
      if (s.started) {
        ctx.save();
        ctx.font = `600 13px 'DM Mono', monospace`;
        ctx.fillStyle = textMuted;
        ctx.textAlign = "right";
        ctx.fillText(`${String(s.score).padStart(5, "0")}`, W - 20, 28);
        ctx.restore();
      }

      // overlay messages
      if (!s.started) {
        ctx.save();
        ctx.fillStyle = textMuted;
        ctx.font = `500 12px 'DM Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE / TAP TO START", W / 2, gy - 16);
        ctx.restore();
      }

      if (s.gameOver) {
        ctx.save();
        ctx.fillStyle = "#ff6060";
        ctx.font = `600 13px 'DM Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillText(`GAME OVER  ·  ${String(s.score).padStart(5, "0")}  ·  SPACE TO RETRY`, W / 2, gy - 16);
        ctx.restore();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "24px 20px",
        gap: "0",
        fontFamily: "var(--font-sora), sans-serif",
      }}
    >
      {/* ── top badge ── */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(108,99,255,0.08)",
          border: "1px solid rgba(108,99,255,0.22)",
          borderRadius: "100px",
          padding: "6px 16px",
          marginBottom: "32px",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#6c63ff",
            boxShadow: "0 0 8px rgba(108,99,255,0.9)",
            display: "inline-block",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--text-accent)",
            fontFamily: "var(--font-mono), monospace",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          Work in progress
        </span>
      </div>

      {/* ── heading ── */}
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.6rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 14px",
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        Still building.{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Check back soon.
        </span>
      </h1>

      <p
        style={{
          fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
          color: "var(--text-muted)",
          textAlign: "center",
          maxWidth: "440px",
          margin: "0 0 40px",
          lineHeight: 1.7,
        }}
      >
        Portfolio under construction — full-stack engineer focused on AI-powered
        products, developer tooling, and thoughtful UX.
      </p>

      {/* ── dino game canvas ── */}
      <div
        onClick={jump}
        style={{
          width: "min(640px, 100%)",
          height: "140px",
          background: "var(--bg)",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* ── score strip ── */}
      <div
        style={{
          width: "min(640px, 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "0 2px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          {started
            ? dead
              ? "⟳ space / tap to retry"
              : "↑ space / tap to jump"
            : "↑ space / tap to play"}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(108,99,255,0.6)",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          score&nbsp;·&nbsp;{String(displayScore).padStart(5, "0")}
        </span>
      </div>

      {/* ── footer ── */}
      <footer
        style={{
          marginTop: "56px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.06em",
          }}
        >
          Ashutosh Bansal · will be live soon
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "GitHub", href: "https://github.com/ashutoshbansal", external: true },
            { label: "LinkedIn", href: "https://linkedin.com/in/ashutoshbansal", external: true },
            { label: "ashutoshbansal88475@gmail.com", href: "mailto:ashutoshbansal88475@gmail.com", external: false },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontFamily: "var(--font-mono), monospace",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#6c63ff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color =
                  "var(--text-muted)")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </footer>

      {/* ── pulse animation ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </main>
  );
}
