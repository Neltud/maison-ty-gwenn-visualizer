import { useStudio } from '../store.js';
import FurnitureMesh from './FurnitureMesh.jsx';

/**
 * Maison TY GWENN – modèle fidèle aux plans signés (PDF)
 *
 * Sources :
 *  - Tableau surfaces (p.1)
 *  - Plan masse + Nord (p.2)
 *  - Perspective (p.3 & p.8)
 *  - RDC 1/75 cotes 14,90 m (p.4)
 *  - Étage 1/75 (p.5)
 *  - Coupes AA/BB hauteur + pente 5% (p.6)
 *  - Façades Sud/Ouest/Nord/Est (p.7)
 *
 * Axes : X+ = Est (garage) · Z+ = Sud (baies) · Y+ = haut
 * Origine ≈ centre du séjour
 */

const H = 2.70; // hauteur RDC (coupe)
const H2 = 2.50; // hauteur étage
const T = 0.20; // épaisseur mur

function Box({ pos, size, color = '#f5f5f4', opacity = 1, metalness = 0, roughness = 0.85 }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        metalness={metalness}
        roughness={roughness}
        depthWrite={opacity >= 1}
      />
    </mesh>
  );
}

function Glass({ pos, size }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#bae6fd"
        transparent
        opacity={0.32}
        roughness={0.05}
        metalness={0.15}
        depthWrite={false}
      />
    </mesh>
  );
}

function Floor({ pos, size, color = '#e7e5e4' }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={pos} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
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

  const onFloor = (e) => {
    e.stopPropagation();
    const p = e.point;
    if (tool === 'furnish') placeFurniture(p.x, -p.z);
    else if (tool === 'select' && selectedId) moveSelected(p.x, -p.z);
    else select(null);
  };

  /*
   * Emprise RDC d’après plan p.4 (approximations cotes lisibles) :
   * Largeur Est-Ouest ≈ 14,90 m
   * Profondeur Nord-Sud ≈ 10,2 m (volume principal) + garage
   *
   * Découpage X (Ouest → Est) :
   *  Chambre1 ~ 3,9 m | Séjour/Entrée ~ 6,2 m | Cuisine/Cellier ~ 2,5 m | Garage ~ 5,3 m
   * Découpage Z (Nord → Sud) :
   *  Bande nord (chambre/entrée/garage) ~ 4,0 m | Séjour/cuisine ~ 6,2 m
   */

  return (
    <group>
      {/* ===== TERRAIN + SOLEIL (Nord plan masse) ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, -0.08, 0.5]} receiveShadow onClick={onFloor}>
        <planeGeometry args={[42, 34]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Soleil côté Sud-Est (orientation plan masse) */}
      <directionalLight
        position={[12, 18, 14]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#e0f2fe', '#1e293b', 0.35]} />

      {/* ===== DALLES ===== */}
      {/* Volume principal RDC */}
      <Floor pos={[-0.6, 0.01, 0.5]} size={[10.2, 9.8]} color="#e7e5e4" />
      {/* Garage (niveau -0.17) */}
      <Floor pos={[7.5, -0.16, -0.4]} size={[5.5, 5.4]} color="#d6d3d1" />

      {/* =========================================================
          MURS PÉRIPHÉRIQUES RDC (contour bleu plan p.4)
          ========================================================= */}

      {/* --- FAÇADE SUD (Z+) – grandes baies séjour + cuisine --- */}
      <Box pos={[-3.8, H / 2, 5.2]} size={[3.6, H, T]} /> {/* angle SO */}
      <Glass pos={[-1.6, 1.25, 5.22]} size={[4.0, 2.2, 0.06]} /> {/* baie séjour */}
      <Box pos={[1.0, H / 2, 5.2]} size={[1.2, H, T]} /> {/* trumeau */}
      <Glass pos={[2.4, 1.25, 5.22]} size={[2.0, 2.2, 0.06]} /> {/* baie cuisine */}
      <Box pos={[3.8, H / 2, 5.2]} size={[1.0, H, T]} /> {/* angle SE volume principal */}

      {/* --- FAÇADE OUEST (X-) – chambre 1 --- */}
      <Box pos={[-6.0, H / 2, 0.6]} size={[T, H, 9.2]} />
      <Glass pos={[-6.01, 1.3, -1.8]} size={[0.06, 1.5, 1.3]} /> {/* fenêtre chambre */}
      <Glass pos={[-6.01, 1.3, 2.8]} size={[0.06, 1.5, 1.6]} /> {/* fenêtre séjour Ouest */}

      {/* --- FAÇADE NORD (Z-) – chambre 1 + entrée --- */}
      <Box pos={[-3.5, H / 2, -4.2]} size={[5.0, H, T]} />
      <Box pos={[0.5, H / 2, -4.2]} size={[3.0, H, T]} />
      <Glass pos={[-4.5, 1.35, -4.21]} size={[1.2, 1.4, 0.06]} /> {/* ch1 */}
      <Glass pos={[-1.5, 1.35, -4.21]} size={[1.0, 1.4, 0.06]} /> {/* entrée */}

      {/* --- MUR EST volume principal (vers cellier/garage) --- */}
      <Box pos={[4.3, H / 2, 0.6]} size={[T, H, 9.2]} />

      {/* --- GARAGE (Est) --- */}
      <Box pos={[7.5, 1.15, 2.2]} size={[5.4, 2.3, T]} /> {/* sud garage */}
      <Box pos={[7.5, 1.15, -3.0]} size={[5.4, 2.3, T]} /> {/* nord garage */}
      <Box pos={[10.15, 1.15, -0.4]} size={[T, 2.3, 5.2]} /> {/* est garage */}
      {/* Porte de garage façade Est */}
      <Box pos={[10.16, 1.05, -0.4]} size={[0.08, 2.05, 3.4]} color="#1e293b" metalness={0.4} roughness={0.45} />

      {/* =========================================================
          MURS INTÉRIEURS RDC
          ========================================================= */}

      {/* Séparation chambre 1 / sdb+séjour */}
      <Box pos={[-3.0, H / 2, -1.2]} size={[5.6, H, T]} />
      {/* Séparation sdb / WC */}
      <Box pos={[-1.6, H / 2, -2.4]} size={[T, H, 2.4]} />
      {/* Mur entrée / séjour (partiel) */}
      <Box pos={[0.4, H / 2, -1.6]} size={[2.8, H, T]} />
      {/* Cuisine / cellier */}
      <Box pos={[3.0, H / 2, -1.0]} size={[2.6, H, T]} />
      {/* Cellier / garage */}
      <Box pos={[5.2, H / 2, -0.8]} size={[T, H, 3.6]} />

      {/* =========================================================
          VOLUMES PIÈCES (transparents, repères surfaces PDF)
          ========================================================= */}
      <Box pos={[-1.8, 1.35, 1.8]} size={[7.0, 2.6, 5.8]} color="#3b82f6" opacity={0.07} /> {/* Séjour 32,59 */}
      <Box pos={[2.9, 1.35, 1.5]} size={[2.8, 2.6, 3.6]} color="#f59e0b" opacity={0.07} /> {/* Cuisine 13,22 */}
      <Box pos={[-4.3, 1.35, -2.3]} size={[3.6, 2.6, 3.4]} color="#10b981" opacity={0.07} /> {/* Ch1 15,88 */}
      <Box pos={[-1.5, 1.35, -2.5]} size={[2.0, 2.6, 2.0]} color="#06b6d4" opacity={0.07} /> {/* Bains1 */}
      <Box pos={[0.5, 1.35, -2.9]} size={[3.0, 2.6, 2.2]} color="#8b5cf6" opacity={0.07} /> {/* Entrée */}
      <Box pos={[7.5, 1.1, -0.4]} size={[5.2, 2.15, 5.0]} color="#57534e" opacity={0.12} /> {/* Garage 23,54 */}

      {/* =========================================================
          ÉTAGE (p.5 + coupes + façades)
          ========================================================= */}
      {showEtage && (
        <group position={[0, H, 0]}>
          <Floor pos={[-1.0, 0.01, 0.4]} size={[9.2, 7.6]} color="#ddd6ce" />

          {/* Murs périphériques étage */}
          <Box pos={[-1.0, H2 / 2, 3.9]} size={[9.0, H2, T]} /> {/* Sud */}
          <Box pos={[-5.4, H2 / 2, 0.3]} size={[T, H2, 7.2]} /> {/* Ouest */}
          <Box pos={[-1.0, H2 / 2, -3.3]} size={[9.0, H2, T]} /> {/* Nord */}
          <Box pos={[3.4, H2 / 2, 0.3]} size={[T, H2, 7.2]} /> {/* Est */}

          {/* Fenêtres étage (façades Sud / Ouest) */}
          <Glass pos={[-2.6, 1.2, 3.92]} size={[1.5, 1.35, 0.06]} />
          <Glass pos={[0.4, 1.2, 3.92]} size={[1.5, 1.35, 0.06]} />
          <Glass pos={[-5.41, 1.2, -0.5]} size={[0.06, 1.35, 1.3]} />

          {/* Murs intérieurs étage */}
          <Box pos={[-1.3, H2 / 2, 0.0]} size={[T, H2, 3.6]} /> {/* entre ch2 / ch3 */}
          <Box pos={[-1.0, H2 / 2, -1.6]} size={[5.5, H2, T]} /> {/* chambres / mezzanine */}

          {/* Volumes */}
          <Box pos={[-3.0, 1.25, 0.2]} size={[3.0, 2.4, 3.4]} color="#10b981" opacity={0.08} /> {/* Ch2 9,44 */}
          <Box pos={[0.5, 1.25, 0.2]} size={[3.0, 2.4, 3.4]} color="#22c55e" opacity={0.08} /> {/* Ch3 9,41 */}
          <Box pos={[-1.2, 1.25, 2.2]} size={[4.0, 2.4, 2.4]} color="#a855f7" opacity={0.08} /> {/* Mezzanine 6,54 */}
          <Box pos={[2.2, 1.25, 1.5]} size={[2.2, 2.4, 2.6]} color="#06b6d4" opacity={0.08} /> {/* Bains2 */}

          {/* Toiture plate + acrotère (pente 5% simplifiée) */}
          <Box pos={[-1.0, H2 + 0.1, 0.3]} size={[9.4, 0.16, 7.8]} color="#1e293b" />
          <Box pos={[-1.0, H2 + 0.26, 0.3]} size={[9.6, 0.1, 8.0]} color="#0f172a" />
        </group>
      )}

      {/* Toiture garage */}
      <Box pos={[7.5, 2.38, -0.4]} size={[5.6, 0.16, 5.5]} color="#1e293b" />

      {/* ===== MOBILIER ===== */}
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
