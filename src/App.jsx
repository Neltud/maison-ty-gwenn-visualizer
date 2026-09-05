import { useEffect, useState } from 'react';
import Scene from './components/Scene.jsx';
import SurfaceTable from './components/SurfaceTable.jsx';
import CatalogPanel from './components/CatalogPanel.jsx';
import IntentionBar from './components/IntentionBar.jsx';
import { useStudio } from './store.js';
import { surfaces } from './data/rooms.js';

export default function App() {
  const [level, setLevel] = useState('rdc');
  const walkthrough = useStudio((s) => s.walkthrough);
  const setWalkthrough = useStudio((s) => s.setWalkthrough);
  const showEtage = useStudio((s) => s.showEtage);
  const toggleEtage = useStudio((s) => s.toggleEtage);
  const selectedId = useStudio((s) => s.selectedId);
  const rotateSelected = useStudio((s) => s.rotateSelected);
  const deleteSelected = useStudio((s) => s.deleteSelected);
  const undo = useStudio((s) => s.undo);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key.toLowerCase() === 'r' && selectedId) rotateSelected();
      if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, rotateSelected, deleteSelected, undo]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
      {/* Header + Intention Bar */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 8 }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Maison TY GWENN – Studio d’aménagement</h1>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>
              20 Impasse du Dranken · 56700 Hennebont · {surfaces.projet.totalHabitable} m² habitables
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setWalkthrough(!walkthrough)}
              style={{ background: walkthrough ? '#10b981' : '#334155', color: 'white' }}
            >
              {walkthrough ? 'Quitter visite' : 'Mode Visite'}
            </button>
            <button
              onClick={toggleEtage}
              style={{ background: showEtage ? '#3b82f6' : '#334155', color: 'white' }}
            >
              {showEtage ? 'Masquer étage' : 'Afficher étage'}
            </button>
            <button onClick={undo} style={{ background: '#1e293b', color: 'white' }}>
              Undo
            </button>
          </div>
        </div>
        {!walkthrough && <IntentionBar />}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Scene />
          {walkthrough && (
            <div
              className="panel"
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                fontSize: 12,
                color: '#94a3b8',
                pointerEvents: 'none',
              }}
            >
              <div><strong>Mode Visite</strong></div>
              <div>Cliquez pour capturer la souris · WASD · Shift = courir · Esc = libérer</div>
            </div>
          )}
        </div>

        {!walkthrough && (
          <div
            style={{
              width: 300,
              borderLeft: '1px solid #1e293b',
              padding: 14,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              background: '#0f172a',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setLevel('rdc')}
                style={{ flex: 1, background: level === 'rdc' ? '#3b82f6' : '#1e293b', color: 'white', fontSize: 12 }}
              >
                RDC
              </button>
              <button
                onClick={() => setLevel('etage')}
                style={{ flex: 1, background: level === 'etage' ? '#3b82f6' : '#1e293b', color: 'white', fontSize: 12 }}
              >
                Étage
              </button>
            </div>

            <SurfaceTable level={level} />
            <CatalogPanel />
          </div>
        )}
      </div>
    </div>
  );
}
