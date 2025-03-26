'use client';

import React, { FormEvent, useState } from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  conoscenzaCrediti: string;
  interesseInfo: string;
  tipoIntervento: string;
  interventoFuturo: string;
  interesseMonetizzazione: string;
}

interface FormStatus {
  submitted: boolean;
  loading: boolean;
  success: boolean;
  message: string;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Valutazione Crediti Ambientali',
  'provider': {
    '@type': 'Organization',
    'name': 'SolarixBusiness',
    'url': 'https://www.solarixbusiness.it'
  },
  'serviceType': 'Valutazione Crediti',
  'areaServed': {
    '@type': 'Country',
    'name': 'Italia'
  },
  'description': 'Servizio di valutazione per la generazione e monetizzazione di crediti ambientali.'
};

export default function ValutazioneCreditiPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    conoscenzaCrediti: '',
    interesseInfo: '',
    tipoIntervento: '',
    interventoFuturo: '',
    interesseMonetizzazione: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    loading: false,
    success: false,
    message: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validazione base
    if (!formData.nome || !formData.email || !formData.telefono) {
      setFormStatus({
        submitted: true,
        loading: false,
        success: false,
        message: 'Per favore, compila tutti i campi obbligatori.'
      });
      return;
    }

    try {
      setFormStatus({
        submitted: true,
        loading: true,
        success: false,
        message: 'Invio in corso...'
      });

      const response = await fetch('/api/send-email-crediti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Si è verificato un errore durante l\'invio');
      }

      setFormStatus({
        submitted: true,
        loading: false,
        success: true,
        message: 'Grazie! La tua richiesta è stata inviata con successo.'
      });
      
      // Reset form
      setFormData({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        conoscenzaCrediti: '',
        interesseInfo: '',
        tipoIntervento: '',
        interventoFuturo: '',
        interesseMonetizzazione: ''
      });
      
      // Reset status dopo 5 secondi
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          submitted: false
        }));
      }, 5000);
    } catch (error) {
      console.error('Errore durante l\'invio del form:', error);
      setFormStatus({
        submitted: true,
        loading: false,
        success: false,
        message: error instanceof Error ? error.message : 'Si è verificato un errore durante l\'invio. Riprova più tardi.'
      });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Richiedi Valutazione Crediti Ambientali</h2>
          <p className="text-center text-gray-700 mb-12">
            Compila il modulo per sapere se la tua azienda può generare e monetizzare crediti ambientali (es. crediti di carbonio). 
            Più dettagli ci fornisci, più precisa sarà la valutazione.
          </p>

          {formStatus.submitted && (
            <div 
              className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              role="alert"
              aria-live="assertive"
            >
              {formStatus.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="conoscenza-crediti" className="block font-medium text-gray-800 mb-1">
                Sai cos'è un credito di carbonio?
              </label>
              <select 
                id="conoscenza-crediti" 
                name="conoscenzaCrediti"
                value={formData.conoscenzaCrediti}
                onChange={(e) => setFormData({...formData, conoscenzaCrediti: e.target.value})}
                className="w-full border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Seleziona un'opzione</option>
                <option value="no">No, non ne ho mai sentito parlare</option>
                <option value="poco">Sì, ma non conosco i dettagli</option>
                <option value="si">Sì, conosco il funzionamento del mercato</option>
              </select>
            </div>

            <div>
              <label htmlFor="interesse-info" className="block font-medium text-gray-800 mb-1">
                Ti interessa ricevere informazioni approfondite sul funzionamento?
              </label>
              <select 
                id="interesse-info" 
                name="interesseInfo"
                value={formData.interesseInfo}
                onChange={(e) => setFormData({...formData, interesseInfo: e.target.value})}
                className="w-full border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Seleziona un'opzione</option>
                <option value="si">Sì</option>
                <option value="no">No, mi basta un'infarinatura</option>
              </select>
            </div>

            <div>
              <label htmlFor="tipo-intervento" className="block font-medium text-gray-800 mb-1">
                Hai già un impianto fotovoltaico o un progetto con impatto ambientale positivo?
              </label>
              <textarea 
                id="tipo-intervento" 
                name="tipoIntervento"
                value={formData.tipoIntervento}
                onChange={(e) => setFormData({...formData, tipoIntervento: e.target.value})}
                rows={3} 
                className="w-full border-gray-300 rounded-lg shadow-sm" 
                placeholder="Descrivi brevemente: es. fotovoltaico installato, progetto agricolo sostenibile, gestione rifiuti ottimizzata, ecc."
              ></textarea>
            </div>

            <div>
              <label htmlFor="intervento-futuro" className="block font-medium text-gray-800 mb-1">
                Hai in mente un intervento futuro che potrebbe generare crediti ambientali?
              </label>
              <textarea 
                id="intervento-futuro" 
                name="interventoFuturo"
                value={formData.interventoFuturo}
                onChange={(e) => setFormData({...formData, interventoFuturo: e.target.value})}
                rows={3} 
                className="w-full border-gray-300 rounded-lg shadow-sm" 
                placeholder="Es. installazione impianto, riconversione energetica, piani di sostenibilità..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="interesse-monetizzazione" className="block font-medium text-gray-800 mb-1">
                Se potessi monetizzare crediti ambientali, vorresti farlo direttamente o con supporto esterno?
              </label>
              <select 
                id="interesse-monetizzazione" 
                name="interesseMonetizzazione"
                value={formData.interesseMonetizzazione}
                onChange={(e) => setFormData({...formData, interesseMonetizzazione: e.target.value})}
                className="w-full border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Seleziona un'opzione</option>
                <option value="diretto">Direttamente</option>
                <option value="supporto">Con un partner esperto</option>
                <option value="non so">Non so ancora</option>
              </select>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">I tuoi recapiti per ricontattarti</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block font-medium text-gray-800 mb-1">Nome *</label>
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cognome" className="block font-medium text-gray-800 mb-1">Cognome *</label>
                  <input 
                    type="text" 
                    id="cognome" 
                    name="cognome"
                    value={formData.cognome}
                    onChange={(e) => setFormData({...formData, cognome: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium text-gray-800 mb-1">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block font-medium text-gray-800 mb-1">Telefono *</label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <button 
                type="submit" 
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg"
                disabled={formStatus.loading}
              >
                {formStatus.loading ? 'Invio in corso...' : 'Invia richiesta valutazione crediti'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Compila solo ciò che desideri: ogni informazione ci aiuta a valutare correttamente il tuo potenziale.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}