import { CATALOG, CATEGORY_LABEL } from '../data/catalog.js';
import { useStudio } from '../store.js';

const categories = ['salon', 'cuisine', 'chambre', 'bain', 'deco'];

export default function CatalogPanel() {
  const furnishType = useStudio((s) => s.furnishType);
  const setFurnishType = useStudio((s) => s.setFurnishType);
  const tool = useStudio((s) => s.tool);
  const setTool = useStudio((s) => s.setTool);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => setTool('select')}
          style={{
            flex: 1,
            background: tool === 'select' ? '#3b82f6' : '#1e293b',
            color: 'white',
            fontSize: 12,
          }}
        >
          Sélection
        </button>
        <button
          onClick={() => setTool('furnish')}
          style={{
            flex: 1,
            background: tool === 'furnish' ? '#10b981' : '#1e293b',
            color: 'white',
            fontSize: 12,
          }}
        >
          Placer
        </button>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase' }}>
            {CATEGORY_LABEL[cat]}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CATALOG.filter((i) => i.category === cat).map((item) => (
              <button
                key={item.type}
                onClick={() => setFurnishType(item.type)}
                style={{
                  background: furnishType === item.type && tool === 'furnish' ? '#10b981' : '#1e293b',
                  color: 'white',
                  fontSize: 11,
                  padding: '6px 10px',
                  border: '1px solid #334155',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>
        Mode <strong>Placer</strong> : cliquez sur le sol pour déposer l’objet sélectionné.
        <br />
        Touche <strong>R</strong> pour tourner · <strong>Suppr</strong> pour effacer.
      </p>
    </div>
  );
}
