import { useStudio } from '../store.js';
import FurnitureMesh from './FurnitureMesh.jsx';

function Room({ position, size, color, opacity = 0.15 }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
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
      {/* Sol global */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
        onClick={handleFloorClick}
      >
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Dalle maison */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 0]} receiveShadow onClick={handleFloorClick}>
        <planeGeometry args={[15.5, 10]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.85} />
      </mesh>

      {/* === RDC volumes (transparents pour voir le mobilier) === */}
      <Room position={[-1.5, 1.35, 1.5]} size={[7.5, 2.7, 5.5]} color="#3b82f6" />
      <Room position={[3.8, 1.35, 0.8]} size={[3.2, 2.7, 4.2]} color="#f59e0b" />
      <Room position={[1.2, 1.35, -2.8]} size={[3.5, 2.7, 2.2]} color="#8b5cf6" />
      <Room position={[-4.5, 1.35, -2.2]} size={[4.2, 2.7, 3.8]} color="#10b981" />
      <Room position={[-1.8, 1.35, -2.5]} size={[2.2, 2.7, 2.0]} color="#06b6d4" />
      <Room position={[4.5, 1.35, -2.0]} size={[2.0, 2.7, 2.4]} color="#78716c" />
      <Room position={[7.5, 1.2, -0.5]} size={[5.5, 2.4, 4.5]} color="#57534e" opacity={0.25} />

      {/* Murs simples (contour) */}
      <mesh position={[0.5, 1.35, 0]}>
        <boxGeometry args={[15.5, 2.7, 9]} />
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.06} />
      </mesh>

      {/* === Étage === */}
      {showEtage && (
        <group position={[0, 2.75, 0]}>
          <Room position={[-3.2, 1.25, -0.5]} size={[3.5, 2.5, 3.0]} color="#10b981" />
          <Room position={[0.5, 1.25, -0.5]} size={[3.5, 2.5, 3.0]} color="#22c55e" />
          <Room position={[-1.3, 1.25, 2.2]} size={[4.0, 2.5, 2.0]} color="#a855f7" />
          <Room position={[2.8, 1.25, 1.5]} size={[2.5, 2.5, 2.5]} color="#06b6d4" />
          <mesh position={[0, 2.7, 0]}>
            <boxGeometry args={[12, 0.25, 8]} />
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
