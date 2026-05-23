"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import AmbientToggles from "@/components/AmbientToggles";
import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center py-20 px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-teal-300 drop-shadow-sm mb-4">
            LofiFocus
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
            Immerse yourself. Stay focused. <br/> Log your journey on Monad.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full relative">
          <Timer onComplete={() => setIsSessionComplete(true)} />
        </div>

        {/* Bottom Section */}
        <WalletConnect showLogButton={isSessionComplete} />
        
        <div className="mt-16 w-full">
          <div className="text-center mb-6">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold">Ambient Soundscapes</h3>
          </div>
          <AmbientToggles />
        </div>

      </div>
    </main>
  );
}
