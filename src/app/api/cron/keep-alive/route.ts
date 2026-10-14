import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Vercel Cron からの正規アクセス（合言葉）かチェック
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 設定済みの環境変数を使用
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Supabase credentials missing' },
      { status: 500 },
    );
  }

  try {
    // Supabase の REST API へ Ping リクエストを送信
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    return NextResponse.json({ success: true, status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to ping Supabase' },
      { status: 500 },
    );
  }
}
