import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Comunità Energetiche | SolarixBusiness',
  description: 'Scopri le opportunità delle Comunità Energetiche Rinnovabili per la tua azienda. Partecipa e beneficia dell\'autoconsumo collettivo.',
  keywords: 'comunità energetiche, CER, energia rinnovabile, autoconsumo collettivo, incentivi CER',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TV8D8Q7C');
        `}
      </Script>
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-TV8D8Q7C"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      
      {children}
    </>
  );
}