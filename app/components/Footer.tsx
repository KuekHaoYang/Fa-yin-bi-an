"use client";

export function AppFooter() {
  return (
    <footer className="w-full py-3 px-4 bg-[#F5F5DC] border-t border-[#D4AF37]/20 mt-auto">
      <div className="container mx-auto">
        <p className="text-center text-[#333333] text-sm">
          © {new Date().getFullYear()} 法音彼岸 | 南无阿弥陀佛
        </p>
      </div>
    </footer>
  );
}
