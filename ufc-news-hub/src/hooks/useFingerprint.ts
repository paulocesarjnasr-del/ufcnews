'use client';

import { useState, useEffect } from 'react';

export function useFingerprint(): string {
  const [fingerprint, setFingerprint] = useState<string>('');

  useEffect(() => {
    // Verificar se ja existe um fingerprint salvo
    const stored = localStorage.getItem('ufc_user_fingerprint');
    if (stored) {
      setFingerprint(stored);
      return;
    }

    // Gerar novo fingerprint
    const newFingerprint = generateFingerprint();
    localStorage.setItem('ufc_user_fingerprint', newFingerprint);
    setFingerprint(newFingerprint);
  }, []);

  return fingerprint;
}

function generateFingerprint(): string {
  const components: string[] = [];

  // User Agent
  components.push(navigator.userAgent);

  // Screen
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);

  // Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Language
  components.push(navigator.language);

  // Platform
  components.push(navigator.platform);

  // Random component for uniqueness
  components.push(Math.random().toString(36).substring(2, 15));

  // Timestamp
  components.push(Date.now().toString(36));

  // Generate hash
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36) + Date.now().toString(36);
}
