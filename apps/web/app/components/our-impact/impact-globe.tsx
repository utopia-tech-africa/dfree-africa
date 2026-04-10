"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import createGlobe from "cobe";
import { useRouter } from "next/navigation";
import { IMPACT_PINS } from "@/lib/impact-routes";
import { cn } from "@/lib/utils";

export function ImpactGlobe({ className }: { className?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let phi = 0;
    let theta = 0.22;
    let isPaused = false;
    let isDragging = false;
    let clickMoved = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragStartPhi = phi;
    let dragStartTheta = theta;
    let width = Math.floor(container.clientWidth);
    let height = Math.floor(container.clientHeight);
    if (!width || !height) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      scale: 1.32,
      markerColor: [0.302, 0.404, 0.192], // primary-500
      glowColor: [1, 1, 1],
      markerElevation: 0.01,
      markers: IMPACT_PINS.flatMap((pin) => [
        {
          // Outer static halo
          location: [pin.lat, pin.lng] as [number, number],
          size: 0.068,
          color: [0.64, 0.78, 0.56] as [number, number, number],
        },
        {
          // Core marker
          location: [pin.lat, pin.lng] as [number, number],
          size: 0.038,
          color: [0.302, 0.404, 0.192] as [number, number, number],
          id: pin.label.toLowerCase().replace(/\s+/g, "-"),
        },
      ]),
    });

    let raf = 0;
    let pulseTime = 0;
    const animate = () => {
      if (!isPaused && !isDragging) {
        phi += 0.0035;
      }
      pulseTime += 0.03;
      globe.update({
        phi,
        theta,
        markers: IMPACT_PINS.flatMap((pin, index) => {
          const phase = pulseTime + index * 0.85;
          const pulse = (Math.sin(phase) + 1) / 2; // 0..1
          return [
            {
              location: [pin.lat, pin.lng] as [number, number],
              size: 0.038, // static core
              color: [0.302, 0.404, 0.192] as [number, number, number],
              id: pin.label.toLowerCase().replace(/\s+/g, "-"),
            },
            {
              location: [pin.lat, pin.lng] as [number, number],
              size: 0.065 + pulse * 0.05, // animated outer pulse ring
              color:
                pulse > 0.5
                  ? ([0.75, 0.86, 0.69] as [number, number, number])
                  : ([0.64, 0.78, 0.56] as [number, number, number]),
            },
          ];
        }),
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const clampTheta = (value: number) =>
      Math.max(-Math.PI / 2, Math.min(Math.PI / 2, value));

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      clickMoved = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      dragStartPhi = phi;
      dragStartTheta = theta;
      canvas.style.cursor = "grabbing";
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // ignore - some devices/browsers may not support capture reliably
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const dx = event.clientX - pointerStartX;
      const dy = event.clientY - pointerStartY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) clickMoved = true;

      // Drag horizontally => rotate around vertical axis (phi)
      phi = dragStartPhi + dx * 0.01;
      // Drag vertically => tilt (theta)
      theta = clampTheta(dragStartTheta + dy * 0.005);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.style.cursor = "grab";
      if (!clickMoved) {
        // Click toggles auto-rotation pause/play.
        isPaused = !isPaused;
      }
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("pointerup", handlePointerUp);

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.floor(container.clientWidth);
      const nextHeight = Math.floor(container.clientHeight);
      if (!nextWidth || !nextHeight) return;
      width = nextWidth;
      height = nextHeight;
      globe.update({
        width: width * 2,
        height: height * 2,
        scale: 1.32,
      });
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("pointerup", handlePointerUp);
      globe.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-full bg-white",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none select-none"
        aria-label="Impact globe"
      />
      {IMPACT_PINS.map((pin) => {
        const markerId = pin.label.toLowerCase().replace(/\s+/g, "-");
        return (
          <button
            key={pin.label}
            type="button"
            aria-label={`Go to ${pin.label}`}
            title={pin.label}
            onClick={() => router.push(pin.route)}
            className="group absolute z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            style={
              {
                // COBE provides CSS anchors and visibility vars for markers with IDs.
                positionAnchor: `--cobe-${markerId}`,
                left: "anchor(center)",
                top: "anchor(center)",
                opacity: `var(--cobe-visible-${markerId}, 0)`,
                pointerEvents: "auto",
              } as CSSProperties
            }
          >
            <span className="sr-only">{pin.label}</span>
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full ring-0 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary-500/60 group-focus-visible:ring-2 group-focus-visible:ring-primary-500/80"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[115%] whitespace-nowrap rounded-md bg-neutral-1000/90 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden
            >
              {pin.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
