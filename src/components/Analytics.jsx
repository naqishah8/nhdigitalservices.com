'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_EVENT, getConsent } from './CookieConsent';

// GA4 Measurement ID. This is not a secret — Google ships it in plaintext as
// part of the gtag.js script URL (?id=G-...) so every visitor sees it in
// DevTools anyway. Hardcoding avoids needing a server-side env var on prod.
const GA_ID = 'G-XH1FN09SRG';

export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (getConsent() === 'accepted') setAllowed(true);
    const onChange = (e) => setAllowed(e.detail === 'accepted');
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
