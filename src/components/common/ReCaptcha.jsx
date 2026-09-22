'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeB38gtAAAAAApv_sY6SETXUBiFjMnukTKebl3S';

const ReCaptcha = forwardRef(function ReCaptcha(
  { onVerify, onExpired, onError, theme = 'dark' },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Store latest callbacks in refs to avoid re-triggering effect
  const onVerifyRef = useRef(onVerify);
  const onExpiredRef = useRef(onExpired);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpiredRef.current = onExpired;
    onErrorRef.current = onError;
  }, [onVerify, onExpired, onError]);

  // Expose reset method to parent
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== 'undefined' && window.grecaptcha && widgetIdRef.current !== null) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.warn('reCAPTCHA reset error:', e);
        }
      }
    },
  }));

  useEffect(() => {
    let intervalId = null;

    const renderWidget = () => {
      if (!containerRef.current) return false;
      // If already rendered inside this container
      if (containerRef.current.children.length > 0) return true;
      if (typeof window === 'undefined' || !window.grecaptcha || typeof window.grecaptcha.render !== 'function') {
        return false;
      }

      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: theme,
          callback: (token) => {
            if (onVerifyRef.current) onVerifyRef.current(token);
          },
          'expired-callback': () => {
            if (onExpiredRef.current) onExpiredRef.current();
          },
          'error-callback': () => {
            if (onErrorRef.current) onErrorRef.current();
          },
        });
        return true;
      } catch (err) {
        console.warn('reCAPTCHA render notice:', err);
        return false;
      }
    };

    // 1. Ensure the script tag exists
    const SCRIPT_ID = 'google-recaptcha-v2-api';
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // 2. Try rendering immediately, or poll until grecaptcha is ready
    if (!renderWidget()) {
      intervalId = setInterval(() => {
        const success = renderWidget();
        if (success && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 250);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [theme]);

  return (
    <div className="w-full flex flex-col items-start justify-start my-2">
      <div
        ref={containerRef}
        className="min-h-[78px] flex items-center"
      />
    </div>
  );
});

export default ReCaptcha;
