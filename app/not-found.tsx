"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold" style={{ color: "#D4AF37" }}>
        404
      </h1>
      <p className="text-[#333333] text-lg text-center">
        抱歉，您访问的页面不存在
      </p>
      <Link href="/">
        <Button
          className="bg-[#D4AF37] text-white hover:bg-[#C5A017] transition-colors"
        >
          返回首页
        </Button>
      </Link>
    </div>
  );
} 