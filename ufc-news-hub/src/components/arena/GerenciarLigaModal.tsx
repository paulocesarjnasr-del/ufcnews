'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ImageIcon, Settings, Users, UserMinus, Eye, EyeOff, Swords, BarChart3, Trophy, MessageCircle, Globe, Lock } from 'lucide-react';
import { NIVEL_CONFIG, type Liga, type MembroLiga, type NivelUsuario } from '@/types/arena';
import { BannerUpload } from './BannerUpload';
import { ConfirmarExpulsaoModal } from './ConfirmarExpulsaoModal';

interface GerenciarLigaModalProps {
  liga: Liga;
  membros: MembroLiga[];
  isOpen: boolean;
  onClose: () => void;
  onBannerUpdate: (url: string | null) => void;
  onLigaUpdate: (fields: Partial<Liga>) => void;
  onMembroExpulso: (userId: string) => void;
}

type Tab = 'banner' | 'configs' | 'membros';

export function GerenciarLigaModal({
  liga, membros, isOpen, onClose, onBannerUpdate, onLigaUpdate, onMembroExpulso,
}: GerenciarLigaModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('configs');

  // Configs form state
  const [nome, setNome] = useState(liga.nome);
  const [descricao, setDescricao] = useState(liga.descricao || '');
  const [tipo, setTipo] = useState(liga.tipo);
  const [maxMembros, setMaxMembros] = useState(liga.max_membros);
  const [mostrarPicks, setMostrarPicks] = useState(liga.mostrar_picks_antes);
  const [apenasMainCard, setApenasMainCard] = useState(liga.apenas_main_card);
  const [rankingTipo, setRankingTipo] = useState(liga.ranking_tipo || 'pontos');
  const [chatAtivo, setChatAtivo] = useState(liga.chat_ativo ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Expel state
  const [expelTarget, setExpelTarget] = useState<{ userId: string; username: string } | null>(null);

  if (!isOpen) return null;

  async function handleSaveConfigs() {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/arena/ligas/${liga.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          descricao: descricao.trim() || null,
          tipo,
          max_membros: maxMembros,
          mostrar_picks_antes: mostrarPicks,
          apenas_main_card: apenasMainCard,
          ranking_tipo: rankingTipo,
          chat_ativo: chatAtivo,
        }),
      });

      const data = await res.json() as { success?: boolean; liga?: Liga; error?: string };

      if (res.ok && data.success) {
        onLigaUpdate(data.liga || {
          nome: nome.trim(),
          descricao: descricao.trim() || null,
          tipo,
          max_membros: maxMembros,
          mostrar_picks_antes: mostrarPicks,
          apenas_main_card: apenasMainCard,
          ranking_tipo: rankingTipo,
          chat_ativo: chatAtivo,
        });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } else {
        setSaveError(data.error || 'Erro ao salvar');
      }
    } catch {
      setSaveError('Erro de conexao');
    } finally {
      setIsSaving(false);
    }
  }

  function handleExpulso() {
    if (expelTarget) {
      onMembroExpulso(expelTarget.userId);
      setExpelTarget(null);
    }
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'banner', label: 'Banner', icon: <ImageIcon size={16} /> },
    { key: 'configs', label: 'Configs', icon: <Settings size={16} /> },
    { key: 'membros', label: 'Membros', icon: <Users size={16} /> },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div
          className="neu-card rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="font-display text-xl uppercase text-white">Gerenciar Liga</h2>
            <button onClick={onClose} className="text-dark-textMuted hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-5 pt-4">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-ufc-red/20 text-ufc-red'
                    : 'text-dark-textMuted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* Banner tab */}
            {activeTab === 'banner' && (
              <BannerUpload
                ligaId={liga.id}
                currentBanner={liga.imagem_url}
                onUpload={onBannerUpdate}
                isOpen={true}
                onClose={() => {}}
                embedded={true}
              />
            )}

            {/* Configs tab */}
            {activeTab === 'configs' && (
              <div className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Nome da Liga</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    maxLength={50}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-ufc-red"
                  />
                </div>

                {/* Descricao */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Descricao</label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={200}
                    rows={2}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-ufc-red"
                  />
                  <span className="text-[10px] text-dark-textMuted">{descricao.length}/200</span>
                </div>

                {/* Tipo */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Tipo</label>
                  <div className="flex gap-2">
                    {(['publica', 'privada'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTipo(t)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                          tipo === t
                            ? 'border-ufc-red bg-ufc-red/10 text-white'
                            : 'border-dark-border text-dark-textMuted hover:text-white'
                        }`}
                      >
                        {t === 'publica' ? <Globe size={14} /> : <Lock size={14} />}
                        {t === 'publica' ? 'Publica' : 'Privada'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max membros */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Max Membros (0 = ilimitado)</label>
                  <input
                    type="number"
                    value={maxMembros}
                    onChange={(e) => setMaxMembros(Number(e.target.value))}
                    min={0}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-ufc-red"
                  />
                </div>

                {/* Ranking tipo */}
                <div>
                  <label className="text-xs text-dark-textMuted uppercase mb-1 block">Ranking</label>
                  <div className="flex gap-2">
                    {([{ value: 'pontos', label: 'Por Pontos', icon: Trophy }, { value: 'percentual', label: 'Por Percentual', icon: BarChart3 }] as const).map(r => (
                      <button
                        key={r.value}
                        onClick={() => setRankingTipo(r.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                          rankingTipo === r.value
                            ? 'border-ufc-red bg-ufc-red/10 text-white'
                            : 'border-dark-border text-dark-textMuted hover:text-white'
                        }`}
                      >
                        <r.icon size={14} />
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boolean toggles */}
                <div className="space-y-2">
                  {[
                    { label: 'Mostrar picks antes do evento', desc: 'Membros podem ver os picks uns dos outros', icon: mostrarPicks ? Eye : EyeOff, value: mostrarPicks, set: setMostrarPicks },
                    { label: 'Apenas Main Card', desc: 'Previsoes so do main card', icon: Swords, value: apenasMainCard, set: setApenasMainCard },
                    { label: 'Chat ativo', desc: 'Membros podem conversar na liga', icon: MessageCircle, value: chatAtivo, set: setChatAtivo },
                  ].map(toggle => (
                    <button
                      key={toggle.label}
                      type="button"
                      onClick={() => toggle.set(!toggle.value)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
                    >
                      <toggle.icon className={`w-5 h-5 mt-0.5 shrink-0 ${toggle.value ? 'text-ufc-red' : 'text-white/30'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{toggle.label}</div>
                        <div className="text-[11px] text-white/30 mt-0.5">{toggle.desc}</div>
                      </div>
                      <div className={`relative w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${toggle.value ? 'bg-ufc-red' : 'bg-white/10'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${toggle.value ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Save feedback */}
                {saveError && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{saveError}</p>
                )}
                {saveSuccess && (
                  <p className="text-sm text-green-400 bg-green-900/20 border border-green-800 rounded-lg px-3 py-2">Alteracoes salvas!</p>
                )}
                <button
                  onClick={handleSaveConfigs}
                  disabled={isSaving}
                  className="w-full neu-button rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isSaving ? 'Salvando...' : 'Salvar alteracoes'}
                </button>
              </div>
            )}

            {/* Membros tab */}
            {activeTab === 'membros' && (
              <div className="space-y-2">
                {membros.length === 0 ? (
                  <p className="text-center text-dark-textMuted py-4">Nenhum membro</p>
                ) : (
                  membros.map(membro => {
                    const nivelConfig = NIVEL_CONFIG[membro.nivel as NivelUsuario];
                    const displayName = membro.display_name || membro.username;

                    return (
                      <div
                        key={membro.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
                          {membro.avatar_url ? (
                            <Image
                              src={membro.avatar_url}
                              alt={membro.username}
                              width={36}
                              height={36}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-dark-textMuted text-sm font-bold">
                              {membro.username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-white truncate block">
                            {displayName}
                          </span>
                          <span className="text-xs text-dark-textMuted">
                            {nivelConfig?.icone} {membro.nivel}
                          </span>
                        </div>

                        {membro.is_admin ? (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-ufc-red/20 text-ufc-red">
                            Criador
                          </span>
                        ) : (
                          <button
                            onClick={() => setExpelTarget({ userId: membro.id, username: displayName })}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-400 hover:bg-red-900/20 transition-colors"
                          >
                            <UserMinus size={14} />
                            Expulsar
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expel confirmation (on top of this modal) */}
      <ConfirmarExpulsaoModal
        ligaId={liga.id}
        userId={expelTarget?.userId || ''}
        username={expelTarget?.username || ''}
        isOpen={!!expelTarget}
        onClose={() => setExpelTarget(null)}
        onExpulso={handleExpulso}
      />
    </>
  );
}
