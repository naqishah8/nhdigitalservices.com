import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { COMPANY } from '@/data/company';
import { postsList, formatPostDate } from '@/data/posts';

export const metadata = {
  title: 'Blog: Web, SEO & Design Guides',
  description: `Practical guides on web development, SEO, design, and digital strategy for US businesses — written by the ${COMPANY.brand} team.`,
  alternates: { canonical: '/blog' },
  keywords: [
    'web development blog',
    'SEO guides',
    'website cost',
    'small business website advice',
    COMPANY.brand,
  ],
  openGraph: {
    type: 'website',
    url: `${COMPANY.url}/blog`,
    title: `Blog | ${COMPANY.brand}`,
    description: `Practical guides on web development, SEO, design, and digital strategy for US businesses.`,
    siteName: COMPANY.brand,
    images: [{ url: COMPANY.ogImage, alt: COMPANY.brand }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${COMPANY.brand}`,
    description: `Practical guides on web development, SEO, design, and digital strategy for US businesses.`,
    images: [COMPANY.ogImage],
  },
};

function buildBlogSchema() {
  const canonical = `${COMPANY.url}/blog`;

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonical}#blog`,
    url: canonical,
    name: `${COMPANY.brand} Blog`,
    description:
      'Practical guides on web development, SEO, design, and digital strategy for US businesses.',
    publisher: { '@id': `${COMPANY.url}#organization` },
    inLanguage: 'en-US',
    blogPost: postsList.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${COMPANY.url}/blog/${post.slug}#post`,
      headline: post.headline,
      description: post.description,
      url: `${COMPANY.url}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author: { '@id': `${COMPANY.url}#organization` },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: COMPANY.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical },
    ],
  };

  return [blog, breadcrumb];
}

export default function BlogIndexPage() {
  const schemas = buildBlogSchema();

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="legal-page">
        <div className="legal-inner">
          <header className="legal-head">
            <span className="eyebrow">Blog</span>
            <h1>Guides worth your time</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Straight answers on what things cost, which tools are worth using, and why
              your site is or isn&rsquo;t showing up on Google. No fluff, no gated PDFs.
            </p>
          </header>

          <section>
            <div className="post-grid">
              {postsList.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                  <div className="post-card-head">
                    <span className="post-card-tag">{post.category}</span>
                    <ArrowRight size={18} className="post-card-arrow" />
                  </div>
                  <h2>{post.headline}</h2>
                  <p>{post.excerpt}</p>
                  <div className="post-card-meta">
                    <span>
                      <Calendar size={14} /> {formatPostDate(post.date)}
                    </span>
                    <span>
                      <Clock size={14} /> {post.readingTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
