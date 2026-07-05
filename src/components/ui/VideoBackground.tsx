"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";

interface VideoBackgroundProps {
  src: string;
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

export default function VideoBackground({
  src,
  poster,
  overlay = "medium",
  className,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay may be blocked; poster still shows
    });
  }, []);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={clsx("absolute inset-0", overlayClasses[overlay])} />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
