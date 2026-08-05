"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

interface VideoBackgroundProps {
  src: string;
  /** Swapped in automatically if `src` fails to load or play (e.g. an
   * unsupported format in the visitor's browser). */
  fallbackSrc?: string;
  poster?: string;
  overlay?: "light" | "medium" | "dark";
  className?: string;
  children?: React.ReactNode;
}

const overlayClasses = {
  light: "bg-cream/60",
  medium: "bg-forest/40",
  dark: "bg-forest/65",
};

const videoMimeTypes: Record<string, string> = {
  mp4: "video/mp4",
  mov: "video/quicktime",
  webm: "video/webm",
};

function mimeTypeForSrc(src: string): string {
  const extension = src.split(".").pop()?.toLowerCase() ?? "";
  return videoMimeTypes[extension] ?? "video/mp4";
}

export default function VideoBackground({
  src,
  fallbackSrc,
  poster,
  overlay = "medium",
  className,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setTriedFallback(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay may be blocked; poster still shows
    });
  }, [activeSrc]);

  function handleError() {
    // The browser couldn't load/decode `activeSrc` (e.g. .mov isn't
    // supported outside Safari) -- fall back to a known-good source.
    if (!triedFallback && fallbackSrc && activeSrc !== fallbackSrc) {
      setTriedFallback(true);
      setActiveSrc(fallbackSrc);
    }
  }

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        key={activeSrc}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src={activeSrc} type={mimeTypeForSrc(activeSrc)} />
      </video>
      <div className={clsx("absolute inset-0", overlayClasses[overlay])} />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
