// client/src/components/common/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Reset. Restore. Rebuild. - 2027 Presidential Campaign", 
  description = "Join the movement to Reset, Restore, and Rebuild Kenya. David Maraga for President 2027 - A vision for sustainable development, good governance, and prosperity for all Kenyans.",
  keywords = "Kenya 2027 elections, presidential campaign, David Maraga, Reset Restore Rebuild, Kenya politics, governance, development",
  image = "/images/campaign-og-image.jpg",
  url = window.location.href
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="2027 Presidential Campaign Team" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Reset. Restore. Rebuild." />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.country" content="Kenya" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;