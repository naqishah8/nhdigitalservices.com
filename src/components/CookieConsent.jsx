'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'nh-cookie-consent';
export const CONSENT_EVENT = 'nh-consent-change';

export function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const decide = (choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      aria-live="polite"
      className="cookie-card"
    >
      <div className="cookie-head">
        <span className="cookie-icon" aria-hidden="true">
          <Cookie size={18} />
        </span>
        <h2 className="cookie-title">Cookies on this site</h2>
      </div>
      <p className="cookie-desc">
        We use cookies for analytics to understand how visitors use our site and make it
        better. See our <Link href="/privacy" className="cookie-link">Privacy Policy</Link>
        {' '}for details.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn reject" onClick={() => decide('rejected')}>
          Reject
        </button>
        <button type="button" className="cookie-btn accept" onClick={() => decide('accepted')}>
          Accept
        </button>
      </div>

      <style jsx>{`
        .cookie-card {
          position: fixed;
          left: 22px;
          bottom: 22px;
          z-index: 9000;
          width: min(380px, calc(100vw - 44px));
          background: rgba(21, 27, 46, 0.97);
          color: #e7eaf3;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          padding: 18px 20px 16px;
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          animation: cookie-slide-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cookie-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .cookie-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #f5d479;
          flex-shrink: 0;
        }
        .cookie-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #fff;
        }
        .cookie-desc {
          margin: 0 0 14px;
          font-size: 0.88rem;
          line-height: 1.55;
          color: #b9bfd1;
        }
        .cookie-link {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .cookie-link:hover {
          color: #cdd3e3;
        }
        .cookie-actions {
          display: flex;
          gap: 8px;
        }
        .cookie-btn {
          flex: 1 1 0;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: transparent;
          color: #e7eaf3;
          font: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 9px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }
        .cookie-btn.reject:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.28);
        }
        .cookie-btn.accept {
          background: #fff;
          color: #151b2e;
          border-color: #fff;
        }
        .cookie-btn.accept:hover {
          background: #e7eaf3;
          border-color: #e7eaf3;
        }

        /* On phones, the AI chat launcher sits at bottom: 22px right: 22px (~42px wide).
           Stack the cookie card full-width across the bottom but raise it above the
           launcher's tap area so they don't overlap. */
        @media (max-width: 560px) {
          .cookie-card {
            left: 12px;
            right: 12px;
            bottom: 86px;
            width: auto;
            max-width: none;
          }
        }

        @keyframes cookie-slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie-card { animation: none; }
        }
      `}</style>
    </div>
  );
}
