import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analisi CER | SolarixBusiness',
  description: 'Richiedi un\'analisi per valutare le opportunità di partecipazione a una Comunità Energetica Rinnovabile.',
  keywords: 'analisi CER, comunità energetica, valutazione rinnovabili, studio fattibilità CER, autoconsumo collettivo',
  openGraph: {
    title: 'Analisi CER | SolarixBusiness',
    description: 'Scopri i vantaggi della partecipazione a una Comunità Energetica Rinnovabile con un\'analisi dedicata.',
    type: 'website',
    url: 'https://www.solarixbusiness.it/analisi-cer',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TV8D8Q7C');
        `}} />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TV8D8Q7C"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
} 