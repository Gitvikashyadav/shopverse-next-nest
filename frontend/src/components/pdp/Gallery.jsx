"use client";
import { useRef, useState } from "react";

export default function Gallery({ images = [], name = "" }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });   // % position of cursor
  const frameRef = useRef(null);

  const ZOOM = 2.5;             // magnification factor
  const LENS = 160;             // lens size in px

  const handleMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const src = images[active];

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden sm:flex w-16 shrink-0 flex-col gap-3">
        {images.map((img, i) => (
          <button key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden rounded-md border transition
              ${i === active ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-400"}`}>
            <img src={img} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image + zoom */}
      <div className="relative flex-1">
        <div
          ref={frameRef}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMove}
          className="relative aspect-[4/5] w-full cursor-crosshair overflow-hidden rounded-lg bg-neutral-100"
        >
          <img src={src} alt={name} className="h-full w-full object-cover" draggable={false} />

          {/* Lens — shows exactly which part is magnified */}
          {zoom && (
            <span
              className="pointer-events-none absolute rounded-sm border-2 border-white/90 bg-white/20 shadow-[0_0_0_9999px_rgba(0,0,0,0.12)]"
              style={{
                width: LENS, height: LENS,
                left: `calc(${pos.x}% - ${LENS / 2}px)`,
                top: `calc(${pos.y}% - ${LENS / 2}px)`,
              }}
            />
          )}

          {!zoom && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white">
              Hover to zoom
            </span>
          )}
        </div>

        {/* Zoom panel — desktop only, sits to the right of the image */}
        {zoom && (
          <div
            className="pointer-events-none absolute left-full top-0 z-30 ml-4 hidden aspect-[4/5] w-[420px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl lg:block"
            style={{
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${ZOOM * 100}% ${ZOOM * 100}%`,
              backgroundPosition: `${pos.x}% ${pos.y}%`,
            }}
          />
        )}

        {/* Mobile: thumbnails as a row */}
        <div className="mt-3 flex gap-2 sm:hidden">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-14 w-14 overflow-hidden rounded border ${i === active ? "border-neutral-900" : "border-neutral-200"}`}>
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
// Where to change: ZOOM (magnification) and LENS (lens box size) at the top. Parent of the gallery must not have overflow-hidden, or the zoom panel gets clipped.