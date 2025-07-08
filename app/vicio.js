"use client";

import { useState } from 'react';

const domande = [
  "Ho difficoltà a controllare o interrompere abitudini o comportamenti che percepisco dannosi per la mia vita.",
  "Quando provo a fermare o ridurre certi comportamenti, sento ansia, irritabilità o un forte disagio emotivo.",
  "Ho già avuto problemi familiari, sociali o professionali direttamente legati a comportamenti ripetitivi o dipendenze.",
  "Dedico gran parte della giornata a pensare o pianificare determinati comportamenti, pur sapendo che non sono salutari.",
  "Ho tentato più volte di smettere certi comportamenti, ma finisco sempre per tornarvi in modo compulsivo.",
  "Recentemente, i miei comportamenti compulsivi o dipendenze mi hanno portato a pensare seriamente di togliere la vita a me stesso(a) o di farmi del male.", // FLAG
  "Provo vergogna o senso di colpa significativo a causa dei miei comportamenti compulsivi o di dipendenza.",
  "Ho notato danni fisici o economici derivanti da comportamenti ripetitivi o dalla dipendenza.",
  "Tendo a mentire o a nascondere i miei comportamenti o dipendenze alle persone vicine per paura del giudizio o delle critiche.",
  "Pur sapendo di aver bisogno di aiuto, ho molta difficoltà a chiederlo o ad ammettere il mio problema con qualcuno."
];

export default function TestDipendenza() {
  const [risposte, setRisposte] = useState(Array(10).fill(0));
  const [risultato, setRisultato] = useState(null);
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const registraRisposta = (valore) => {
    const nuoveRisposte = [...risposte];
    nuoveRisposte[indiceAttuale] = valore;
    setRisposte(nuoveRisposte);

    if (indiceAttuale < domande.length - 1) {
      setIndiceAttuale(indiceAttuale + 1);
    } else {
      calcolaRisultato(nuoveRisposte);
    }
  };

  const calcolaRisultato = (risposte) => {
    if (risposte[5] >= 3) { // FLAG
      setRisultato("ROSSO");
    } else {
      const somma = risposte.reduce((a, b) => a + b, 0);
      if (somma <= 20) setRisultato("VERDE");
      else if (somma <= 35) setRisultato("GIALLO");
      else setRisultato("ROSSO");
    }
  };

  const riavviaTest = () => {
    setRisposte(Array(10).fill(0));
    setRisultato(null);
    setIndiceAttuale(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!risultato ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Test della Dipendenza</h2>
          <p className="mb-4">{domande[indiceAttuale]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registraRisposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Domanda {indiceAttuale + 1} di {domande.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Risultato: {risultato}</h2>
          {risultato === "VERDE" && <p>Gestisci molto bene questo aspetto e sei emotivamente equilibrato(a). Potrai essere di grande aiuto ad altre persone che necessitano sostegno.</p>}
          {risultato === "GIALLO" && <p>Ci sono chiari segnali di difficoltà emotive che richiedono attenzione e che, con determinazione e aiuto, possono essere superati.</p>}
          {risultato === "ROSSO" && <p>I tuoi problemi emotivi legati a questo tema richiedono necessariamente l'intervento di un professionista. Ti consigliamo di cercare rapidamente l'aiuto di un medico o psicologo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={riavviaTest}
          >
            Ripeti il test
          </button>
        </>
      )}
    </div>
  );
}
