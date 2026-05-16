import { Inter } from "next/font/google";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

export default async function TagPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const tagName = decodeURIComponent(resolvedParams.name);

  // 해당 태그가 달린 명언 리스트 조회
  const { data: quotes } = await supabase
    .from('analects')
    .select(`
      *,
      analect_tags!inner (
        tags!inner ( name )
      )
    `)
    .eq('analect_tags.tags.name', tagName)
    .order('created_at', { ascending: true });

  return (
    <main className={`min-h-screen bg-[#0D0D12] text-[#F9FAFB] p-6 sm:p-12 ${inter.className}`}>
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#1C1C26] pb-6">
          <div>
            <Link href="/" className="inline-flex items-center text-[#8fa5d6] hover:text-[#c5a059] transition-colors mb-4 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-[#e9e1d8]">
              <span className="text-[#c5a059]">#{tagName}</span>에 대한 지혜
            </h1>
          </div>
        </header>

        {/* Quotes List */}
        <div className="space-y-6">
          {quotes && quotes.length > 0 ? (
            quotes.map((quote) => {
              const match = quote.original_text.match(/^(.*?)\s*\((.*?)\)$/);
              const hanjaText = match ? match[1].trim() : quote.original_text;

              return (
                <div key={quote.id} className="bg-[#16161E] rounded-2xl p-6 border border-[#1C1C26] shadow-lg hover:border-[#c5a059]/30 transition-colors">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-[#8fa5d6] bg-[#8fa5d6]/10 px-2 py-1 rounded-md">
                      {quote.chapter}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif text-[#e9e1d8] mb-2">{hanjaText}</h2>
                  <p className="text-[#d1c5b4] font-medium mb-4">{quote.translation.split('<br />').join(' ')}</p>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                    {quote.explanation}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center text-[#9CA3AF] py-12">
              이 태그에 해당하는 명언이 아직 없습니다.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
