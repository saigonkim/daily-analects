import { Inter } from "next/font/google";
import { supabase } from "@/lib/supabase";
import CompleteButton from "@/components/CompleteButton";

const inter = Inter({ subsets: ["latin"] });

// Server Component for SEO and data fetching
export default async function Home() {
  // 1. 전체 논어 데이터 개수를 가져옵니다.
  const { count } = await supabase
    .from("analects")
    .select("*", { count: 'exact', head: true });

  let quote = null;

  if (count && count > 0) {
    // 2. 기준일로부터 오늘까지 며칠이 지났는지 계산합니다.
    const epoch = new Date('2024-01-01T00:00:00Z');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - epoch.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 3. (경과 일수 % 전체 개수) 연산을 통해 무한히 순환하는 인덱스를 구합니다.
    const index = diffDays % count;

    // 4. 계산된 인덱스에 해당하는 구절을 하나 가져옵니다.
    const { data } = await supabase
      .from("analects")
      .select("*")
      .order("created_at", { ascending: true })
      .range(index, index);

    if (data && data.length > 0) {
      quote = data[0];
    }
  }

  // 만약 DB가 비어있거나 에러가 났을 때의 기본값 (Fallback)
  if (!quote) {
    quote = {
      chapter: "학이편 (學而篇)",
      original_text: "學而時習之 不亦說乎 (학이시습지 불역열호)",
      translation: "배우고 때때로 익히면 또한 기쁘지 아니한가.",
      explanation: "여기서 '습(習)'은 어린 새가 날갯짓을 반복하듯 삶 속에서 꾸준히 실천하는 행위를 의미합니다.",
      application: "오늘 새롭게 알게 된 사실이나 깨달음을 퇴근 전 5분 동안 메모해 보고, 내일 업무에 어떻게 적용할지 계획을 세워보세요."
    };
  }

  // 한자 원문과 괄호 안의 한국어 독음을 분리
  const match = quote.original_text.match(/^(.*?)\s*\((.*?)\)$/);
  const hanjaText = match ? match[1].trim() : quote.original_text;
  const pronunciation = match ? match[2].trim() : "";

  return (
    <main className={`min-h-screen bg-[#0D0D12] text-[#F9FAFB] flex flex-col items-center justify-center p-6 sm:p-12 ${inter.className}`}>
      {/* Container */}
      <div className="max-w-md w-full space-y-12 my-auto">
        
        {/* Today's Quote */}
        <section className="text-center space-y-8 animate-fade-in-up">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#16161E] text-[#c5a059] text-xs font-semibold tracking-widest border border-[#1C1C26] shadow-sm">
              {quote.chapter}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-[#e9e1d8] font-serif">
            {hanjaText.split(' ').map((word: string, i: number) => (
              <span key={i} className={i > 0 ? "mt-4 block" : ""}>{word}</span>
            ))}
          </h1>
          {pronunciation && (
            <p className="text-[#c5a059] opacity-80 text-sm md:text-base tracking-[0.2em] mt-6 font-medium">
              {pronunciation}
            </p>
          )}
          <p className="text-lg md:text-xl text-[#d1c5b4] font-medium pt-4">
            {quote.translation.split('<br />').map((line: string, i: number) => (
              <span key={i} className={i > 0 ? "block" : ""}>{line}</span>
            ))}
          </p>
        </section>

        {/* Meaning & Explanation */}
        <section className="bg-[#16161E] rounded-3xl p-7 md:p-8 shadow-2xl shadow-black/50 border border-[#1C1C26] transition-transform hover:scale-[1.01]">
          <h2 className="text-xs font-bold text-[#c5a059] mb-3 uppercase tracking-widest opacity-80">Meaning</h2>
          <p className="text-[#9CA3AF] leading-relaxed text-[15px]">
            {quote.explanation}
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
              {quote.application}
            </p>
          </div>

          <CompleteButton />
        </section>

      </div>
    </main>
  );
}
