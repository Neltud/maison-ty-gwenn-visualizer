import { surfaces } from '../data/rooms.js';

export default function SurfaceTable({ level }) {
  const data = level === 'rdc' ? surfaces.rdc : surfaces.etage;

  return (
    <div className="panel" style={{ maxHeight: 280, overflowY: 'auto' }}>
      <h3 style={{ marginBottom: 10, fontSize: 14, color: '#94a3b8' }}>{data.title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            <th style={{ textAlign: 'left', padding: '4px' }}>Pièce</th>
            <th style={{ textAlign: 'right', padding: '4px' }}>m²</th>
          </tr>
        </thead>
        <tbody>
          {data.rooms.map((room) => (
            <tr key={room.id} style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '6px 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: room.color }} />
                {room.name}
              </td>
              <td style={{ textAlign: 'right', padding: '6px 4px' }}>
                {(room.habitable || room.garage || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #475569', fontWeight: 700 }}>
            <td style={{ padding: '8px 4px' }}>Total</td>
            <td style={{ textAlign: 'right', padding: '8px 4px' }}>
              {data.totalHabitable.toFixed(2)} m²
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
