"use client";

import { useState } from "react";
import { CloudRain, Coffee, Keyboard } from "lucide-react";

export default function AmbientToggles() {
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    rain: false,
    cafe: false,
    keyboard: false,
  });

  const toggle = (id: string) => {
    setActiveToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ToggleButton = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => {
    const isActive = activeToggles[id];
    return (
      <button
        onClick={() => toggle(id)}
        className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 w-24 h-24 border ${
          isActive 
            ? "bg-teal-500/20 border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.3)] text-teal-300 scale-105" 
            : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
        } glass`}
      >
        <Icon size={32} className="mb-2" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex space-x-6 justify-center mt-12">
      <ToggleButton id="rain" icon={CloudRain} label="Rain" />
      <ToggleButton id="cafe" icon={Coffee} label="Cafe" />
      <ToggleButton id="keyboard" icon={Keyboard} label="Keys" />
    </div>
  );
}
