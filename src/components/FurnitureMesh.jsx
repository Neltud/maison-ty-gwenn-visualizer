export default function FurnitureMesh({ item, selected }) {
  const { type, width: w, depth: d, height: h } = item;

  return (
    <group position={[item.x, 0, -item.y]} rotation={[0, item.rotation, 0]}>
      {renderType(type, w, d, h)}
      {selected && (
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.55, Math.max(w, d) * 0.65, 32]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

function Mat({ color, roughness = 0.6, metalness = 0 }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />;
}

function renderType(type, w, d, h) {
  switch (type) {
    case 'sofa':
    case 'armchair':
      return (
        <group>
          <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, 0.28, d]} />
            <Mat color="#4d5c56" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.48, -d / 2 + 0.1]} castShadow>
            <boxGeometry args={[w - 0.08, 0.42, 0.16]} />
            <Mat color="#3f4d48" roughness={0.8} />
          </mesh>
          <mesh position={[-w / 2 + 0.08, 0.38, 0]} castShadow>
            <boxGeometry args={[0.14, 0.36, d - 0.1]} />
            <Mat color="#3f4d48" roughness={0.8} />
          </mesh>
          <mesh position={[w / 2 - 0.08, 0.38, 0]} castShadow>
            <boxGeometry args={[0.14, 0.36, d - 0.1]} />
            <Mat color="#3f4d48" roughness={0.8} />
          </mesh>
        </group>
      );
    case 'bed-double':
    case 'bed-single':
      return (
        <group>
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, 0.24, d]} />
            <Mat color="#5c4638" />
          </mesh>
          <mesh position={[0, 0.34, 0]} castShadow>
            <boxGeometry args={[w - 0.08, 0.16, d - 0.12]} />
            <Mat color="#d9d1c3" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.52, -d / 2 + 0.04]} castShadow>
            <boxGeometry args={[w, 0.7, 0.08]} />
            <Mat color="#4a3b30" />
          </mesh>
        </group>
      );
    case 'table-dining':
    case 'table-coffee':
    case 'desk':
    case 'console':
      return (
        <group>
          <mesh position={[0, h - 0.03, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, 0.06, d]} />
            <Mat color={type === 'table-coffee' ? '#6b5344' : '#c9b08a'} roughness={0.45} />
          </mesh>
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
            <mesh key={i} position={[(w / 2 - 0.1) * sx, h / 2 - 0.03, (d / 2 - 0.1) * sz]} castShadow>
              <boxGeometry args={[0.06, h - 0.06, 0.06]} />
              <Mat color="#4a3b30" />
            </mesh>
          ))}
        </group>
      );
    case 'chair':
      return (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[w, 0.05, d]} />
            <Mat color="#c4a574" />
          </mesh>
          <mesh position={[0, 0.72, -d / 2 + 0.03]} castShadow>
            <boxGeometry args={[w, 0.5, 0.05]} />
            <Mat color="#c4a574" />
          </mesh>
        </group>
      );
    case 'kitchen-run':
      return (
        <group>
          <mesh position={[0, h / 2 - 0.06, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h - 0.12, d]} />
            <Mat color="#ece6da" roughness={0.7} />
          </mesh>
          <mesh position={[0, h - 0.03, 0]} castShadow>
            <boxGeometry args={[w + 0.02, 0.06, d + 0.04]} />
            <Mat color="#6f6860" roughness={0.35} metalness={0.15} />
          </mesh>
        </group>
      );
    case 'fridge':
      return (
        <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <Mat color="#e8e4dc" roughness={0.35} metalness={0.2} />
        </mesh>
      );
    case 'wardrobe':
      return (
        <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <Mat color="#8a6a4b" />
        </mesh>
      );
    case 'tv-stand':
      return (
        <group>
          <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <Mat color="#3a3530" />
          </mesh>
          <mesh position={[0, h + 0.4, 0]} castShadow>
            <boxGeometry args={[w * 0.85, 0.7, 0.06]} />
            <Mat color="#1c1916" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      );
    case 'plant':
      return (
        <group>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.24, 10]} />
            <Mat color="#6f6860" />
          </mesh>
          <mesh position={[0, 0.5, 0]} castShadow>
            <sphereGeometry args={[0.22, 12, 10]} />
            <Mat color="#2f4a40" roughness={0.9} />
          </mesh>
        </group>
      );
    default:
      return (
        <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <Mat color="#94a3b8" />
        </mesh>
      );
  }
}
