import { useStudio } from '../store.js';

const INTENTIONS = [
  { key: 'sejour_convivial', label: 'Séjour convivial', desc: 'Canapés + table basse + TV' },
  { key: 'sejour_soiree', label: 'Séjour soirée', desc: 'Disposition conversation' },
  { key: 'cuisine_fonctionnelle', label: 'Cuisine ouverte', desc: 'Plan de travail + table 4 places' },
  { key: 'cuisine_ilot', label: 'Cuisine îlot', desc: 'Repas rapide côté cuisine' },
  { key: 'chambre_parentale', label: 'Chambre parentale', desc: 'Lit double + armoire + bureau' },
  { key: 'chambre_zen', label: 'Chambre zen', desc: 'Minimaliste + plantes' },
  { key: 'chambres_enfants', label: 'Chambres enfants', desc: '2 lits + bureaux' },
  { key: 'chambres_ados', label: 'Chambres ados', desc: 'Lits + fauteuil détente' },
  { key: 'mezzanine_lecture', label: 'Mezzanine lecture', desc: 'Fauteuils cosy' },
  { key: 'mezzanine_bureau', label: 'Mezzanine bureau', desc: 'Espace télétravail' },
  { key: 'open_space_complet', label: 'Open-space complet', desc: 'Tout le RDC aménagé' },
  { key: 'minimaliste', label: 'Minimaliste', desc: 'Essentiel seulement' },
];

export default function IntentionBar() {
  const applyIntention = useStudio((s) => s.applyIntention);
  const intention = useStudio((s) => s.intention);

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        padding: '8px 0',
        scrollbarWidth: 'thin',
      }}
    >
      {INTENTIONS.map((it) => (
        <button
          key={it.key}
          onClick={() => applyIntention(it.key)}
          style={{
            flexShrink: 0,
            background: intention === it.key ? '#3b82f6' : '#1e293b',
            color: 'white',
            border: '1px solid #334155',
            borderRadius: 10,
            padding: '10px 14px',
            textAlign: 'left',
            minWidth: 155,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 13 }}>{it.label}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{it.desc}</div>
        </button>
      ))}
    </div>
  );
}
