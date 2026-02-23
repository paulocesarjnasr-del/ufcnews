import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Strip markdown/HTML to plain text for TTS
function markdownToPlainText(md: string): string {
  return md
    // Remove poll markers
    .replace(/<!-- POLL:.*? -->/g, '')
    // Remove HTML comments
    .replace(/<!--.*?-->/g, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    // Remove headers markup but keep text
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    // Remove table formatting
    .replace(/\|/g, ' ')
    .replace(/^[\s\-|:]+$/gm, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove blockquotes
    .replace(/^>\s*/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s/gm, '')
    .replace(/^[\s]*\d+\.\s/gm, '')
    // Collapse multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Collapse multiple spaces
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'TxGEqnHWrfWFTfGW9XjX';

  if (!apiKey) {
    return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
  }

  const { id } = await params;

  // Fetch article content
  const article = await query<{ titulo: string; conteudo_completo: string | null; subtitulo: string | null }>(
    'SELECT titulo, conteudo_completo, subtitulo FROM noticias WHERE id = $1',
    [id]
  );

  if (!article || article.length === 0) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const { titulo, conteudo_completo, subtitulo } = article[0];
  const rawContent = conteudo_completo || subtitulo || '';

  if (!rawContent) {
    return NextResponse.json({ error: 'No content to narrate' }, { status: 400 });
  }

  // Convert markdown to plain text and limit length for TTS
  const plainText = markdownToPlainText(rawContent);
  // ElevenLabs has a ~5000 char limit per request. Truncate if needed.
  const text = `${titulo}. ${plainText}`.slice(0, 4800);

  // Call ElevenLabs TTS (non-streaming — returns complete file with Content-Length)
  const ttsResponse = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.2,
        },
      }),
    }
  );

  if (!ttsResponse.ok) {
    const errorText = await ttsResponse.text();
    console.error('ElevenLabs error:', ttsResponse.status, errorText);
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 502 }
    );
  }

  // Buffer full audio so browser gets Content-Length (required for Audio element)
  const audioBuffer = await ttsResponse.arrayBuffer();

  return new Response(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.byteLength.toString(),
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
