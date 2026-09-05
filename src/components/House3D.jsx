import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Edges } from '@react-three/drei';
import { dimensions } from '../data/rooms.js';

function Room({ position, size, color, selected, onClick, name }) {
  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.(name); }}>
      <Box args={size}>
        <meshStandardMaterial
          color={selected ? '#60a5fa' : color}
          transparent
          opacity={selected ? 0.9 : 0.75}
          roughness={0.4}
        />
      </Box>
      <Edges color={selected ? '#ffffff' : '#1e293b'} threshold={15} />
    </group>
  );
}

export default function House3D({ selectedRoom, onSelectRoom, showEtage = true }) {
  const group = useRef();

  // Layout simplifié fidèle aux plans (échelle en mètres)
  // Origine au centre du séjour approximativement

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[30, 25]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* === REZ-DE-CHAUSSÉE === */}

      {/* Séjour (grand volume central) */}
      <Room
        position={[-1.5, 1.35, 1.5]}
        size={[7.5, 2.7, 5.5]}
        color="#3b82f6"
        selected={selectedRoom === 'sejour'}
        onClick={onSelectRoom}
        name="sejour"
      />

      {/* Cuisine (à droite du séjour) */}
      <Room
        position={[3.8, 1.35, 0.8]}
        size={[3.2, 2.7, 4.2]}
        color="#f59e0b"
        selected={selectedRoom === 'cuisine'}
        onClick={onSelectRoom}
        name="cuisine"
      />

      {/* Entrée */}
      <Room
        position={[1.2, 1.35, -2.8]}
        size={[3.5, 2.7, 2.2]}
        color="#8b5cf6"
        selected={selectedRoom === 'entree'}
        onClick={onSelectRoom}
        name="entree"
      />

      {/* Chambre 1 */}
      <Room
        position={[-4.5, 1.35, -2.2]}
        size={[4.2, 2.7, 3.8]}
        color="#10b981"
        selected={selectedRoom === 'chambre1'}
        onClick={onSelectRoom}
        name="chambre1"
      />

      {/* Bains 1 + WC 1 */}
      <Room
        position={[-1.8, 1.35, -2.5]}
        size={[2.2, 2.7, 2.0]}
        color="#06b6d4"
        selected={selectedRoom === 'bains1' || selectedRoom === 'wc1'}
        onClick={onSelectRoom}
        name="bains1"
      />

      {/* Cellier */}
      <Room
        position={[4.5, 1.35, -2.0]}
        size={[2.0, 2.7, 2.4]}
        color="#78716c"
        selected={selectedRoom === 'cellier'}
        onClick={onSelectRoom}
        name="cellier"
      />

      {/* Garage */}
      <Room
        position={[7.5, 1.2, -0.5]}
        size={[5.5, 2.4, 4.5]}
        color="#57534e"
        selected={selectedRoom === 'garage'}
        onClick={onSelectRoom}
        name="garage"
      />

      {/* === ÉTAGE === */}
      {showEtage && (
        <group position={[0, 2.75, 0]}>
          {/* Chambre 2 */}
          <Room
            position={[-3.2, 1.25, -0.5]}
            size={[3.5, 2.5, 3.0]}
            color="#10b981"
            selected={selectedRoom === 'chambre2'}
            onClick={onSelectRoom}
            name="chambre2"
          />

          {/* Chambre 3 */}
          <Room
            position={[0.5, 1.25, -0.5]}
            size={[3.5, 2.5, 3.0]}
            color="#22c55e"
            selected={selectedRoom === 'chambre3'}
            onClick={onSelectRoom}
            name="chambre3"
          />

          {/* Mezzanine */}
          <Room
            position={[-1.3, 1.25, 2.2]}
            size={[4.0, 2.5, 2.0]}
            color="#a855f7"
            selected={selectedRoom === 'mezzanine'}
            onClick={onSelectRoom}
            name="mezzanine"
          />

          {/* Bains 2 + WC 2 */}
          <Room
            position={[2.8, 1.25, 1.5]}
            size={[2.5, 2.5, 2.5]}
            color="#06b6d4"
            selected={selectedRoom === 'bains2' || selectedRoom === 'wc2'}
            onClick={onSelectRoom}
            name="bains2"
          />

          {/* Toit simplifié */}
          <mesh position={[0, 2.8, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[12, 0.3, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      )}

      {/* Contour général RDC */}
      <mesh position={[0.5, 1.35, 0]}>
        <boxGeometry args={[15.5, 2.7, 9]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.08} wireframe={false} />
      </mesh>
    </group>
  );
}