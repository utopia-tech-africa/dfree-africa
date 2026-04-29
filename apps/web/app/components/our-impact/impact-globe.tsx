"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { IMPACT_PINS } from "@/lib/impact-routes";
import { cn } from "@/lib/utils";

export function ImpactGlobe({ className }: { className?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = new maplibregl.Map({
      container,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [0, 12],
      zoom: 2.45,
      pitch: 0,
      bearing: 0,
      minZoom: 2.45,
      maxZoom: 2.45,
      attributionControl: false,
      dragPan: true,
      dragRotate: true,
      touchZoomRotate: true,
      scrollZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      renderWorldCopies: false,
    });

    mapRef.current = map;

    const applyGlobeProjection = () => {
      // MapLibre supports globe projection; some TS versions don't type it in MapOptions.
      if ("setProjection" in map) {
        (
          map as unknown as { setProjection: (spec: { type: "globe" }) => void }
        ).setProjection({
          type: "globe",
        });
      }
    };

    const hideLabelLayers = () => {
      const style = map.getStyle();
      if (!style?.layers) return;
      style.layers.forEach((layer) => {
        const isTextLayer =
          layer.type === "symbol" &&
          Boolean(
            (layer.layout as { "text-field"?: unknown } | undefined)?.[
              "text-field"
            ],
          );
        if (isTextLayer) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      });
    };

    map.on("load", () => {
      applyGlobeProjection();
      hideLabelLayers();
      map.resize();
      // Keep touch interaction enabled on mobile.
      map.touchZoomRotate.enable();

      IMPACT_PINS.forEach((pin) => {
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.setAttribute("aria-label", `Go to ${pin.label}`);
        markerElement.className =
          "h-5 w-5 rounded-full border-2 border-white bg-primary-500 shadow-[0_0_0_4px_rgba(77,103,49,0.25)] cursor-pointer";
        markerElement.title = `${pin.label} - Click to explore`;
        markerElement.addEventListener("click", () => router.push(pin.route));

        new maplibregl.Marker({
          element: markerElement,
          anchor: "center",
        })
          .setLngLat([pin.lng, pin.lat])
          .addTo(map);
      });
    });
    // Re-apply projection when style updates to avoid fallback to flat mercator.
    const handleStyleData = () => {
      applyGlobeProjection();
      hideLabelLayers();
    };
    map.on("styledata", handleStyleData);

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      map.off("styledata", handleStyleData);
      map.remove();
      mapRef.current = null;
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full max-w-[343px] overflow-hidden rounded-full bg-white md:max-w-[420px] lg:max-w-[520px]",
        className,
      )}
    />
  );
}
