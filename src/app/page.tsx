"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#0D0D12] text-[#F9FAFB] flex flex-col items-center justify-center p-6 sm:p-12 ${inter.className}`}>
      {/* Container */}
      <div className="max-w-md w-full space-y-12 my-auto">
        
        {/* Today's Quote */}
        <section className="text-center space-y-8 animate-fade-in-up">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#16161E] text-[#c5a059] text-xs font-semibold tracking-widest border border-[#1C1C26] shadow-sm">
              학이편 (學而篇)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-[#e9e1d8] font-serif">
            學而時習之<br /><span className="mt-4 block">不亦說乎</span>
          </h1>
          <p className="text-lg md:text-xl text-[#d1c5b4] font-medium pt-2">
            배우고 때때로 익히면<br />또한 기쁘지 아니한가.
          </p>
        </section>

        {/* Meaning & Explanation */}
        <section className="bg-[#16161E] rounded-3xl p-7 md:p-8 shadow-2xl shadow-black/50 border border-[#1C1C26] transition-transform hover:scale-[1.01]">
          <h2 className="text-xs font-bold text-[#c5a059] mb-3 uppercase tracking-widest opacity-80">Meaning</h2>
          <p className="text-[#9CA3AF] leading-relaxed text-[15px]">
            여기서 '습(習)'은 어린 새가 날갯짓을 반복하듯 삶 속에서 꾸준히 실천하는 행위를 의미합니다. 단순한 지식의 축적이 아닌, 배운 것을 행동으로 옮길 때 비로소 진정한 기쁨을 얻을 수 있습니다.
          </p>
        </section>

        {/* Today's Application */}
        <section className="space-y-6">
          <div className="bg-[#16161E] rounded-3xl p-7 md:p-8 border border-[#1C1C26] shadow-2xl shadow-black/50 relative overflow-hidden group">
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8fa5d6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h2 className="text-xs font-bold text-[#8fa5d6] mb-3 uppercase tracking-widest flex items-center gap-2 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8fa5d6] animate-pulse"></span>
              Application
            </h2>
            <p className="text-[#e9e1d8] leading-relaxed font-medium text-[15px] relative z-10">
              오늘 새롭게 알게 된 사실이나 깨달음을 퇴근 전 5분 동안 메모해 보고, 내일 업무에 어떻게 적용할지 단 한 가지라도 구체적인 계획을 세워보세요.
            </p>
          </div>

          <button 
            className="w-full py-4 rounded-2xl bg-[#c5a059] hover:bg-[#e9c176] text-[#261900] font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(197,160,89,0.25)] active:scale-95 flex justify-center items-center gap-2 group"
            onClick={() => alert('실천 완료! 🎉 (애니메이션 추후 연동)')}
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Mark as Completed
          </button>
        </section>

      </div>
    </main>
  );
}
