import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Vercel Cron에서 보낸 정상적인 요청인지 확인 (보안)
    const authHeader = request.headers.get('authorization');
    if (
      !process.env.CRON_SECRET ||
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Supabase 프로젝트가 일시중지(Pause)되는 것을 막기 위해 가벼운 쿼리 실행
    const { data, error } = await supabase
      .from('analects')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase keep-alive ping executed successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron keep-alive error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
