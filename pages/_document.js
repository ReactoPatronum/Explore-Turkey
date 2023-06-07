import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
     <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-GGZG06ZVRT"
  strategy="afterInteractive"
  onError={(e) => {
    console.error("Script failed to load code:1", e);
  }}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GGZG06ZVRT', {
        page_path: window.location.pathname,
      });
    `,
  }}
  onError={(e) => {
    console.error("Script failed to load code:2", e);
  }}
/>

        {/* <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="YOUR_ADSENSE_CLIENT_ID"
          strategy="afterInteractive"
          onError={(e) => {
            console.error("Script failed to load code 3", e);
          }}
        />
        <Script
          id="adsense"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "YOUR_ADSENSE_CLIENT_ID",
              enable_page_level_ads: true
            });
            `,
          }}
          onError={(e) => {
            console.error("Script failed to load code 4", e);
          }}
        /> */}
      </body>
    </Html>
  );
}
