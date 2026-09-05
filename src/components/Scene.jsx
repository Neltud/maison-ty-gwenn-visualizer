import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Sky } from '@react-three/drei';
import House3D from './House3D.jsx';
import WalkthroughControls from './WalkthroughControls.jsx';

export default function Scene({ selectedRoom, onSelectRoom, showEtage, walkthrough }) {
  return (
    <Canvas shadows style={{ background: walkthrough ? '#87CEEB' : 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
      {walkthrough ? (
        <PerspectiveCamera makeDefault position={[0, 1.65, 4]} fov={75} />
      ) : (
        <PerspectiveCamera makeDefault position={[12, 10, 14]} fov={45} />
      )}

      <ambientLight intensity={walkthrough ? 0.6 : 0.4} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-8, 8, -5]} intensity={0.3} />

      {walkthrough && <Sky sunPosition={[100, 20, 100]} />}

      <House3D
        selectedRoom={selectedRoom}
        onSelectRoom={onSelectRoom}
        showEtage={showEtage}
      />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={40}
        blur={2}
        far={20}
      />

      {walkthrough ? (
        <WalkthroughControls enabled={walkthrough} />
      ) : (
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={6}
          maxDistance={35}
          enablePan={true}
          target={[0, 1.5, 0]}
        />
      )}

      <Environment preset="city" />
    </Canvas>
  );
}