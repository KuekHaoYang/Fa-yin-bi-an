"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    { title: "基础佛法", path: "/basic" },
    { title: "修行大要", path: "/cultivation" },
    { title: "佛典故事", path: "/stories" },
    { title: "如来诸经", path: "/sutras" },
    { title: "禅宗大义", path: "/zen" },
    { title: "如何往生", path: "/rebirth" },
    { title: "佛教历史", path: "/history" },
    { title: "法华华严", path: "/lotus" },
  ];

  return (
    <div className="bg-[#F5F5DC] px-4 py-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center" style={{ color: "#D4AF37" }}>
          法音彼岸
        </h1>
        <p className="text-base md:text-lg text-center text-[#333333] mb-4">
          浮生若梦，为欢几何？愿以此功德，庄严佛净土。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
          {menuItems.map((item, index) => (
            <Link href={item.path} key={index} className="w-full">
              <Button
                className="w-full h-12 text-base bg-[#D4AF37] text-white hover:bg-[#C5A017] transition-colors"
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center border-t border-[#D4AF37]/10 pt-8 w-full max-w-3xl">
          <div className="flex flex-col gap-2">
            <p className="text-[#333333] text-lg font-light tracking-wider">
              梦中明明有六趣
            </p>
            <p className="text-[#333333] text-lg font-light tracking-wider">
              觉后空空无大千
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
