import { NextRequest, NextResponse } from 'next/server';
import { getFighterStatsByName } from '@/lib/ufcstats-scraper';

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Missing "name" query parameter' },
      { status: 400 }
    );
  }

  try {
    const stats = await getFighterStatsByName(name);

    if (!stats) {
      return NextResponse.json(
        { error: `Fighter not found: "${name}"` },
        { status: 404 }
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching fighter stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fighter stats' },
      { status: 500 }
    );
  }
}
