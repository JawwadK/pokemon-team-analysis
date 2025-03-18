// src/components/Confetti.tsx
import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const confettiPieces = useRef<any[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    "#FF5252", // Red
    "#FF4081", // Pink
    "#E040FB", // Purple
    "#7C4DFF", // Deep Purple
    "#536DFE", // Indigo
    "#448AFF", // Blue
    "#40C4FF", // Light Blue
    "#18FFFF", // Cyan
    "#64FFDA", // Teal
    "#69F0AE", // Green
    "#B2FF59", // Light Green
    "#EEFF41", // Lime
    "#FFFF00", // Yellow
    "#FFD740", // Amber
    "#FFAB40", // Orange
    "#FF6E40", // Deep Orange
  ];

  const createConfettiPiece = (canvas: HTMLCanvasElement) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      color,
      dimensions: {
        x: Math.random() * 10 + 5,
        y: Math.random() * 10 + 5,
      },
      position: {
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
      },
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 5 + 3,
      },
      rotation: Math.random() * 2 * Math.PI,
      rotationSpeed: Math.random() * 0.2 - 0.1,
      wave: {
        amplitude: Math.random() * 5 + 2,
        frequency: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2,
      },
    };
  };

  const startAnimation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create initial confetti pieces
    confettiPieces.current = Array(150)
      .fill(null)
      .map(() => createConfettiPiece(canvas));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.current.forEach((piece, i) => {
        // Apply wave motion
        const waveX =
          Math.sin(
            piece.position.y * piece.wave.frequency + piece.wave.offset
          ) * piece.wave.amplitude;

        // Update position
        piece.position.x += piece.velocity.x + waveX;
        piece.position.y += piece.velocity.y;

        // Update rotation
        piece.rotation += piece.rotationSpeed;

        // Draw confetti
        ctx.save();
        ctx.translate(piece.position.x, piece.position.y);
        ctx.rotate(piece.rotation);

        ctx.fillStyle = piece.color;
        ctx.fillRect(
          -piece.dimensions.x / 2,
          -piece.dimensions.y / 2,
          piece.dimensions.x,
          piece.dimensions.y
        );

        ctx.restore();

        // Reset if it goes off-screen
        if (piece.position.y > canvas.height) {
          confettiPieces.current[i] = createConfettiPiece(canvas);
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Stop after duration
    if (duration > 0) {
      timeoutId.current = setTimeout(() => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, duration);
    }
  };

  const stopAnimation = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0
      );
    }
  };

  useEffect(() => {
    if (active) {
      startAnimation();
    } else {
      stopAnimation();
    }

    // Cleanup on unmount
    return () => {
      stopAnimation();
    };
  }, [active]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

export default Confetti;
