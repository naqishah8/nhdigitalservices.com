// Blog content — single source of truth for /blog and /blog/[slug].
//
// Posts are plain data (not MDX) for the same reason services.js is: everything
// stays server-rendered with zero extra dependencies, and the same objects feed
// the page, the metadata, the JSON-LD, the sitemap, and llms-full.txt.
//
// `body` is an array of blocks. Supported types:
//   { type: 'p',  text }                 paragraph
//   { type: 'h2' | 'h3', text }          section heading
//   { type: 'ul' | 'ol', items: [] }     list
//   { type: 'quote', text }              pull quote
//   { type: 'table', head: [], rows: [] } comparison table
//   { type: 'cta',  text, href, label }  inline call to action
//
// Inside any `text` or list item you can use **bold** and [label](/href).
// See renderInline() in src/components/blog/Prose.jsx.

export const posts = {
  'how-much-does-a-website-cost': {
    slug: 'how-much-does-a-website-cost',
    title: 'How Much Does a Website Cost in 2026?',
    headline: 'How Much Does a Website Cost in 2026? A Straight Answer',
    description:
      'Real 2026 price ranges for business websites in the US — DIY builders, freelancers, agencies, and custom builds — plus what actually drives the number up or down.',
    excerpt:
      'Nobody wants the "it depends" answer. Here are the actual ranges US businesses pay in 2026, what sits inside each tier, and the four variables that move the price more than anything else.',
    date: '2026-07-14',
    updated: '2026-08-12',
    readingTime: 9,
    category: 'Pricing',
    tags: ['website cost', 'web design pricing', 'small business website', 'web development'],
    relatedServices: ['web-development', 'graphic-design'],
    body: [
      {
        type: 'p',
        text: 'Ask ten agencies what a website costs and you will get ten versions of "it depends." That is technically true and completely useless when you are trying to budget. So here are real numbers, what you actually get at each level, and the handful of variables that move the price more than everything else combined.',
      },
      {
        type: 'p',
        text: 'These are US market rates as of 2026, based on what businesses are actually quoted — not aspirational rate cards.',
      },

      { type: 'h2', text: 'The short version' },
      {
        type: 'table',
        head: ['Route', 'Typical cost', 'Best for'],
        rows: [
          ['DIY builder (Wix, Squarespace)', '$200 – $800 / year', 'Pre-revenue, validating an idea'],
          ['Template + freelancer', '$1,500 – $6,000 one-off', 'Small local business, brochure site'],
          ['Custom design & build (studio)', '$8,000 – $30,000', 'Businesses where the site drives revenue'],
          ['Agency retainer / large build', '$30,000 – $150,000+', 'Multi-location, complex integrations'],
          ['E-commerce (custom)', '$12,000 – $60,000', 'Real catalogue, real checkout, real volume'],
        ],
      },
      {
        type: 'p',
        text: 'Most small-to-mid US businesses who want a site that genuinely performs land somewhere between **$8,000 and $25,000**. Below that you are usually buying a template with your logo on it. Above that you are usually paying for account managers rather than better work.',
      },

      { type: 'h2', text: 'What sits inside each tier' },

      { type: 'h3', text: 'DIY builders — $200 to $800 a year' },
      {
        type: 'p',
        text: 'Wix, Squarespace, and the like. You get hosting, a domain, a drag-and-drop editor, and a template someone else is also using. This is genuinely the right answer if you are pre-revenue and need something on the internet this week.',
      },
      {
        type: 'p',
        text: 'The trade-offs are real though: page speed on these platforms is usually mediocre because you inherit the platform\'s bloat, you cannot meaningfully control technical SEO, and you will hit a wall the moment you need something the editor does not offer. Plan on rebuilding within two years if the business grows.',
      },

      { type: 'h3', text: 'Template plus freelancer — $1,500 to $6,000' },
      {
        type: 'p',
        text: 'A freelancer buys a premium theme, swaps in your content and brand, and hands it over. For a five-page brochure site for a local service business, this is often perfectly adequate and honestly good value.',
      },
      {
        type: 'p',
        text: 'What you are not getting: original design, conversion strategy, performance engineering, or anyone to call in eight months when it breaks. Ask directly whether the price includes ongoing maintenance — it usually does not.',
      },

      { type: 'h3', text: 'Custom design and build — $8,000 to $30,000' },
      {
        type: 'p',
        text: 'This is where a site stops being a brochure and starts being infrastructure. You get original design work, a build on a modern framework, real performance budgets, structured data, analytics that answer business questions, and a content model you can actually maintain.',
      },
      {
        type: 'p',
        text: 'The reason it costs what it does is not the code — it is the discovery, the design iterations, the QA across devices, and the accumulated judgement about what makes people fill in a form. A well-built site at this tier should pay for itself through leads within the first year, which is the only ROI argument that matters.',
      },
      {
        type: 'cta',
        text: 'This is the tier we build in.',
        href: '/services/web-development',
        label: 'See what our web development includes',
      },

      { type: 'h3', text: 'Agency retainers and large builds — $30,000 and up' },
      {
        type: 'p',
        text: 'Justified when you have genuine complexity: multi-location content, ERP or CRM integrations, multilingual requirements, strict compliance, or a content team that needs sophisticated publishing workflows. Not justified when you just want a nicer homepage. A meaningful share of a large agency invoice pays for project managers and account directors, not designers and engineers.',
      },

      { type: 'h2', text: 'The four things that actually move the price' },
      {
        type: 'p',
        text: 'Page count matters far less than people assume. These are what genuinely change the number:',
      },
      {
        type: 'ol',
        items: [
          '**Custom design versus template.** Original design is typically 30–40% of a custom build. It is also the single biggest driver of whether the site feels credible in the first three seconds.',
          '**Integrations.** Every external system — payment processing, booking, CRM, inventory, shipping rates — adds build and testing time. Two integrations is routine. Six is a different project.',
          '**Content.** If you supply finished copy and photography, you save real money. If someone has to write and source it, add $2,000–$8,000. Most delays on web projects are content delays, not build delays.',
          '**Ongoing versus one-off.** A one-off build ends at launch. Sites that keep performing get maintenance, monitoring, and iteration — usually $200–$1,500 a month depending on scope.',
        ],
      },

      { type: 'h2', text: 'The costs people forget to budget' },
      {
        type: 'ul',
        items: [
          '**Domain** — $10–$60 a year, more if you buy from a squatter.',
          '**Hosting** — $0–$50 a month for most business sites on modern platforms; more if you need dedicated infrastructure.',
          '**SSL certificate** — free via Let\'s Encrypt on any competent setup. If someone bills you for basic SSL, ask why.',
          '**Email** — $6–$18 per user per month for Google Workspace or Microsoft 365, or self-hosted if you have the appetite.',
          '**Maintenance** — dependency updates, security patches, backups. Skipping this is how sites get compromised.',
          '**SEO and content** — the site is the platform; ranking is a separate, ongoing effort. See [why your site might not be ranking](/blog/why-your-website-isnt-ranking-on-google).',
        ],
      },

      { type: 'h2', text: 'How to compare quotes without getting burned' },
      {
        type: 'p',
        text: 'When two quotes differ by 3x, they are almost never quoting the same work. Ask every candidate the same five questions and the differences become obvious:',
      },
      {
        type: 'ol',
        items: [
          'Is the design original, or a customised template? Ask to see the template if it is one.',
          'Who owns the code and the accounts at the end? The answer should be "you," in writing.',
          'What are the target Core Web Vitals, and will you show me the Lighthouse report before launch?',
          'What exactly happens after launch, and what does it cost?',
          'Can I see two sites you built that have been live for over a year — and how are they performing?',
        ],
      },
      {
        type: 'quote',
        text: 'The cheapest website is almost always the one you pay for twice.',
      },
      {
        type: 'p',
        text: 'The genuine risk at the low end is not that you waste $2,000. It is that you spend eight months finding out the site does not generate business, then pay again to do it properly — having lost the eight months.',
      },

      { type: 'h2', text: 'So what should you actually budget?' },
      {
        type: 'p',
        text: 'If the website is a formality — a place to point people who already found you — spend the minimum and move on. If the website is how customers find you, evaluate you, and decide whether to call, then it is a revenue asset and should be budgeted like one. For most US small and mid-sized businesses in that second category, $10,000–$20,000 buys a site that competes properly, plus a maintenance arrangement that keeps it that way.',
      },
      {
        type: 'cta',
        text: 'Want a real number for your specific project?',
        href: '/#contact',
        label: 'Tell us what you need',
      },
    ],
    faqs: [
      {
        q: 'How much does a small business website cost in 2026?',
        a: 'Most US small businesses pay between $1,500 and $6,000 for a template-based brochure site, or $8,000 to $25,000 for a custom-designed and built site. DIY platforms like Wix or Squarespace run $200 to $800 per year but limit performance and technical SEO.',
      },
      {
        q: 'Is it cheaper to build a website yourself?',
        a: 'Upfront, yes — a DIY builder costs a few hundred dollars a year. But you pay in time, and DIY sites typically underperform on page speed, technical SEO, and conversion. If the website is a meaningful source of leads, the professional build usually pays for itself within a year.',
      },
      {
        q: 'What are the ongoing costs of a website?',
        a: 'Budget for domain renewal ($10–$60/year), hosting ($0–$50/month for most business sites), email ($6–$18 per user per month), and maintenance covering dependency updates, security patches, and backups ($200–$1,500/month depending on scope). SEO and content are separate ongoing investments.',
      },
      {
        q: 'Why do website quotes vary so much?',
        a: 'Because they are rarely quoting the same work. The biggest differences are custom design versus a customised template, the number of third-party integrations, whether content and photography are included, and whether anything happens after launch. Ask each candidate the same specific questions and the gap usually explains itself.',
      },
    ],
  },

  'nextjs-vs-wordpress': {
    slug: 'nextjs-vs-wordpress',
    title: 'Next.js vs WordPress for Business Websites',
    headline: 'Next.js vs WordPress: Which Should Your Business Use in 2026?',
    description:
      'An honest comparison of Next.js and WordPress for business websites in 2026 — performance, SEO, security, editing experience, and total cost of ownership.',
    excerpt:
      'WordPress runs a huge share of the web and Next.js powers a growing share of the fast part of it. Neither is universally correct. Here is how to tell which one your business actually needs.',
    date: '2026-07-28',
    updated: '2026-08-12',
    readingTime: 10,
    category: 'Technology',
    tags: ['Next.js', 'WordPress', 'web development', 'headless CMS', 'Core Web Vitals'],
    relatedServices: ['web-development', 'seo-optimization'],
    body: [
      {
        type: 'p',
        text: 'WordPress powers a very large share of the web. Next.js powers a growing share of the fast part of it. Both are good tools and the honest answer to "which is better" is that they solve overlapping but genuinely different problems.',
      },
      {
        type: 'p',
        text: 'Here is the comparison without the vendor bias, and a clear decision rule at the end.',
      },

      { type: 'h2', text: 'The fundamental difference' },
      {
        type: 'p',
        text: '**WordPress** is a CMS that also renders your site. One system stores content, applies a theme, runs plugins, and produces HTML on every request. Everything is coupled, which is exactly what makes it fast to set up and awkward to optimise.',
      },
      {
        type: 'p',
        text: '**Next.js** is a React framework that builds your site — usually pulling content from wherever you keep it. Rendering is decoupled from content storage. That is more architecture upfront and dramatically more control afterwards.',
      },

      { type: 'h2', text: 'Head to head' },
      {
        type: 'table',
        head: ['', 'WordPress', 'Next.js'],
        rows: [
          ['Setup speed', 'Hours', 'Days to weeks'],
          ['Page speed ceiling', 'Moderate — plugin-dependent', 'Excellent — sub-second is normal'],
          ['Non-technical editing', 'Excellent out of the box', 'Needs a CMS wired in'],
          ['Security surface', 'Large — plugins are the usual vector', 'Small — no plugin ecosystem to exploit'],
          ['Hosting cost', '$10–$100/mo', '$0–$50/mo typical'],
          ['Maintenance burden', 'Constant plugin/core updates', 'Periodic dependency updates'],
          ['Design flexibility', 'Bounded by theme and page builder', 'Effectively unlimited'],
          ['Upfront cost', 'Lower', 'Higher'],
        ],
      },

      { type: 'h2', text: 'Performance and Core Web Vitals' },
      {
        type: 'p',
        text: 'This is where the gap is widest, and it matters because Core Web Vitals are a genuine ranking input and a very real conversion input.',
      },
      {
        type: 'p',
        text: 'A typical WordPress business site loads the theme\'s CSS and JavaScript, then each active plugin\'s assets, then usually a page builder\'s runtime on top. It is common to see fifteen or more plugins each adding their own requests. You can optimise this with caching layers and a CDN and get to a decent place — but you are optimising against the architecture rather than with it.',
      },
      {
        type: 'p',
        text: 'Next.js renders pages ahead of time where it can, ships only the JavaScript a given page needs, and handles image optimisation and font loading as first-class concerns. Sub-second loads are the normal outcome rather than the result of a tuning project.',
      },
      {
        type: 'quote',
        text: 'On WordPress, speed is something you fight for. On Next.js, speed is the default you have to work to lose.',
      },

      { type: 'h2', text: 'SEO' },
      {
        type: 'p',
        text: 'Both can rank extremely well, and the crawler does not award points for your framework. But the levers differ.',
      },
      {
        type: 'p',
        text: 'WordPress gives you Yoast or Rank Math, which make on-page basics genuinely easy for non-technical editors — titles, descriptions, and readable sitemaps without touching code. That is a real advantage for content teams.',
      },
      {
        type: 'p',
        text: 'Next.js gives you programmatic control over every piece of metadata, structured data, and canonical logic. You write the rules once and every page follows them, which scales far better than remembering to fill in a field. It also removes an entire category of plugin-generated SEO conflicts.',
      },
      {
        type: 'p',
        text: 'If your problem is that nobody can find you, note that the framework is rarely the cause — see [the actual reasons sites do not rank](/blog/why-your-website-isnt-ranking-on-google).',
      },

      { type: 'h2', text: 'Security' },
      {
        type: 'p',
        text: 'WordPress\'s core is well maintained. The vulnerability surface is overwhelmingly plugins — abandoned ones, poorly written ones, and ones nobody updated. Because WordPress is so widely deployed, it is also continuously scanned by automated attacks. If you run WordPress, you are signing up for disciplined update hygiene indefinitely.',
      },
      {
        type: 'p',
        text: 'A Next.js site with no admin panel and no plugin system has far less to attack. There is still dependency management to do, and any authenticated area you build needs proper attention — but the baseline exposure is much smaller.',
      },

      { type: 'h2', text: 'Content editing' },
      {
        type: 'p',
        text: 'This is WordPress\'s strongest argument and it deserves full credit. If you have a marketing team publishing several times a week, WordPress hands them a mature editor, a media library, revisions, scheduling, and roles — all working on day one.',
      },
      {
        type: 'p',
        text: 'Next.js has no opinion about content editing, so you attach a headless CMS — Sanity, Contentful, Payload, or WordPress itself running purely as an API. Modern headless editors are genuinely good, but that is another system to choose, configure, and pay for. For a site that changes a few times a year, it is overhead you do not need.',
      },

      { type: 'h2', text: 'Total cost of ownership' },
      {
        type: 'p',
        text: 'WordPress is cheaper to start. Over three to five years the picture often converges, because WordPress accumulates premium plugin licences, higher-tier hosting to stay fast, ongoing update labour, and occasionally an incident. Next.js front-loads the cost and then tends to sit quietly. Neither is universally cheaper — it depends entirely on how much the site changes and how much traffic it takes.',
      },
      {
        type: 'p',
        text: 'For the full breakdown of what either route costs to build, see [our 2026 website pricing guide](/blog/how-much-does-a-website-cost).',
      },

      { type: 'h2', text: 'The decision rule' },
      { type: 'h3', text: 'Choose WordPress if' },
      {
        type: 'ul',
        items: [
          'Non-technical staff publish content weekly or more.',
          'You need a specific mature plugin ecosystem — membership, LMS, complex forms — and building it is not worth it.',
          'Budget is the binding constraint and speed to launch matters more than page speed.',
          'You already have a team that knows WordPress well.',
        ],
      },
      { type: 'h3', text: 'Choose Next.js if' },
      {
        type: 'ul',
        items: [
          'Page speed and Core Web Vitals materially affect your revenue.',
          'You want a design that does not look like a theme.',
          'The site has to integrate with your own APIs, dashboards, or internal tools.',
          'You want a small security surface and low ongoing maintenance noise.',
          'You are planning for scale rather than for launch day.',
        ],
      },
      {
        type: 'p',
        text: 'And the pragmatic middle option: run **WordPress headless** — keep the familiar editor, render the front end in Next.js. You get the editorial experience and the performance, at the cost of maintaining two systems. For content-heavy businesses that also care about speed, it is frequently the right call.',
      },
      {
        type: 'cta',
        text: 'Not sure which fits your business?',
        href: '/#contact',
        label: 'Talk it through with us',
      },
    ],
    faqs: [
      {
        q: 'Is Next.js better than WordPress for SEO?',
        a: 'Both can rank well. Next.js gives programmatic control over metadata, structured data, and canonicals, and makes excellent Core Web Vitals the default — which is a genuine ranking input. WordPress makes on-page SEO easier for non-technical editors through plugins like Yoast. The framework is rarely the reason a site does or does not rank.',
      },
      {
        q: 'Can you edit a Next.js website without a developer?',
        a: 'Yes, if a headless CMS is connected — Sanity, Contentful, Payload, or WordPress running as an API. Next.js has no built-in editor, so content editing is a deliberate architectural choice rather than something you get for free.',
      },
      {
        q: 'Is Next.js more expensive than WordPress?',
        a: 'Usually higher upfront, often lower over time. WordPress accumulates premium plugin licences, higher-tier hosting to stay fast, and continuous update labour. Next.js front-loads build cost and then has lower ongoing maintenance and hosting costs.',
      },
      {
        q: 'Can I use WordPress and Next.js together?',
        a: 'Yes — this is called headless WordPress. WordPress stores content and exposes it via its REST or GraphQL API, while Next.js renders the front end. You keep the familiar editing experience and gain the performance, at the cost of maintaining two systems.',
      },
    ],
  },

  'why-your-website-isnt-ranking-on-google': {
    slug: 'why-your-website-isnt-ranking-on-google',
    title: "Why Your Website Isn't Ranking on Google",
    headline: "Why Your Website Isn't Ranking on Google (And How to Fix It)",
    description:
      'The real reasons business websites fail to rank in 2026 — from indexing problems and thin content to missing search intent — with a diagnostic you can run yourself today.',
    excerpt:
      'Before you buy more SEO, find out which problem you actually have. Nine common causes, in the order worth checking, with the exact test for each.',
    date: '2026-08-08',
    updated: '2026-08-12',
    readingTime: 11,
    category: 'SEO',
    tags: ['SEO', 'Google ranking', 'technical SEO', 'search console', 'content strategy'],
    relatedServices: ['seo-optimization', 'web-development'],
    body: [
      {
        type: 'p',
        text: 'You built the site. It looks good. Months later it still gets no search traffic. Before you buy more SEO, work out which problem you actually have — because the fixes are completely different and most businesses treat the wrong one.',
      },
      {
        type: 'p',
        text: 'Here are the nine real causes, ordered by how worth checking they are, each with the specific test.',
      },

      { type: 'h2', text: '1. Google has not indexed you yet' },
      {
        type: 'p',
        text: '**The test:** search `site:yourdomain.com` in Google. If it returns nothing, ranking is not your problem — indexing is.',
      },
      {
        type: 'p',
        text: 'A brand-new domain typically takes days to weeks before pages start appearing, and longer before they rank for anything competitive. This is normal and no amount of optimisation shortcuts it.',
      },
      {
        type: 'p',
        text: '**The fix:** verify the domain in Google Search Console, submit your sitemap.xml, then use URL Inspection to request indexing on your most important pages. That queues a priority crawl, usually processed within a day. You can request roughly ten URLs per day before hitting rate limits.',
      },

      { type: 'h2', text: '2. You are accidentally blocking crawlers' },
      {
        type: 'p',
        text: '**The test:** open `yourdomain.com/robots.txt` and view the page source for `<meta name="robots">`. If you see `Disallow: /` or `noindex`, you are telling Google to stay out.',
      },
      {
        type: 'p',
        text: 'This happens more often than anyone admits — a staging-site setting that shipped to production. It is the single most expensive one-line mistake in web development, and it is invisible unless you look.',
      },

      { type: 'h2', text: '3. You are targeting keywords you cannot win' },
      {
        type: 'p',
        text: 'A new site chasing "web design" is competing against domains with twenty years of authority and thousands of backlinks. You will not win that this year, and possibly ever.',
      },
      {
        type: 'p',
        text: '**The fix:** go long-tail and specific. Not "web design" but "Shopify site for a wholesale distributor." Lower volume, dramatically lower competition, and far higher buyer intent — the person searching that is much closer to spending money. Win narrow terms first, build authority, then widen.',
      },
      {
        type: 'quote',
        text: 'Ranking first for a term ten people search is worth more than ranking fortieth for a term ten thousand people search.',
      },

      { type: 'h2', text: '4. Your content does not match search intent' },
      {
        type: 'p',
        text: 'Google is matching intent, not keywords. If people searching your target term want a comparison and you published a sales page, you will not rank however well optimised that page is.',
      },
      {
        type: 'p',
        text: '**The test:** search your target keyword and look at what is actually ranking. All listicles? Google has decided that query wants a listicle. All product pages? It wants product pages. Match the format that is already winning.',
      },

      { type: 'h2', text: '5. You have thin content' },
      {
        type: 'p',
        text: 'Five pages of 200 words each gives Google very little to work with and almost nothing to rank. Sites that rank consistently have depth — they cover their subject thoroughly enough that the site is obviously the work of someone who knows the field.',
      },
      {
        type: 'p',
        text: '**The fix:** genuinely useful long-form content answering the questions your customers ask before they buy. Not word count for its own sake — completeness. If someone reads your page and still has to search again, the page did not do its job.',
      },
      {
        type: 'cta',
        text: 'Content depth is the slowest fix and the one that compounds.',
        href: '/services/seo-optimization',
        label: 'See how we approach SEO',
      },

      { type: 'h2', text: '6. Your site is too slow' },
      {
        type: 'p',
        text: 'Core Web Vitals are a ranking signal, and more importantly a conversion signal. If your Largest Contentful Paint is over 2.5 seconds you are losing both rankings and visitors — and mobile visitors first.',
      },
      {
        type: 'p',
        text: '**The test:** run your homepage through PageSpeed Insights and read the mobile score, not the desktop one. Most business sites look fine on desktop and fall apart on a mid-range phone on a real network.',
      },
      {
        type: 'p',
        text: 'Common culprits: unoptimised hero images, render-blocking scripts, too many third-party tags, and plugin bloat. If your platform makes these hard to fix, the platform is part of the problem — see [Next.js vs WordPress](/blog/nextjs-vs-wordpress).',
      },

      { type: 'h2', text: '7. Nobody links to you' },
      {
        type: 'p',
        text: 'Backlinks remain one of the strongest ranking factors. A brand-new domain with zero inbound links has essentially no authority, and authority is what lets you compete for anything worthwhile.',
      },
      {
        type: 'p',
        text: '**The fix, in order of effort:** claim your business directory listings, get listed in any industry association or supplier directory you legitimately belong to, ask happy clients for a link from their site, and publish something genuinely worth citing. Do not buy links — Google is very good at detecting purchased link patterns and the penalty is worse than the problem.',
      },

      { type: 'h2', text: '8. Your structured data is missing or broken' },
      {
        type: 'p',
        text: 'Schema markup does not directly boost rankings, but it determines whether you get rich results — FAQ dropdowns, review stars, breadcrumbs — and those substantially change click-through rate on the same position.',
      },
      {
        type: 'p',
        text: '**The test:** run your key pages through Google\'s Rich Results Test. Broken schema is common and silent; you will never notice it from the front end.',
      },

      { type: 'h2', text: '9. You have not given it enough time' },
      {
        type: 'p',
        text: 'SEO on a new domain is measured in months. A realistic timeline: brand-name queries within two to four weeks of indexing, long-tail terms in three to six months, competitive commercial terms in six to eighteen months with sustained effort.',
      },
      {
        type: 'p',
        text: 'If you are eight weeks in and not ranking for competitive terms, nothing is wrong. Anyone promising first-page results in thirty days is either targeting terms nobody searches or is about to do something that gets you penalised.',
      },

      { type: 'h2', text: 'The diagnostic, in order' },
      {
        type: 'ol',
        items: [
          'Search `site:yourdomain.com` — indexed at all?',
          'Check robots.txt and the robots meta tag — blocking anything?',
          'Open Search Console coverage — any errors or excluded pages?',
          'PageSpeed Insights on mobile — LCP under 2.5s?',
          'Search your target keyword — does your content format match what ranks?',
          'Count your substantive pages — is there enough there to rank?',
          'Check your backlinks — does anyone link to you at all?',
          'Rich Results Test — is your structured data valid?',
          'Count the weeks since launch — is the expectation realistic?',
        ],
      },
      {
        type: 'p',
        text: 'Nine times out of ten the answer is in the first three or the last one. Fix indexing and crawlability first — they are fast, free, and everything else depends on them. Content depth and backlinks are the slow work that actually compounds.',
      },
      {
        type: 'cta',
        text: 'Want us to run this audit on your site?',
        href: '/#contact',
        label: 'Request an SEO audit',
      },
    ],
    faqs: [
      {
        q: 'How long does it take for a new website to rank on Google?',
        a: 'Expect brand-name queries to rank within two to four weeks of indexing, long-tail keywords within three to six months, and competitive commercial terms within six to eighteen months with sustained effort. Indexing itself usually takes days to weeks for a new domain.',
      },
      {
        q: 'Why is my website not showing up on Google at all?',
        a: 'Search site:yourdomain.com first. If nothing appears, the site is not indexed — either it is too new, or something is blocking crawlers such as a Disallow rule in robots.txt or a leftover noindex meta tag from staging. Verify the domain in Search Console, submit your sitemap, and request indexing on key pages.',
      },
      {
        q: 'Does page speed affect Google rankings?',
        a: 'Yes. Core Web Vitals are a confirmed ranking signal, and page speed also strongly affects conversion. Test on mobile rather than desktop and aim for a Largest Contentful Paint under 2.5 seconds.',
      },
      {
        q: 'How many backlinks do I need to rank?',
        a: 'There is no fixed number — it depends entirely on how competitive your target terms are. A new domain with zero backlinks has effectively no authority. Start with legitimate directory and industry listings, links from client sites, and content worth citing. Never buy links.',
      },
    ],
  },
};

export const postsList = Object.values(posts).sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export const postSlugs = Object.keys(posts);

export function getPost(slug) {
  return posts[slug] || null;
}

// Newest posts other than `slug` — used for the "keep reading" block.
export function getRelatedPosts(slug, limit = 2) {
  return postsList.filter((p) => p.slug !== slug).slice(0, limit);
}

export function formatPostDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
