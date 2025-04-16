import { Input } from "@/components/ui/input";
import Image from "next/image";
import SearchInput from "./search";

export default function Hero() {
  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center text-white mb-8">
      {/* Background Image */}
      <Image
        src="https://thumb.viva.co.id/media/frontend/thumbs3/2023/03/29/6423a88d348a0-universitas-brawijaya-malang-jjawa-timur_1265_711.jpg"
        alt="Background"
        fill 
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 text-center max-w-2xl px-4">
        <h1 className="text-4xl font-semibold mb-6">Enter your professor's name to get started</h1>
        <SearchInput/>
      </div>
    </div>
  );
}
