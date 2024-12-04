"use client";

import { useEffect, useState } from 'react';
import { Skeleton } from "@nextui-org/react";

interface LoadingProps {
  pathname: string;
}

export function Loading({ pathname }: LoadingProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;

  // 首页加载骨架屏
  if (pathname === '/') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
        <div className="px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="w-48 h-12 rounded-lg bg-[#D4AF37]/20" />
            <Skeleton className="w-96 h-6 rounded-lg bg-[#D4AF37]/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-12 rounded-lg bg-[#D4AF37]/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 基础佛法页面加载骨架屏
  if (pathname === '/basic') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Skeleton className="w-48 h-12 mx-auto mb-20 rounded-lg bg-[#D4AF37]/20" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-40 rounded-2xl bg-[#D4AF37]/20" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="w-full h-4 rounded-lg bg-[#D4AF37]/20" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 其他页面的默认加载骨架屏
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Skeleton className="w-48 h-12 mx-auto mb-10 rounded-lg bg-[#D4AF37]/20" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-32 rounded-2xl bg-[#D4AF37]/20" />
          ))}
        </div>
      </div>
    </div>
  );
} 