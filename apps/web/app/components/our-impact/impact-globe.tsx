"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { IMPACT_PINS } from "@/lib/impact-routes";
import { cn } from "@/lib/utils";

export function ImpactGlobe({ className }: { className?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // All mutable state lives in refs so we never trigger re-renders during animation / drag.
  const rotationRef = useRef<[number, number, number]>([0, -15, 0]);
  const isInteractingRef = useRef(false);
  const worldRef = useRef<any>(null);
  const frameIdRef = useRef<number>(0);

  const sensitivity = 75;

  // One-time setup: fetch data, create projection, bindlisteners, start animation.
  const draw = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    if (!svg.node() || !container) return;

    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height) || rect.width || 520;

    const projection = d3
      .geoOrthographic()
      .scale(size / 2 - 5)
      .center([0, 0])
      .rotate(rotationRef.current)
      .translate([size / 2, size / 2]);

    const pathGen = d3.geoPath().projection(projection);
    const graticule = d3.geoGraticule()();

    // Update the viewBox to match the container
    svg.attr("viewBox", `0 0 ${size} ${size}`);

    // --- Sphere ---
    svg
      .select<SVGCircleElement>(".globe-sphere")
      .attr("cx", size / 2)
      .attr("cy", size / 2)
      .attr("r", projection.scale())
      .attr("fill", "#e8e8e8");

    // --- Graticule ---
    svg
      .select<SVGPathElement>(".globe-graticule")
      .attr("d", pathGen(graticule) || "")
      .attr("fill", "none")
      .attr("stroke", "#c0c0c0")
      .attr("stroke-width", "0.5");

    // --- Land ---
    if (worldRef.current) {
      svg
        .select<SVGPathElement>(".globe-land")
        .attr("d", pathGen(worldRef.current) || "")
        .attr("fill", "#d4d4d4")
        .attr("stroke", "#aaaaaa")
        .attr("stroke-width", "0.8");
    }

    // --- Pins ---
    const pinsGroup = svg.select<SVGGElement>(".globe-pins");
    const pinSelection = pinsGroup
      .selectAll<SVGGElement, (typeof IMPACT_PINS)[number]>(".pin")
      .data(IMPACT_PINS, (d) => d.label);

    // Enter
    const pinEnter = pinSelection
      .enter()
      .append("g")
      .attr("class", "pin")
      .style("cursor", "pointer");
    pinEnter.append("title");
    pinEnter
      .append("circle")
      .attr("class", "pin-shadow")
      .attr("r", 4)
      .attr("fill", "rgba(77,103,49,0.1)")
      .attr("transform", "scale(1,0.5)");
    const pinIcon = pinEnter
      .append("g")
      .attr("transform", "translate(-12,-34)");
    pinIcon
      .append("path")
      .attr(
        "d",
        "M12 0C5.37 0 0 5.37 0 12C0 21 12 34 12 34C12 34 24 21 24 12C24 5.37 18.63 0 12 0Z",
      )
      .attr("fill", "#4d6731");
    pinIcon
      .append("circle")
      .attr("cx", 12)
      .attr("cy", 12)
      .attr("r", 4.5)
      .attr("fill", "white");

    // Update (enter + existing)
    const pinMerge = pinEnter.merge(pinSelection);
    pinMerge.each(function (pin) {
      const g = d3.select(this);
      const coords = projection([pin.lng, pin.lat]);
      const rot = projection.rotate();
      const dist = d3.geoDistance([-rot[0], -rot[1]], [pin.lng, pin.lat]);
      const visible = dist < Math.PI / 2;

      g.attr("display", visible && coords ? "inline" : "none");
      if (visible && coords) {
        g.attr("transform", `translate(${coords[0]},${coords[1]})`);
      }
      g.select("title").text(pin.label);
    });

    // Click handler (only needs to be set once, but setting via D3 is idempotent)
    pinMerge.on("click", function (_event, pin) {
      router.push(pin.route);
    });
  }, [router]);

  useEffect(() => {
    // Fetch world data
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        worldRef.current = topojson.feature(data, data.objects.countries);
        draw();
      });

    // --- Drag ---
    const svg = d3.select(svgRef.current);
    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .on("start", () => {
        isInteractingRef.current = true;
      })
      .on("drag", (event) => {
        const scale =
          (containerRef.current?.getBoundingClientRect().width ?? 520) / 2 - 5;
        const k = sensitivity / scale;
        const r = rotationRef.current;
        rotationRef.current = [r[0] + event.dx * k, r[1] - event.dy * k, r[2]];
        draw();
      })
      .on("end", () => {
        isInteractingRef.current = false;
      });

    svg.call(drag as any);

    // --- Hover pause ---
    const container = containerRef.current;
    const enterHandler = () => {
      isInteractingRef.current = true;
    };
    const leaveHandler = () => {
      isInteractingRef.current = false;
    };
    container?.addEventListener("mouseenter", enterHandler);
    container?.addEventListener("mouseleave", leaveHandler);
    container?.addEventListener("touchstart", enterHandler, { passive: true });
    container?.addEventListener("touchend", leaveHandler);

    // --- Animation loop ---
    const animate = () => {
      if (!isInteractingRef.current) {
        const r = rotationRef.current;
        rotationRef.current = [r[0] + 0.15, r[1], r[2]];
        draw();
      }
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);

    // --- Resize ---
    const resizeObs = new ResizeObserver(() => draw());
    if (container) resizeObs.observe(container);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      svg.on(".drag", null);
      container?.removeEventListener("mouseenter", enterHandler);
      container?.removeEventListener("mouseleave", leaveHandler);
      container?.removeEventListener("touchstart", enterHandler);
      container?.removeEventListener("touchend", leaveHandler);
      resizeObs.disconnect();
    };
  }, [draw, sensitivity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center w-full h-full min-h-[300px]",
        className,
      )}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 520 520"
        className="w-full h-full cursor-move overflow-visible"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <circle className="globe-sphere" />
        <path className="globe-graticule" />
        <path className="globe-land" />
        <g className="globe-pins" />
      </svg>
    </div>
  );
}
