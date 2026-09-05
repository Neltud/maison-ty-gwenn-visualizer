const PLANS = [
  { id: 1, title: 'Tableau de surfaces', desc: 'Surfaces RDC + Étage' },
  { id: 2, title: 'Plan de masse', desc: 'Échelle 1/250 – Orientation Nord' },
  { id: 3, title: 'Perspective 3D', desc: 'Vue d\'ensemble avec terrasse' },
  { id: 4, title: 'Rez-de-chaussée', desc: 'Plan 1/75 – Cuisine, Séjour, Chambre 1, Garage' },
  { id: 5, title: 'Étage', desc: 'Plan 1/75 – Chambres 2 & 3, Mezzanine, Bains 2' },
  { id: 6, title: 'Coupes AA & BB', desc: 'Coupes verticales 1/75' },
  { id: 7, title: 'Façades', desc: 'Sud / Ouest / Nord / Est – 1/100' },
  { id: 8, title: 'Rendu photoréaliste', desc: 'Vue jardin + terrasse (aménagements non compris)' },
];

export default function PlansGallery({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Plans originaux TY GWENN</h2>
        <button
          onClick={onClose}
          style={{ background: '#ef4444', color: 'white', padding: '8px 16px' }}
        >
          Fermer
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {PLANS.map((p) => (
          <div
            key={p.id}
            className="panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              cursor: 'default',
            }}
          >
            <div
              style={{
                height: 160,
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: 14,
              }}
            >
              Page {p.id}
              <br />
              <span style={{ fontSize: 11 }}>(image à ajouter dans /public/plans/)</span>
            </div>
            <div style={{ fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.desc}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>
        Pour afficher les images réelles : placez les fichiers <code>page-1.jpg</code> … <code>page-8.jpg</code> dans <code>public/plans/</code> puis redéployez.
        Les images ont été extraites du PDF signé (26/06/2026 – 15/07/2026).
      </p>
    </div>
  );
}