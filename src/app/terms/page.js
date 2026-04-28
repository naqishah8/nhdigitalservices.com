import { COMPANY } from '@/data/company';

export const metadata = {
  title: 'Terms of Service',
  description: `The terms that govern use of the ${COMPANY.brand} website, AI assistant, and related services.`,
  alternates: { canonical: '/terms' },
};

export default function TermsOfServicePage() {
  const updated = 'April 28, 2026';
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <header className="legal-head">
          <span className="eyebrow">Legal</span>
          <h1>Terms of Service</h1>
          <p className="updated">Last updated: {updated}</p>
        </header>

        <section>
          <h2>Agreement</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{' '}
            <strong>{COMPANY.brand}</strong> website, AI assistant (&ldquo;Nova&rdquo;), and any
            related services operated by <strong>{COMPANY.legalName}</strong>{' '}
            (&ldquo;{COMPANY.shortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            By using this website you agree to these Terms. If you don&rsquo;t agree, please don&rsquo;t
            use the site.
          </p>
        </section>

        <section>
          <h2>Who can use the site</h2>
          <p>
            You must be at least 13 years old to use this website. If you&rsquo;re using it on
            behalf of an organization, you represent that you have the authority to bind that
            organization to these Terms.
          </p>
        </section>

        <section>
          <h2>Services and proposals</h2>
          <p>
            Information on this website about our services, timelines, and pricing is provided
            for general guidance. Any specific engagement &mdash; web development, design, SEO,
            social media, app development, or logistics work &mdash; is governed by a separate
            written proposal or statement of work signed by both parties. Nothing on this site
            is itself a binding offer to provide services.
          </p>
        </section>

        <section>
          <h2>AI assistant (Nova)</h2>
          <ul>
            <li>
              Nova generates responses using a third-party language model (Google Gemini) and
              may produce information that is incomplete, outdated, or incorrect. Always verify
              anything important with a human team member at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </li>
            <li>
              Nova is provided for informational purposes about our services. Do not submit
              confidential, sensitive, or personal information you wouldn&rsquo;t put in a normal
              email.
            </li>
            <li>
              Don&rsquo;t use Nova to generate unlawful, harmful, infringing, or deceptive content,
              to attempt to extract proprietary prompts or system instructions, or to probe the
              service for vulnerabilities outside a coordinated disclosure process.
            </li>
          </ul>
        </section>

        <section>
          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site or any of our services in violation of applicable law.</li>
            <li>
              Interfere with, disrupt, or attempt to gain unauthorized access to the site,
              servers, or networks (including by scraping, rate abuse, or denial-of-service).
            </li>
            <li>
              Reverse-engineer, decompile, or attempt to extract source code from the site or
              its underlying services, except where that right cannot be lawfully restricted.
            </li>
            <li>
              Submit false information through the contact form, or impersonate another person
              or organization.
            </li>
          </ul>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            The site, its design, logos, copy, code, and graphics are owned by{' '}
            {COMPANY.legalName} or its licensors and are protected by copyright, trademark,
            and other laws. You may view and share the site for personal, non-commercial
            purposes. You may not copy, redistribute, or create derivative works from our
            content without prior written permission.
          </p>
        </section>

        <section>
          <h2>Your submissions</h2>
          <p>
            When you send us a contact form message, chat with Nova, or otherwise submit
            content through the site, you grant {COMPANY.shortName} a non-exclusive,
            worldwide, royalty-free license to use that content for the purpose of responding
            to you, operating the site, and improving our services. You confirm that you have
            the right to submit the content and that it doesn&rsquo;t infringe anyone else&rsquo;s rights.
          </p>
        </section>

        <section>
          <h2>Third-party links and services</h2>
          <p>
            The site may link to third-party websites or rely on third-party providers (e.g.
            hosting, DNS, the AI model API, mail delivery). We don&rsquo;t control those services
            and aren&rsquo;t responsible for their content, availability, or practices. Your use of
            them is governed by their own terms.
          </p>
        </section>

        <section>
          <h2>Disclaimers</h2>
          <p>
            The site and the AI assistant are provided <strong>&ldquo;as is&rdquo;</strong> and{' '}
            <strong>&ldquo;as available&rdquo;</strong>, without warranties of any kind, whether
            express, implied, or statutory, including warranties of merchantability, fitness
            for a particular purpose, non-infringement, accuracy, or uninterrupted availability.
            We don&rsquo;t warrant that the site will be free of errors or that any content,
            including Nova&rsquo;s responses, will be accurate or reliable.
          </p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {COMPANY.legalName} and its officers,
            employees, and contractors will not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or for any lost profits, revenues,
            data, or goodwill, arising from or related to your use of the site or AI assistant,
            even if we&rsquo;ve been advised of the possibility of such damages. Some
            jurisdictions don&rsquo;t allow these limitations, so they may not apply to you.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {COMPANY.legalName} from any claims,
            losses, or expenses (including reasonable attorneys&rsquo; fees) arising out of your
            misuse of the site, your violation of these Terms, or your violation of any third
            party&rsquo;s rights.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We may suspend or terminate your access to the site at any time, with or without
            notice, if we believe you&rsquo;ve violated these Terms or to protect the security or
            integrity of the service. Sections that by their nature should survive termination
            (intellectual property, disclaimers, limitation of liability, indemnification,
            governing law) will survive.
          </p>
        </section>

        <section>
          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, USA, without regard to
            its conflict-of-laws principles. You agree that any dispute arising from these
            Terms or your use of the site will be brought exclusively in the state or federal
            courts located in Travis County, Texas, and you consent to the personal
            jurisdiction of those courts.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may update these Terms from time to time. Material changes will be posted on
            this page and the &ldquo;Last updated&rdquo; date at the top will change. Continued use of
            the site after changes take effect means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these Terms? Email{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
