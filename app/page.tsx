import { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection/HeroSection'
import SolarBenefitsWidget from '@/components/SolarBenefitsWidget/SolarBenefitsWidget'
import IntroSection from '@/components/IntroSection/IntroSection'
import IncentiveSection from '@/components/IncentiveSection/IncentiveSection'
import GuaranteeWidget from '@/components/GuaranteeWidget/GuaranteeWidget'
import SeoManager from '@/components/SeoManager/SeoManager'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { SEO_CONSTANTS } from '@/utils/seoConstants'

export const metadata: Metadata = {
  title: 'solariXbusiness - Soluzioni energetiche per aziende',
  description: 'Soluzioni fotovoltaiche personalizzate per aziende in tutta Italia. Massimizza il risparmio energetico e riduci i costi operativi con i nostri impianti industriali.',
  openGraph: {
    title: 'solariXbusiness - Soluzioni energetiche per aziende',
    description: 'Soluzioni fotovoltaiche personalizzate per aziende in tutta Italia. Massimizza il risparmio energetico e riduci i costi operativi con i nostri impianti industriali.',
    url: 'https://www.solarixbusiness.it',
    siteName: 'solariXbusiness',
    images: [
      {
        url: 'https://www.solarixbusiness.it/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'solariXbusiness - Soluzioni energetiche per aziende',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'solariXbusiness - Soluzioni energetiche per aziende',
    description: 'Soluzioni fotovoltaiche personalizzate per aziende in tutta Italia. Massimizza il risparmio energetico e riduci i costi operativi con i nostri impianti industriali.',
    images: ['https://www.solarixbusiness.it/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.solarixbusiness.it',
    languages: {
      'it-IT': 'https://www.solarixbusiness.it',
      'en-US': 'https://www.solarixbusiness.it/en',
    },
  },
}

export default function HomePage() {
  return (
    <>
      {/* SEO Manager - gestisce tutti i componenti SEO in modo centralizzato */}
      <SeoManager 
        organizationData={{
          name: SEO_CONSTANTS.COMPANY_NAME,
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
          url: SEO_CONSTANTS.SITE_URL,
          logo: SEO_CONSTANTS.COMPANY_LOGO,
          telephone: SEO_CONSTANTS.COMPANY_PHONE,
          address: {
            streetAddress: SEO_CONSTANTS.ADDRESS.STREET,
            addressLocality: SEO_CONSTANTS.ADDRESS.CITY,
            postalCode: SEO_CONSTANTS.ADDRESS.POSTAL_CODE,
            addressCountry: "IT"
          }
        }}
        localBusinessData={{
          name: SEO_CONSTANTS.COMPANY_NAME,
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
          url: SEO_CONSTANTS.SITE_URL,
          telephone: SEO_CONSTANTS.COMPANY_PHONE,
          email: SEO_CONSTANTS.COMPANY_EMAIL,
          logo: SEO_CONSTANTS.COMPANY_LOGO,
          priceRange: '€€',
          openingHours: ['Mo-Fr 09:00-18:00'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: SEO_CONSTANTS.ADDRESS.STREET,
            addressLocality: SEO_CONSTANTS.ADDRESS.CITY,
            postalCode: SEO_CONSTANTS.ADDRESS.POSTAL_CODE,
            addressRegion: SEO_CONSTANTS.ADDRESS.REGION,
            addressCountry: SEO_CONSTANTS.ADDRESS.COUNTRY_CODE,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: SEO_CONSTANTS.GEO.LATITUDE,
            longitude: SEO_CONSTANTS.GEO.LONGITUDE,
          },
          sameAs: [
            SEO_CONSTANTS.SOCIAL_FACEBOOK,
            SEO_CONSTANTS.SOCIAL_INSTAGRAM,
            SEO_CONSTANTS.SOCIAL_LINKEDIN,
          ],
        }}
        socialData={{
          title: 'solariXbusiness - Soluzioni energetiche per aziende',
          description: 'Soluzioni fotovoltaiche personalizzate per aziende in tutta Italia. Massimizza il risparmio energetico e riduci i costi operativi con i nostri impianti industriali.',
          ogImage: '/images/og-image.jpg',
          ogType: 'website',
          twitterCard: 'summary_large_image'
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/', isCurrentPage: true }
        ]}
      />

      {/* Hero Section con CTA */}
      <HeroSection 
        title="IL FOTOVOLTAICO NON È UNA SPESA. È LA TUA LEVA FINANZIARIA"
        subtitle="Accedi a incentivi cumulabili, ritorno immediato entra nel mercato dei carbon credits, Il tuo impianto inizia a guadagnare da subito"
      />

      {/* Widget dei benefici solari - overview generale */}
      <SolarBenefitsWidget />

      {/* Prefazione e Punti Chiave */}
      <IntroSection />

      {/* Sezione Incentivi */}
      <IncentiveSection />

      {/* Widget delle garanzie - dettagli specifici */}
      <GuaranteeWidget />
    </>
  )
}
