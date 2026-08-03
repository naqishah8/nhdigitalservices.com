// Single source of truth for business NAP + brand — used by metadata,
// JSON-LD schemas, sitemap, footer, and the AI chat prompt.
//
// NH Digital Services is an ONLINE, NATIONWIDE service business — no physical
// storefront. We deliberately do NOT publish a street address: inventing one
// would be a fake location (bad for trust and local SEO) and it can't be
// verified. Instead we signal `serviceArea = United States` so Google and AI
// assistants understand we serve clients across the whole US remotely.

export const COMPANY = {
  legalName: 'NH International LLC',
  brand: 'NH Digital Services',
  shortName: 'NH International',
  tagline: 'Premium Web, Design, SEO & App Development',
  description:
    'NH Digital Services (NH International LLC) is a senior studio building fast, high-converting websites, brand systems, mobile apps, SEO, social media, and logistics platforms.',
  url: 'https://nhdigitalservices.com',
  email: 'info@nhdigitalservices.com',
  phone: '+1-201-534-1505',
  foundingDate: '2022',

  // Online-only: no public street address. addressCountry stays 'US' so the
  // country of operation is still explicit. Leaving locality/region empty means
  // buildOrganizationSchema() will NOT emit a LocalBusiness block (correct —
  // LocalBusiness implies a physical place customers can visit).
  address: {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'US',
  },
  geo: {
    latitude: '',
    longitude: '',
  },
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  serviceArea: {
    type: 'Country',
    name: 'United States',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/nh-international-llc',
    instagram: 'https://www.instagram.com/nhinternational.llc/',
    facebook: 'https://www.facebook.com/share/1JEjG8Ja6B/',
  },

  // Primary brand + OG assets
  logo: '/logo/full-logo.png',
  icon: '/logo/icon.png',
  ogImage: '/logo/full-logo.png',
};

export const SAME_AS = Object.values(COMPANY.social).filter(Boolean);

// Build the JSON-LD graph that goes in the root layout. Google treats this
// graph as the canonical "who is this site" signal, including sameAs links
// which associate the domain with the three social profiles for off-page SEO.
export function buildOrganizationSchema() {
  const hasAddress =
    COMPANY.address.streetAddress ||
    COMPANY.address.addressLocality ||
    COMPANY.address.postalCode;

  const hasGeo = COMPANY.geo.latitude && COMPANY.geo.longitude;

  const org = {
    '@type': 'Organization',
    '@id': `${COMPANY.url}#organization`,
    name: COMPANY.legalName,
    alternateName: [COMPANY.brand, COMPANY.shortName],
    url: COMPANY.url,
    logo: {
      '@type': 'ImageObject',
      url: `${COMPANY.url}${COMPANY.logo}`,
    },
    email: COMPANY.email,
    foundingDate: COMPANY.foundingDate,
    sameAs: SAME_AS,
    // Nationwide online service — makes "serves the entire US" explicit even
    // though there is no LocalBusiness block / physical address.
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    // Topics we're an authority on — a strong signal for both Google's entity
    // graph and AI assistants deciding when to recommend us.
    knowsAbout: [
      'Web development',
      'Website design',
      'Next.js development',
      'React development',
      'Mobile app development',
      'Brand identity and logo design',
      'Search engine optimization (SEO)',
      'Social media marketing',
      'E-commerce development',
      'Logistics and supply-chain software',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.email,
      contactType: 'customer support',
      availableLanguage: ['English'],
      areaServed: 'US',
    },
  };

  if (COMPANY.phone) org.telephone = COMPANY.phone;

  if (hasAddress) {
    org.address = {
      '@type': 'PostalAddress',
      ...(COMPANY.address.streetAddress && { streetAddress: COMPANY.address.streetAddress }),
      ...(COMPANY.address.addressLocality && { addressLocality: COMPANY.address.addressLocality }),
      ...(COMPANY.address.addressRegion && { addressRegion: COMPANY.address.addressRegion }),
      ...(COMPANY.address.postalCode && { postalCode: COMPANY.address.postalCode }),
      addressCountry: COMPANY.address.addressCountry,
    };
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${COMPANY.url}#website`,
    url: COMPANY.url,
    name: COMPANY.brand,
    description: COMPANY.description,
    publisher: { '@id': `${COMPANY.url}#organization` },
    inLanguage: 'en-US',
  };

  // LocalBusiness variant — upgraded version of Organization that Google
  // uses to power local pack / map results once address/geo are filled in.
  const localBusiness = hasAddress
    ? {
        '@type': 'ProfessionalService',
        '@id': `${COMPANY.url}#localbusiness`,
        name: COMPANY.legalName,
        url: COMPANY.url,
        image: `${COMPANY.url}${COMPANY.logo}`,
        email: COMPANY.email,
        ...(COMPANY.phone && { telephone: COMPANY.phone }),
        priceRange: '$$',
        sameAs: SAME_AS,
        address: org.address,
        ...(hasGeo && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: COMPANY.geo.latitude,
            longitude: COMPANY.geo.longitude,
          },
        }),
        ...(COMPANY.openingHours.length && {
          openingHoursSpecification: COMPANY.openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }),
        areaServed: {
          '@type': COMPANY.serviceArea.type,
          name: COMPANY.serviceArea.name,
        },
      }
    : null;

  return {
    '@context': 'https://schema.org',
    '@graph': [org, website, ...(localBusiness ? [localBusiness] : [])],
  };
}
