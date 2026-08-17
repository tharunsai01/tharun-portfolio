"use client";

import React, { useEffect, useRef } from "react";

interface TextPressureProps {
  text: string;
  fontFamily?: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
}

export default function TextPressure({
  text,
  fontFamily,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor,
  strokeColor,
  minFontSize = 24,
  className = "",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dist = Math.sqrt(
            Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
          );

          // Max distance to affect
          const maxDist = 250;

          // Intensity 1 when distance is 0, 0 when distance is >= maxDist
          const intensity = Math.max(0, 1 - dist / maxDist);

          // Easing function for smoother pressure curve
          const easeOutQuint = 1 - Math.pow(1 - intensity, 5);
          const easedIntensity = easeOutQuint;

          // Variable font axes mapping
          const wght = weight ? 300 + easedIntensity * 600 : 400; // 300 to 900
          const wdth = width ? 75 + easedIntensity * 50 : 100; // 75 to 125
          const ital = italic ? easedIntensity * 1 : 0; // 0 to 1

          let styleStr = `"wght" ${wght}`;
          if (width) styleStr += `, "wdth" ${wdth}`;
          if (italic) styleStr += `, "ital" ${ital}`;

          span.style.fontVariationSettings = styleStr;

          if (alpha) {
            span.style.opacity = `${0.3 + easedIntensity * 0.7}`;
          }
        });
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Reset back to normal with an animation frame
      animationFrameId = requestAnimationFrame(() => {
        spansRef.current.forEach((span) => {
          if (!span) return;
          const wght = weight ? 300 : 400;
          const wdth = width ? 75 : 100;
          const ital = 0;
          
          let styleStr = `"wght" ${wght}`;
          if (width) styleStr += `, "wdth" ${wdth}`;
          if (italic) styleStr += `, "ital" ${ital}`;

          span.style.fontVariationSettings = styleStr;
          
          if (alpha) {
            span.style.opacity = "0.3";
          }
        });
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial setup
    handleMouseLeave();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [width, weight, italic, alpha]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${flex ? "flex" : ""} ${className}`}
      style={{
        fontFamily,
        color: textColor,
        WebkitTextStrokeColor: stroke && strokeColor ? strokeColor : undefined,
        WebkitTextStrokeWidth: stroke ? "1px" : "0px",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          className="inline-block transition-opacity duration-300"
          style={{
            minWidth: char === " " ? "0.3em" : "auto", // space needs width
            fontVariationSettings: `"wght" ${weight ? 300 : 400}, "wdth" ${width ? 75 : 100}`,
            transition: "font-variation-settings 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
