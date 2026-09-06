import { useStudio } from '../store.js';
import FurnitureMesh from './FurnitureMesh.jsx';

/**
 * Volumes calés sur le plan RDC 1/75 (page 4) et étage 1/75 (page 5).
 * Origine (0,0) ≈ centre du séjour / limite cuisine.
 * Axe X = Est (garage), axe -Z = Sud (baies séjour).
 */
function Room({ position, size, color, opacity = 0.12 }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} depthWrite={false} />
    </mesh>
  );
}

function Wall({ position, size }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#f1f5f9" roughness={0.85} />
    </mesh>
  );
}

export default function House3D() {
  const furniture = useStudio((s) => s.furniture);
  const selectedId = useStudio((s) => s.selectedId);
  const showEtage = useStudio((s) => s.showEtage);
  const select = useStudio((s) => s.select);
  const tool = useStudio((s) => s.tool);
  const placeFurniture = useStudio((s) => s.placeFurniture);
  const moveSelected = useStudio((s) => s.moveSelected);

  const handleFloorClick = (e) => {
    e.stopPropagation();
    const p = e.point;
    if (tool === 'furnish') {
      placeFurniture(p.x, -p.z);
    } else if (tool === 'select' && selectedId) {
      moveSelected(p.x, -p.z);
    } else {
      select(null);
    }
  };

  return (
    <group>
      {/* Sol extérieur */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -0.02, 0]} receiveShadow onClick={handleFloorClick}>
        <planeGeometry args={[36, 28]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Dalle RDC – empreinte globale ~14.9 × 10.2 m */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.2, 0.01, 0.3]} receiveShadow onClick={handleFloorClick}>
        <planeGeometry args={[15.2, 10.4]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.8} />
      </mesh>

      {/* ========== RDC – volumes selon plan ========== */}

      {/* Séjour – grand volume sud-ouest (zone canapé + table) */}
      <Room position={[-1.6, 1.35, 1.8]} size={[7.2, 2.7, 5.8]} color="#3b82f6" />

      {/* Cuisine – est du séjour */}
      <Room position={[3.6, 1.35, 1.2]} size={[3.4, 2.7, 4.0]} color="#f59e0b" />

      {/* Entrée – nord centre */}
      <Room position={[0.8, 1.35, -2.6]} size={[3.6, 2.7, 2.4]} color="#8b5cf6" />

      {/* Chambre 1 – nord-ouest */}
      <Room position={[-4.4, 1.35, -2.0]} size={[4.0, 2.7, 3.6]} color="#10b981" />

      {/* Bains 1 + WC 1 – entre chambre 1 et séjour */}
      <Room position={[-1.6, 1.35, -2.2]} size={[2.4, 2.7, 2.2]} color="#06b6d4" />

      {/* Cellier */}
      <Room position={[4.2, 1.35, -1.8]} size={[2.2, 2.7, 2.6]} color="#78716c" />

      {/* Garage – est, légèrement plus bas */}
      <Room position={[7.6, 1.15, -0.4]} size={[5.4, 2.3, 4.8]} color="#57534e" opacity={0.22} />

      {/* Contour extérieur simplifié */}
      <mesh position={[1.2, 1.35, 0.2]}>
        <boxGeometry args={[15.0, 2.7, 10.0]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.04} />
      </mesh>

      {/* ========== ÉTAGE (page 5) ========== */}
      {showEtage && (
        <group position={[0, 2.75, 0]}>
          {/* Chambre 2 – ouest */}
          <Room position={[-2.8, 1.25, 0.2]} size={[3.2, 2.5, 3.2]} color="#10b981" />
          {/* Chambre 3 – centre */}
          <Room position={[0.6, 1.25, 0.2]} size={[3.2, 2.5, 3.2]} color="#22c55e" />
          {/* Mezzanine – nord (ouverte sur séjour) */}
          <Room position={[-1.0, 1.25, 2.4]} size={[4.2, 2.5, 2.2]} color="#a855f7" />
          {/* Bains 2 + WC 2 */}
          <Room position={[2.6, 1.25, 1.8]} size={[2.4, 2.5, 2.6]} color="#06b6d4" />
          {/* Toiture plate */}
          <mesh position={[-0.2, 2.65, 0.6]}>
            <boxGeometry args={[10.5, 0.22, 7.5]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      )}

      {/* Mobilier */}
      {furniture.map((item) => (
        <group
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            select(item.id);
          }}
        >
          <FurnitureMesh item={item} selected={selectedId === item.id} />
        </group>
      ))}
    </group>
  );
}
