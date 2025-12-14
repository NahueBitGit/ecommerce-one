import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }) {
  const defaultTitle = "Ecommerce ONE";
  const defaultDescription =
    "Tienda React desarrollada con React, Context API y MockAPI";

  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDescription;

  return (
    <Helmet>
      <html lang="es" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content="website" />

    </Helmet>
  );
}
