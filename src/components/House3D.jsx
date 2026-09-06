import { useMemo } from 'react';
import { useStudio } from '../store.js';
import FurnitureMesh from './FurnitureMesh.jsx';

/**
 * Modèle 3D complet d’après les plans signés TY GWENN :
 * - Plan de masse 1/250 (orientation Nord)
 * - RDC 1/75 (cotes 14,90 m)
 * - Étage 1/75
 * - Coupes AA / BB (hauteur, pente 5 %)
 * - Façades Sud / Ouest / Nord / Est
 *
 * Système de coordonnées :
 *   X+ = Est (garage)
 *   Z- = Sud (grandes baies)
 *   Y+ = haut
 * Origine ≈ centre du séjour
 */

const WALL_H = 2.7;       // hauteur RDC (coupe)
const WALL_H2 = 2.5;      // hauteur étage
const WALL_T = 0.22;      // épaisseur mur approximative
const ROOF_H = 0.18;

function Floor({ position, size, color = '#e8e4dc' }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.82} />
    </mesh>
  );
}

function Wall({ position, size, color = '#f8fafc' }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.78} />
    </mesh>
  );
}

function Glass({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#7dd3fc"
        transparent
        opacity={0.35}
        roughness={0.05}
        metalness={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}

function RoomVolume({ position, size, color, opacity = 0.08 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} />
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
    if (tool === 'furnish') placeFurniture(p.x, -p.z);
    else if (tool === 'select' && selectedId) moveSelected(p.x, -p.z);
    else select(null);
  };

  // Emprise RDC d’après plan : ~14.90 m (Est-Ouest) × ~10.2 m (Nord-Sud)
  // Garage collé à l’Est

  return (
    <group>
      {/* Sol terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -0.05, 0]} receiveShadow onClick={handleFloorClick}>
        <planeGeometry args={[40, 32]} />
        <meshStandardMaterial color="#1a2332" />
      </mesh>

      {/* ========== RDC ========== */}

      {/* Dalle séjour + cuisine + entrée + chambre */}
      <Floor position={[-0.5, 0.02, 0.4]} size={[10.5, 9.2]} color="#e8e4dc" />
      {/* Dalle garage */}
      <Floor position={[7.4, -0.15, -0.3]} size={[5.6, 5.2]} color="#d4d0c8" />

      {/* --- Murs périphériques RDC (contour bleu du plan) --- */}

      {/* Façade Sud (baies séjour) – Z positif */}
      <Wall position={[-1.8, WALL_H / 2, 4.7]} size={[7.6, WALL_H, WALL_T]} />
      <Glass position={[-2.2, 1.2, 4.72]} size={[3.2, 2.1, 0.08]} />
      <Glass position={[0.6, 1.2, 4.72]} size={[2.4, 2.1, 0.08]} />

      {/* Façade Ouest (chambre 1) */}
      <Wall position={[-6.2, WALL_H / 2, 0.2]} size={[WALL_T, WALL_H, 9.0]} />

      {/* Façade Nord (chambre 1 + entrée) */}
      <Wall position={[-2.0, WALL_H / 2, -4.2]} size={[8.5, WALL_H, WALL_T]} />

      {/* Mur Est du volume principal (vers garage/cellier) */}
      <Wall position={[3.6, WALL_H / 2, 0.5]} size={[WALL_T, WALL_H, 8.4]} />

      {/* Murs garage */}
      <Wall position={[7.4, 1.15, 2.2]} size={[5.4, 2.3, WALL_T]} />
      <Wall position={[7.4, 1.15, -2.8]} size={[5.4, 2.3, WALL_T]} />
      <Wall position={[10.1, 1.15, -0.3]} size={[WALL_T, 2.3, 5.0]} />
      {/* Porte garage façade Est */}
      <mesh position={[10.12, 1.0, -0.3]}>
        <boxGeometry args={[0.1, 2.0, 3.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Murs intérieurs principaux */}
      {/* Entre séjour et chambre/sdb */}
      <Wall position={[-3.2, WALL_H / 2, -1.5]} size={[5.0, WALL_H, WALL_T]} />
      {/* Entre cuisine et cellier/garage */}
      <Wall position={[3.0, WALL_H / 2, -1.2]} size={[3.5, WALL_H, WALL_T]} />

      {/* Volumes colorés (légers) pour repérer les pièces */}
      <RoomVolume position={[-1.6, 1.35, 1.6]} size={[7.0, 2.6, 5.6]} color="#3b82f6" /> {/* Séjour */}
      <RoomVolume position={[2.8, 1.35, 1.4]} size={[3.0, 2.6, 3.8]} color="#f59e0b" /> {/* Cuisine */}
      <RoomVolume position={[-4.2, 1.35, -2.2]} size={[3.8, 2.6, 3.4]} color="#10b981" /> {/* Chambre 1 */}
      <RoomVolume position={[-1.4, 1.35, -2.4]} size={[2.2, 2.6, 2.0]} color="#06b6d4" /> {/* Bains 1 */}
      <RoomVolume position={[0.6, 1.35, -2.8]} size={[3.2, 2.6, 2.2]} color="#8b5cf6" /> {/* Entrée */}
      <RoomVolume position={[7.4, 1.1, -0.3]} size={[5.2, 2.2, 4.8]} color="#57534e" opacity={0.15} /> {/* Garage */}

      {/* ========== ÉTAGE (au-dessus du volume principal, pas du garage) ========== */}
      {showEtage && (
        <group position={[0, WALL_H, 0]}>
          {/* Dalle étage */}
          <Floor position={[-1.0, 0.02, 0.3]} size={[9.5, 7.8]} color="#ddd8ce" />

          {/* Murs étage */}
          <Wall position={[-1.0, WALL_H2 / 2, 3.9]} size={[9.0, WALL_H2, WALL_T]} /> {/* Sud */}
          <Wall position={[-5.5, WALL_H2 / 2, 0.2]} size={[WALL_T, WALL_H2, 7.4]} /> {/* Ouest */}
          <Wall position={[-1.0, WALL_H2 / 2, -3.5]} size={[9.0, WALL_H2, WALL_T]} /> {/* Nord */}
          <Wall position={[3.5, WALL_H2 / 2, 0.2]} size={[WALL_T, WALL_H2, 7.4]} /> {/* Est */}

          {/* Fenêtres étage (façades) */}
          <Glass position={[-2.5, 1.2, 3.92]} size={[1.4, 1.4, 0.08]} />
          <Glass position={[0.5, 1.2, 3.92]} size={[1.4, 1.4, 0.08]} />

          {/* Volumes pièces étage */}
          <RoomVolume position={[-3.0, 1.25, 0.0]} size={[3.0, 2.4, 3.4]} color="#10b981" /> {/* Ch 2 */}
          <RoomVolume position={[0.4, 1.25, 0.0]} size={[3.0, 2.4, 3.4]} color="#22c55e" /> {/* Ch 3 */}
          <RoomVolume position={[-1.2, 1.25, 2.2]} size={[4.0, 2.4, 2.4]} color="#a855f7" /> {/* Mezzanine */}
          <RoomVolume position={[2.2, 1.25, 1.6]} size={[2.4, 2.4, 2.8]} color="#06b6d4" /> {/* Bains 2 */}

          {/* Toiture plate pente 5 % (simplifiée) */}
          <mesh position={[-1.0, WALL_H2 + 0.12, 0.2]} castShadow>
            <boxGeometry args={[9.6, ROOF_H, 8.0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          {/* Acrotère */}
          <mesh position={[-1.0, WALL_H2 + 0.28, 0.2]}>
            <boxGeometry args={[9.8, 0.12, 8.2]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      )}

      {/* Toiture garage */}
      <mesh position={[7.4, 2.4, -0.3]} castShadow>
        <boxGeometry args={[5.6, ROOF_H, 5.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* ========== MOBILIER ========== */}
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
