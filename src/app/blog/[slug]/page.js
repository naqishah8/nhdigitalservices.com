import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { COMPANY } from '@/data/company';
import { services } from '@/data/services';
import { getPost, getRelatedPosts, postSlugs, formatPostDate } from '@/data/posts';
import Prose from '@/components/blog/Prose';

// The post set is fixed at build time — any other slug should 404 rather than
// render an empty page, so search engines never index a phantom URL.
export const dynamicParams = false;

export async function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const canonical = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    keywords: [...post.tags, COMPANY.brand],
    authors: [{ name: COMPANY.brand, url: COMPANY.url }],
    openGraph: {
      type: 'article',
      url: `${COMPANY.url}${canonical}`,
      title: `${post.headline} | ${COMPANY.brand}`,
      description: post.description,
      siteName: COMPANY.brand,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [COMPANY.url],
      tags: post.tags,
      images: [{ url: COMPANY.ogImage, alt: post.headline }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.headline} | ${COMPANY.brand}`,
      description: post.description,
      images: [COMPANY.ogImage],
    },
  };
}

function buildPostSchema(post) {
  const canonical = `${COMPANY.url}/blog/${post.slug}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#post`,
    headline: post.headline,
    description: post.description,
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@id': `${COMPANY.url}#organization` },
    publisher: { '@id': `${COMPANY.url}#organization` },
    image: `${COMPANY.url}${COMPANY.ogImage}`,
    inLanguage: 'en-US',
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.body.reduce((total, block) => {
      const text = block.items ? block.items.join(' ') : block.text || '';
      return total + text.split(/\s+/).filter(Boolean).length;
    }, 0),
  };

  const faq = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: COMPANY.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${COMPANY.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  return [article, faq, breadcrumb].filter(Boolean);
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const schemas = buildPostSchema(post);
  const related = getRelatedPosts(post.slug);
  const linkedServices = (post.relatedServices || [])
    .map((s) => services[s])
    .filter(Boolean);

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
          <Link href="/blog" className="job-back-link">
            <ArrowLeft size={14} /> All articles
          </Link>

          <header className="legal-head" style={{ marginTop: 20 }}>
            <span className="eyebrow">{post.category}</span>
            <h1>{post.headline}</h1>
            <div className="post-meta">
              <span>
                <Calendar size={14} /> {formatPostDate(post.date)}
              </span>
              <span>
                <Clock size={14} /> {post.readingTime} min read
              </span>
              {post.updated && post.updated !== post.date && (
                <span className="post-updated">Updated {formatPostDate(post.updated)}</span>
              )}
            </div>
          </header>

          <article>
            <Prose blocks={post.body} />
          </article>

          {post.faqs?.length > 0 && (
            <section className="post-faq">
              <h2>Frequently asked questions</h2>
              {post.faqs.map((faq, i) => (
                <details key={i} className="post-faq-item">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </section>
          )}

          {linkedServices.length > 0 && (
            <section>
              <h2>Related services</h2>
              <div className="post-grid">
                {linkedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="post-card post-card-compact"
                  >
                    <div className="post-card-head">
                      <span className="post-card-tag">Service</span>
                      <ArrowRight size={18} className="post-card-arrow" />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.tagline}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h2>Keep reading</h2>
              <div className="post-grid">
                {related.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="post-card post-card-compact"
                  >
                    <div className="post-card-head">
                      <span className="post-card-tag">{other.category}</span>
                      <ArrowRight size={18} className="post-card-arrow" />
                    </div>
                    <h3>{other.headline}</h3>
                    <p>{other.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
