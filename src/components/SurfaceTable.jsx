import { surfaces } from '../data/rooms.js';

export default function SurfaceTable({ selectedRoom, onSelectRoom, level }) {
  const data = level === 'rdc' ? surfaces.rdc : surfaces.etage;

  return (
    <div className="panel" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <h3 style={{ marginBottom: 12, fontSize: 16, color: '#94a3b8' }}>{data.title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            <th style={{ textAlign: 'left', padding: '6px 4px' }}>Pièce</th>
            <th style={{ textAlign: 'right', padding: '6px 4px' }}>Habitable</th>
          </tr>
        </thead>
        <tbody>
          {data.rooms.map((room) => (
            <tr
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              style={{
                cursor: 'pointer',
                background: selectedRoom === room.id ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <td style={{ padding: '8px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: room.color,
                    display: 'inline-block',
                  }}
                />
                {room.name}
              </td>
              <td style={{ textAlign: 'right', padding: '8px 4px', fontVariantNumeric: 'tabular-nums' }}>
                {room.habitable ? `${room.habitable.toFixed(2)} m²` : room.garage ? `${room.garage.toFixed(2)} m²` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #475569', fontWeight: 700 }}>
            <td style={{ padding: '10px 4px' }}>Total</td>
            <td style={{ textAlign: 'right', padding: '10px 4px' }}>
              {data.totalHabitable.toFixed(2)} m²
            </td>
          </tr>
        </tfoot>
      </table>

      {level === 'rdc' && (
        <div style={{ marginTop: 16, fontSize: 12, color: '#94a3b8' }}>
          <div>Garage + Cellier : {surfaces.rdc.totalGarage.toFixed(2)} m²</div>
          <div style={{ marginTop: 4 }}>Projet total : {surfaces.projet.totalHabitable.toFixed(2)} m² habitables</div>
        </div>
      )}
    </div>
  );
}