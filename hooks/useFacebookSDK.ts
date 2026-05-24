'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB?: {
      init: (params: {
        appId: string;
        autoLogAppEvents?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: FBLoginResponse) => void,
        params?: Record<string, unknown>,
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

export interface FBLoginResponse {
  status?: string;
  authResponse?: {
    accessToken?: string;
    code?: string;
    userID?: string;
  } | null;
}

interface UseFacebookSDKState {
  ready: boolean;
  error: string | null;
}

const SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js';
let sdkPromise: Promise<void> | null = null;

function loadSdk(appId: string, version: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Facebook SDK requires a browser'));
  }
  if (window.FB) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    window.fbAsyncInit = function () {
      window.FB?.init({
        appId,
        autoLogAppEvents: true,
        xfbml: false,
        version,
      });
      resolve();
    };

    const existing = document.getElementById('facebook-jssdk') as HTMLScriptElement | null;
    if (existing) return;

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = SDK_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => reject(new Error('Failed to load Facebook SDK'));
    document.body.appendChild(script);
  });

  return sdkPromise;
}

export function useFacebookSDK(): UseFacebookSDKState {
  const [state, setState] = useState<UseFacebookSDKState>({
    ready: false,
    error: null,
  });

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const version = process.env.NEXT_PUBLIC_META_GRAPH_VERSION || 'v21.0';

    if (!appId) {
      setState({ ready: false, error: 'NEXT_PUBLIC_FACEBOOK_APP_ID is not configured' });
      return;
    }

    let cancelled = false;
    loadSdk(appId, version)
      .then(() => {
        if (!cancelled) setState({ ready: true, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ ready: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
