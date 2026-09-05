import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Sky } from '@react-three/drei';
import { useStudio } from '../store.js';
import House3D from './House3D.jsx';
import WalkthroughControls from './WalkthroughControls.jsx';

export default function Scene() {
  const walkthrough = useStudio((s) => s.walkthrough);
  const select = useStudio((s) => s.select);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      style={{ background: walkthrough ? '#87CEEB' : 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
      onPointerMissed={() => select(null)}
    >
      {walkthrough ? (
        <PerspectiveCamera makeDefault position={[0, 1.65, 4]} fov={75} />
      ) : (
        <PerspectiveCamera makeDefault position={[14, 11, 16]} fov={42} />
      )}

      <ambientLight intensity={walkthrough ? 0.55 : 0.35} />
      <directionalLight
        position={[12, 18, 8]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 6, -4]} intensity={0.25} />

      {walkthrough && <Sky sunPosition={[80, 30, 50]} />}

      <House3D />

      <ContactShadows position={[0, 0.02, 0]} opacity={0.4} scale={40} blur={2} far={12} />

      {walkthrough ? (
        <WalkthroughControls enabled />
      ) : (
        <OrbitControls
          makeDefault
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={5}
          maxDistance={40}
          target={[0, 1.2, 0]}
          enableDamping
          dampingFactor={0.08}
        />
      )}

      <Environment preset="city" />
    </Canvas>
  );
}
