import { useState, useRef, useEffect } from 'react';

import { useInterval } from '../util/time';

export function useGoogleAuth(cb: (response: CredentialResponse) => void) {
  const [loaded, setLoaded] = useState(false);
  const [google, setGoogle] = useState<Google>();

  const buttonRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(cb);

  const [setGoogleInterval, clearGoogleInterval] = useInterval();

  useEffect(() => {
    if (loaded) return;

    const initializeGoogle = () => {
      if (!google || loaded || !buttonRef.current) return;

      setLoaded(true);
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: callbackRef.current,
      });
      google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        shape: 'circle',
      });
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-client-script';
    script.async = true;
    script.onload = initializeGoogle;
    document.querySelector('body')?.appendChild(script);

    return () => {
      google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [loaded, google]);

  useEffect(() => {
    setGoogleInterval(() => {
      if (typeof window !== 'undefined' && window.google) {
        setGoogle(window.google);
        clearGoogleInterval();
      }
    }, 100);
  }, [setGoogleInterval, clearGoogleInterval]);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  return { buttonRef, loaded };
}
