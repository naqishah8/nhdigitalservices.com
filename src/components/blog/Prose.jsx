import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Minimal inline formatter for post body text. Supports **bold** and
// [label](/href) only — deliberately not a full markdown parser, because the
// content lives in src/data/posts.js and we control exactly what goes in it.
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function renderInline(text) {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      // Internal links go through next/link so they client-navigate and get
      // prefetched; external ones get the usual rel hardening.
      if (href.startsWith('/')) {
        return (
          <Link key={i} href={href}>
            {label}
          </Link>
        );
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }

    return part;
  });
}

// Stable heading id so section headings are linkable and show up as jump-to
// targets in search results.
export function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function Prose({ blocks }) {
  return (
    <div className="post-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} id={headingId(block.text)}>
                {renderInline(block.text)}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} id={headingId(block.text)}>
                {renderInline(block.text)}
              </h3>
            );

          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );

          case 'quote':
            return (
              <blockquote key={i} className="post-quote">
                {renderInline(block.text)}
              </blockquote>
            );

          case 'table':
            return (
              <div key={i} className="post-table-wrap">
                <table className="post-table">
                  <thead>
                    <tr>
                      {block.head.map((cell, j) => (
                        <th key={j}>{renderInline(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'cta':
            return (
              <aside key={i} className="post-cta">
                <p>{renderInline(block.text)}</p>
                <Link href={block.href} className="post-cta-link">
                  {block.label}
                  <ArrowRight size={16} />
                </Link>
              </aside>
            );

          case 'p':
          default:
            return <p key={i}>{renderInline(block.text)}</p>;
        }
      })}
    </div>
  );
}
