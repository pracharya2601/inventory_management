import Head from 'next/head';

const MetaTag = ({
  title,
  description,
  currentURL,
  previewImage
}: {
  title?: string;
  description?: string;
  currentURL?: string;
  previewImage?: string;
}) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta name="description" content={description || "Inventory Management"} />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta property="og:description" content={description || "Inventory Management for Retail and wholsale services."} key="ogdesc" />

    <meta name="twitter:card" content="summary" key="twcard" />
    <meta name="twitter:creator" content={description} key="twhandle" />

    <meta property="og:url" content={currentURL} key="ogurl" />
    <meta property="og:image" content={previewImage} key="ogimage" />
    <meta property="og:site_name" content="www.prakashacharya.com" key="ogsitename" />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta property="og:description" content={description} key="ogdesc" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="logos/apple-touch-icon-150x150.jpg"
    />
    <link
      rel="icon"
      type="image/jpg"
      sizes="32x32"
      href="logos/favicon-32x32.jpg"
    />
    <link
      rel="icon"
      type="image/jpg"
      sizes="16x16"
      href="logos/favicon-16x16.jpg"
    />
    <link rel="manifest" href="/logos/site.webmanifest" />
    <link
      rel="mask-icon"
      href="logos/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    <title>{title || "Prakash Acharya | Portfolio"}</title>
  </Head>
)

export default MetaTag;