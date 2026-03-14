interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();

const LIMITS = {
  perEmail: { max: 5, windowMs: 15 * 60 * 1000 },
  perIP: { max: 20, windowMs: 15 * 60 * 1000 },
};

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  email: string
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const emailKey = `login:email:${email.toLowerCase()}`;
  const ipKey = `login:ip:${ip}`;

  for (const [key, limit] of [
    [emailKey, LIMITS.perEmail] as const,
    [ipKey, LIMITS.perIP] as const,
  ]) {
    const entry = attempts.get(key);
    if (entry) {
      if (entry.resetAt <= now) {
        attempts.delete(key);
      } else if (entry.count >= limit.max) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return { allowed: false, retryAfter };
      }
    }
  }

  return { allowed: true };
}

export function recordAttempt(ip: string, email: string): void {
  const now = Date.now();
  const emailKey = `login:email:${email.toLowerCase()}`;
  const ipKey = `login:ip:${ip}`;

  for (const [key, limit] of [
    [emailKey, LIMITS.perEmail] as const,
    [ipKey, LIMITS.perIP] as const,
  ]) {
    const entry = attempts.get(key);
    if (entry && entry.resetAt > now) {
      entry.count++;
    } else {
      attempts.set(key, { count: 1, resetAt: now + limit.windowMs });
    }
  }
}
