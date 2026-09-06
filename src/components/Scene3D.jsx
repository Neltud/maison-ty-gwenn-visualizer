import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { useStudio } from '../store.js';
import House3D from './House3D.jsx';
import WalkthroughControls from './WalkthroughControls.jsx';

export default function Scene3D() {
  const walkthrough = useStudio((s) => s.walkthrough);
  const rotateSelected = useStudio((s) => s.rotateSelected);
  const deleteSelected = useStudio((s) => s.deleteSelected);
  const selectedId = useStudio((s) => s.selectedId);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'r' || e.key === 'R') rotateSelected();
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) deleteSelected();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rotateSelected, deleteSelected, selectedId]);

  return (
    <Canvas shadows dpr={[1, 1.75]} gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={['#0b1220']} />
      <fog attach="fog" args={['#0b1220', 28, 55]} />

      <PerspectiveCamera makeDefault position={[14, 11, 16]} fov={42} />

      <Suspense fallback={null}>
        <House3D />
        <ContactShadows position={[0, -0.02, 0]} opacity={0.45} scale={40} blur={2.2} far={12} />
        <Environment preset="city" />
      </Suspense>

      {walkthrough ? (
        <WalkthroughControls />
      ) : (
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={6}
          maxDistance={42}
          maxPolarAngle={Math.PI / 2.05}
          target={[1, 1.2, 0.5]}
        />
      )}
    </Canvas>
  );
}
