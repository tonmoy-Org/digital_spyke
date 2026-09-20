"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  header,
}: {
  data: TimelineEntry[];
  header?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans px-4 md:px-10"
      ref={containerRef}
    >
      {header}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-28 md:top-36 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 w-8 md:h-10 md:w-10 absolute left-2 md:left-3 rounded-full bg-[#060811]/90 border border-cyan-500/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-cyan-400 border border-cyan-300 shadow-[0_0_10px_#22d3ee]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 sm:pl-16 md:pl-4 pr-1 sm:pr-4 w-full">
              <h3 className="md:hidden block text-xl sm:text-2xl mb-4 text-left font-bold text-cyan-400">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#00FFAB] via-[#0055FE] to-[#6B46FF] from-[0%] via-[40%] rounded-full shadow-[0_0_12px_#0055FE]"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
