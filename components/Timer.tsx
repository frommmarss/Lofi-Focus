"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Timer({ onComplete }: { onComplete: () => void }) {
  const DEFAULT_TIME = 25 * 60; // 25 minutes
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-12 glass rounded-3xl w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative group cursor-pointer" onClick={() => setTimeLeft(0)} title="Secret: Click to finish timer">
        <h1 className="text-8xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400 drop-shadow-lg">
          {formatTime(timeLeft)}
        </h1>
        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="flex space-x-6">
        <button 
          onClick={toggleTimer}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all duration-300 text-teal-200 hover:text-teal-100 shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all duration-300 text-gray-400 hover:text-gray-200"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
}
