'use client';

import { useState, useRef, useMemo } from 'react';
import { Send, Crown, Loader2, Brain, ClipboardList, Zap, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PromptEvent {
  type: string;
  data: Record<string, unknown>;
}

interface FeedEntry {
  type: string;
  data: Record<string, unknown>;
  ts: number;
}

interface PromptInputProps {
  onEvent: (event: PromptEvent) => void;
  onStart: () => void;
  onEnd: () => void;
  disabled?: boolean;
  feedEvents?: FeedEntry[];
}

// ---------------------------------------------------------------------------
// Step Progress
// ---------------------------------------------------------------------------

interface StepInfo {
  key: string;
  label: string;
  icon: typeof Brain;
  active: boolean;
  done: boolean;
}

function MissionStepper({ steps, currentStep }: { steps: StepInfo[]; currentStep: number }) {
  return (
    <div className="mt-3 px-1">
      {/* Progress bar */}
      <div className="relative h-1 bg-dark-border rounded-full overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-ufc-red to-red-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.max(5, ((currentStep + 1) / steps.length) * 100)}%` }}
        />
      </div>

      {/* Steps row */}
      <div className="flex items-center justify-between">
        {steps.map((step, _i) => {
          const Icon = step.icon;
          const isActive = step.active && !step.done;
          const isDone = step.done;

          return (
            <div key={step.key} className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone
                    ? 'bg-green-500/20 text-green-400'
                    : isActive
                      ? 'bg-ufc-red/20 text-ufc-red animate-pulse'
                      : 'bg-dark-border/50 text-dark-textMuted/40'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Icon className={`w-3 h-3 ${isActive ? 'animate-pulse' : ''}`} />
                )}
              </div>
              <span
                className={`text-[9px] text-center leading-tight ${
                  isDone
                    ? 'text-green-400'
                    : isActive
                      ? 'text-dark-text font-medium'
                      : 'text-dark-textMuted/40'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PromptInput({ onEvent, onStart, onEnd, disabled, feedEvents = [] }: PromptInputProps) {
  const { token } = useAdminAuth();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Derive mission progress from feedEvents
  const { steps, currentStep, showStepper } = useMemo(() => {
    if (feedEvents.length === 0) {
      return { steps: [] as StepInfo[], currentStep: -1, showStepper: false };
    }

    const hasCeoThinking = feedEvents.some(e => e.type === 'ceo_thinking');
    const ceoAnalysis = feedEvents.find(e => e.type === 'ceo_analysis');
    const delegations = ceoAnalysis
      ? ((ceoAnalysis.data.delegations ?? []) as Array<Record<string, unknown>>)
      : [];
    const totalDelegated = delegations.length;
    const agentsDone = feedEvents.filter(e => e.type === 'agent_done').length;
    const hasConsolidating = feedEvents.some(e => e.type === 'consolidating');
    const hasDone = feedEvents.some(e => e.type === 'done');

    const stepsArr: StepInfo[] = [
      {
        key: 'thinking',
        label: '🧠 CEO analisando...',
        icon: Brain,
        active: hasCeoThinking,
        done: !!ceoAnalysis,
      },
      {
        key: 'delegated',
        label: totalDelegated > 0 ? `📋 ${totalDelegated} agentes delegados` : '📋 Delegando...',
        icon: ClipboardList,
        active: !!ceoAnalysis && !hasConsolidating && !hasDone,
        done: hasConsolidating || hasDone,
      },
      {
        key: 'executing',
        label: totalDelegated > 0 ? `⚡ ${agentsDone}/${totalDelegated} concluídos` : '⚡ Executando...',
        icon: Zap,
        active: agentsDone > 0 && !hasConsolidating && !hasDone,
        done: hasConsolidating || hasDone,
      },
      {
        key: 'consolidating',
        label: '👑 Consolidando...',
        icon: Crown,
        active: hasConsolidating && !hasDone,
        done: hasDone,
      },
      {
        key: 'done',
        label: '✅ Missão completa',
        icon: CheckCircle2,
        active: hasDone,
        done: hasDone,
      },
    ];

    // Find current step index
    let curStep = -1;
    for (let i = stepsArr.length - 1; i >= 0; i--) {
      if (stepsArr[i].active || stepsArr[i].done) {
        curStep = i;
        break;
      }
    }

    return { steps: stepsArr, currentStep: curStep, showStepper: hasCeoThinking || feedEvents.length > 0 };
  }, [feedEvents]);

  const handleSubmit = async () => {
    const text = prompt.trim();
    if (!text || loading) return;

    setLoading(true);
    onStart();

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/company/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ prompt: text }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let eventType = '';
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            eventType = line.slice(7);
          } else if (line.startsWith('data: ') && eventType) {
            try {
              const data = JSON.parse(line.slice(6));
              onEvent({ type: eventType, data });
            } catch {
              // skip malformed JSON
            }
            eventType = '';
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      onEvent({
        type: 'done',
        data: { error: err instanceof Error ? err.message : 'Unknown error' },
      });
    } finally {
      setLoading(false);
      setPrompt('');
      onEnd();
    }
  };

  return (
    <div className="neu-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-4 h-4 text-ufc-red" />
        <span className="text-dark-text text-sm font-bold">Prompt para o CEO</span>
        <span className="text-dark-textMuted text-xs">Ricardo Miura analisa e delega</span>
      </div>

      <div className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ex: Me diga quem sao os lutadores do UFC 315..."
          disabled={loading || disabled}
          rows={2}
          className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-text placeholder-dark-textMuted/50 resize-none focus:outline-none focus:ring-2 focus:ring-ufc-red/50 focus:border-ufc-red/50 disabled:opacity-50 transition-colors"
          id="ceo-prompt-input"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim() || disabled}
          className="neu-button px-5 py-3 text-ufc-red font-semibold text-sm flex items-center gap-2 hover:bg-ufc-red/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-end"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mission Progress Stepper */}
      {showStepper && <MissionStepper steps={steps} currentStep={currentStep} />}
    </div>
  );
}
