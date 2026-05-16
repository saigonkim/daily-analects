"use client";

import confetti from 'canvas-confetti';

export default function CompleteButton() {
  const handleClick = () => {
    // 폭죽 효과 애니메이션
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#c5a059', '#8fa5d6', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#c5a059', '#8fa5d6', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };

  return (
    <button 
      className="w-full py-4 rounded-2xl bg-[#c5a059] hover:bg-[#e9c176] text-[#261900] font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(197,160,89,0.25)] active:scale-95 flex justify-center items-center gap-2 group"
      onClick={handleClick}
    >
      <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      Mark as Completed
    </button>
  );
}
