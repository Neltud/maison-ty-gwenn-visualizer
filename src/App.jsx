import { useState } from 'react';
import Scene from './components/Scene.jsx';
import SurfaceTable from './components/SurfaceTable.jsx';
import PlansGallery from './components/PlansGallery.jsx';
import { surfaces } from './data/rooms.js';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [level, setLevel] = useState('rdc');
  const [showEtage, setShowEtage] = useState(true);
  const [walkthrough, setWalkthrough] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex' }}>
      {/* Zone 3D */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Scene
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
          showEtage={showEtage}
          walkthrough={walkthrough}
        />

        {/* Overlay header */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            pointerEvents: 'none',
          }}
        >
          <div className="panel" style={{ pointerEvents: 'auto' }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              Maison TY GWENN
            </h1>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>
              M. TUDURI & Mme LE SOLLIEC
            </p>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              20 Impasse du Dranken · 56700 Hennebont
            </p>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              {surfaces.projet.totalHabitable.toFixed(2)} m² habitables · {surfaces.projet.totalGarage.toFixed(2)} m² garage
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, pointerEvents: 'auto', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setWalkthrough(!walkthrough)}
              style={{
                background: walkthrough ? '#10b981' : '#334155',
                color: 'white',
              }}
            >
              {walkthrough ? 'Quitter la visite' : 'Mode Visite (Walkthrough)'}
            </button>
            <button
              onClick={() => setShowEtage(!showEtage)}
              style={{
                background: showEtage ? '#3b82f6' : '#334155',
                color: 'white',
              }}
            >
              {showEtage ? 'Masquer étage' : 'Afficher étage'}
            </button>
            <button
              onClick={() => setShowPlans(true)}
              style={{ background: '#8b5cf6', color: 'white' }}
            >
              Plans originaux
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div
          className="panel"
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            fontSize: 12,
            color: '#94a3b8',
            pointerEvents: 'none',
            maxWidth: 320,
          }}
        >
          {walkthrough ? (
            <>
              <div><strong>Mode Visite activé</strong></div>
              <div>Cliquez pour verrouiller la souris</div>
              <div>WASD / Flèches → se déplacer</div>
              <div>Shift → courir · Esc → libérer</div>
            </>
          ) : (
            <>
              <div>🖱️ Clic gauche + glisser → tourner</div>
              <div>🖱️ Molette → zoom · Clic droit → déplacer</div>
              <div>Cliquez sur une pièce pour la sélectionner</div>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {!walkthrough && (
        <div
          style={{
            width: 320,
            background: '#0f172a',
            borderLeft: '1px solid #1e293b',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setLevel('rdc')}
              style={{
                flex: 1,
                background: level === 'rdc' ? '#3b82f6' : '#1e293b',
                color: 'white',
              }}
            >
              Rez-de-chaussée
            </button>
            <button
              onClick={() => setLevel('etage')}
              style={{
                flex: 1,
                background: level === 'etage' ? '#3b82f6' : '#1e293b',
                color: 'white',
              }}
            >
              Étage
            </button>
          </div>

          <SurfaceTable
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
            level={level}
          />

          <div className="panel" style={{ fontSize: 12, color: '#94a3b8' }}>
            <strong style={{ color: '#e2e8f0' }}>Analyse des plans</strong>
            <p style={{ marginTop: 8, lineHeight: 1.5 }}>
              Maison contemporaine à toiture plate, RDC + étage partiel.
              Orientation principale Sud (grandes baies vitrées).
              Garage intégré côté Est. Mezzanine ouverte sur le séjour.
            </p>
            <p style={{ marginTop: 8 }}>
              Plans signés le 15/07/2026 · Constructeur : SAS Constructions TY GWENN (Lorient)
            </p>
          </div>
        </div>
      )}

      {showPlans && <PlansGallery onClose={() => setShowPlans(false)} />}
    </div>
  );
}