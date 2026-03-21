import { Resend } from 'resend';
import type { CardChange } from './card-monitor';

// ═══════════════════════════════════════════════════════════
// Card Monitor Email Alerts
// ═══════════════════════════════════════════════════════════

function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const ALERT_RECIPIENTS = (process.env.CARD_MONITOR_EMAILS || 'paulocesarjnasr@gmail.com').split(',');

function buildChangeIcon(type: CardChange['type']): string {
  switch (type) {
    case 'fight_removed': return '🔴';
    case 'fight_added': return '🟢';
    case 'opponent_changed': return '🟡';
    case 'card_cancelled': return '⛔';
    default: return '⚪';
  }
}

function buildChangeLabel(type: CardChange['type']): string {
  switch (type) {
    case 'fight_removed': return 'LUTA REMOVIDA';
    case 'fight_added': return 'LUTA ADICIONADA';
    case 'opponent_changed': return 'OPONENTE ALTERADO';
    case 'card_cancelled': return 'CARD CANCELADO';
    default: return 'MUDANCA';
  }
}

export async function sendCardChangeAlert(
  eventoNome: string,
  changes: CardChange[]
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Card Monitor] RESEND_API_KEY not set, skipping email');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  const changesHtml = changes.map((c) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #222; color: #fff; font-size: 13px;">
        ${buildChangeIcon(c.type)} <strong style="color: #D20A0A;">${buildChangeLabel(c.type)}</strong>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #222; color: #ccc; font-size: 13px;">
        ${c.description}
      </td>
    </tr>
  `).join('');

  const html = `
    <div style="background: #0A0A0A; padding: 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #D20A0A; font-size: 24px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">
            Card Monitor Alert
          </h1>
          <p style="color: #666; font-size: 12px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px;">
            Combat Sports Intelligence Engine
          </p>
        </div>

        <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
          <p style="color: #D20A0A; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">
            Evento
          </p>
          <h2 style="color: #fff; font-size: 20px; margin: 0;">
            ${eventoNome}
          </h2>
          <p style="color: #666; font-size: 12px; margin: 8px 0 0;">
            ${changes.length} mudanca${changes.length > 1 ? 's' : ''} detectada${changes.length > 1 ? 's' : ''}
          </p>
        </div>

        <div style="background: #111; border: 1px solid #222; border-radius: 12px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 12px; text-align: left; color: #666; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #333;">
                  Tipo
                </th>
                <th style="padding: 12px; text-align: left; color: #666; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #333;">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody>
              ${changesHtml}
            </tbody>
          </table>
        </div>

        <div style="background: #1a1008; border: 1px solid #c9b03740; border-radius: 12px; padding: 16px; margin-top: 16px;">
          <p style="color: #c9b037; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">
            Acao Necessaria
          </p>
          <p style="color: #ccc; font-size: 13px; margin: 0;">
            Verifique as mudancas e re-rode o pipeline de analise para as lutas afetadas.
            Acesse o dashboard em <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://ufc-news.vercel.app'}/admin/card-monitor" style="color: #D20A0A;">Card Monitor</a>.
          </p>
        </div>

        <p style="color: #444; font-size: 10px; text-align: center; margin-top: 24px;">
          Combat Sports Intelligence Engine &middot; Alerta automatico
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await getResendClient().emails.send({
      from: 'Card Monitor <onboarding@resend.dev>',
      to: ALERT_RECIPIENTS,
      subject: `[CARD ALERT] ${eventoNome} - ${changes.length} mudanca${changes.length > 1 ? 's' : ''} detectada${changes.length > 1 ? 's' : ''}`,
      html,
    });

    if (error) {
      console.error('[Card Monitor] Email error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Card Monitor] Email failed:', message);
    return { success: false, error: message };
  }
}
