'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_ATTEMPTS_KEY = 'elipse_contact_form_attempts';
const STORAGE_COOLDOWN_KEY = 'elipse_contact_form_cooldown_until';
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function useRateLimitTimer({
  maxAttempts = MAX_ATTEMPTS,
  cooldownMs = DEFAULT_WINDOW_MS,
} = {}) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Check initial state from localStorage safely on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedCooldown = localStorage.getItem(STORAGE_COOLDOWN_KEY);
      if (storedCooldown) {
        const cooldownTime = parseInt(storedCooldown, 10);
        const diff = Math.ceil((cooldownTime - Date.now()) / 1000);
        if (diff > 0) {
          setRemainingSeconds(diff);
        } else {
          localStorage.removeItem(STORAGE_COOLDOWN_KEY);
          localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
        }
      }

      const storedAttempts = localStorage.getItem(STORAGE_ATTEMPTS_KEY);
      if (storedAttempts) {
        const parsed = JSON.parse(storedAttempts);
        if (Date.now() - parsed.timestamp > cooldownMs) {
          localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
          setAttempts(0);
        } else {
          setAttempts(parsed.count || 0);
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, [cooldownMs]);

  // Ticking countdown effect
  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          try {
            localStorage.removeItem(STORAGE_COOLDOWN_KEY);
            localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
          } catch {}
          setAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  // Manually trigger cooldown (e.g. from backend 429 response)
  const triggerCooldown = useCallback((seconds = Math.ceil(cooldownMs / 1000)) => {
    const cooldownUntil = Date.now() + seconds * 1000;
    try {
      localStorage.setItem(STORAGE_COOLDOWN_KEY, cooldownUntil.toString());
    } catch {}
    setRemainingSeconds(seconds);
  }, [cooldownMs]);

  // Record a new submission attempt
  const recordAttempt = useCallback(() => {
    try {
      const now = Date.now();
      const stored = localStorage.getItem(STORAGE_ATTEMPTS_KEY);
      let count = 1;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (now - parsed.timestamp < cooldownMs) {
          count = (parsed.count || 0) + 1;
        }
      }

      localStorage.setItem(
        STORAGE_ATTEMPTS_KEY,
        JSON.stringify({ count, timestamp: now })
      );
      setAttempts(count);

      if (count >= maxAttempts) {
        const seconds = Math.ceil(cooldownMs / 1000);
        triggerCooldown(seconds);
        return false; // locked
      }

      return true; // allowed
    } catch {
      return true;
    }
  }, [maxAttempts, cooldownMs, triggerCooldown]);

  const isLocked = remainingSeconds > 0 || attempts >= maxAttempts;

  // Format seconds to mm:ss
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    isLocked,
    remainingSeconds,
    formattedTime,
    attempts,
    maxAttempts,
    attemptsRemaining: Math.max(0, maxAttempts - attempts),
    recordAttempt,
    triggerCooldown,
  };
}
