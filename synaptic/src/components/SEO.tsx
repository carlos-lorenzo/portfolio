import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Carlos Lorenzo Zúñiga Mari - Software Developer Portfolio",
  description = "The portfolio of Carlos Lorenzo Zúñiga Mari, a software developer showcasing projects, skills, and professional experience.",
  keywords = "Carlos Lorenzo Zúñiga Mari, Carlos Lorenzo, Carlos Zúñiga, Carlos Mari, portfolio, software developer, web developer, projects, skills",
  author = "Carlos Lorenzo Zúñiga Mari",
}) => {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Carlos Lorenzo Zúñiga Mari",
    "url": "https://carloslorenzo.dev",
    "sameAs": [
      "https://www.linkedin.com/in/carlos-lorenzo-z-mari/",
      "https://github.com/carlos-lorenzo"
    ],
    "jobTitle": "Software Developer"
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://carloslorenzo.dev" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://carloslorenzo.dev/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content="https://carloslorenzo.dev/og-image.png" /> */}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://carloslorenzo.dev/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {/* <meta property="twitter:image" content="https://carloslorenzo.dev/twitter-image.png" /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default SEO;
