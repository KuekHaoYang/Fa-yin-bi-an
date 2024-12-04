"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AppNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "基础佛法", path: "/basic" },
    { title: "修行大要", path: "/practice" },
    { title: "佛典故事", path: "/stories" },
    { title: "如来诸经", path: "/sutras" },
    { title: "禅宗大义", path: "/zen" },
    { title: "如何往生", path: "/rebirth" },
    { title: "佛教历史", path: "/history" },
    { title: "法华华严", path: "/lotus" },
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#F5F5DC] h-12 border-b border-[#D4AF37]/20"
      maxWidth="full"
    >
      <NavbarContent className="gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          style={{
            color: "#D4AF37",
          }}
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl" style={{ color: "#D4AF37" }}>
            法音彼岸
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={pathname === item.path}>
            <Link 
              href={item.path}
              className={`text-sm ${pathname === item.path ? "text-[#D4AF37]" : "text-[#333333]"}`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="bg-[#F5F5DC] pt-2">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={item.path}
              className={`w-full ${pathname === item.path ? "text-[#D4AF37]" : "text-[#333333]"}`}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
