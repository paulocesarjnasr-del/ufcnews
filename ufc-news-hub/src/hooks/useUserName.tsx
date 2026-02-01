'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface UseUserNameReturn {
  userName: string;
  setUserName: (name: string) => void;
  showNamePrompt: boolean;
  NamePromptModal: () => React.ReactNode;
}

export function useUserName(): UseUserNameReturn {
  const [userName, setUserNameState] = useState<string>('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ufc_user_name');
    if (stored) {
      setUserNameState(stored);
    } else {
      setShowPrompt(true);
    }
  }, []);

  const setUserName = useCallback((name: string) => {
    if (name) {
      localStorage.setItem('ufc_user_name', name);
      setUserNameState(name);
      setShowPrompt(false);
    } else {
      localStorage.removeItem('ufc_user_name');
      setUserNameState('');
      setShowPrompt(true);
    }
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim().length >= 2) {
      setUserName(inputValue.trim());
    }
  };

  const NamePromptModal = useCallback(() => {
    if (!showPrompt) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-md rounded-lg border border-dark-border bg-dark-card p-6 shadow-xl">
          <h2 className="font-display text-xl uppercase text-dark-text">
            Bem-vindo a Arena!
          </h2>
          <p className="mt-2 text-sm text-dark-textMuted">
            Para fazer previsoes e aparecer no ranking, precisamos saber seu nome.
          </p>

          <div className="mt-4">
            <label className="block text-sm font-medium text-dark-text">
              Seu nome ou apelido
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ex: JohnDoe, MMAFan123"
              maxLength={50}
              className="mt-1 w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
            />
            <p className="mt-1 text-xs text-dark-textMuted">
              Minimo 2 caracteres, maximo 50
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowPrompt(false)}
              className="flex-1 rounded border border-dark-border px-4 py-2 text-dark-textMuted transition-colors hover:bg-dark-border"
            >
              Apenas ver
            </button>
            <button
              onClick={handleSubmit}
              disabled={inputValue.trim().length < 2}
              className="flex-1 rounded bg-ufc-red px-4 py-2 font-bold text-white transition-colors hover:bg-ufc-redLight disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comecar
            </button>
          </div>
        </div>
      </div>
    );
  }, [showPrompt, inputValue, handleSubmit]);

  return {
    userName,
    setUserName,
    showNamePrompt: showPrompt && !userName,
    NamePromptModal,
  };
}
