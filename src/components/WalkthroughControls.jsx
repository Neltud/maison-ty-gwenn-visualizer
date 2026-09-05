import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

export default function WalkthroughControls({ enabled }) {
  const { camera } = useThree();
  const controls = useRef();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const keys = useRef({ forward: false, backward: false, left: false, right: false, sprint: false });

  useEffect(() => {
    if (!enabled) return;
    const down = (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.forward = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.backward = true;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.right = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.sprint = true;
    };
    const up = (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.forward = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.backward = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.right = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.current.sprint = false;
    };
    document.addEventListener('keydown', down);
    document.addEventListener('keyup', up);
    return () => {
      document.removeEventListener('keydown', down);
      document.removeEventListener('keyup', up);
    };
  }, [enabled]);

  useFrame((_, delta) => {
    if (!enabled || !controls.current?.isLocked) return;
    const speed = keys.current.sprint ? 7 : 3.2;
    velocity.current.x -= velocity.current.x * 8 * delta;
    velocity.current.z -= velocity.current.z * 8 * delta;
    direction.current.z = Number(keys.current.forward) - Number(keys.current.backward);
    direction.current.x = Number(keys.current.right) - Number(keys.current.left);
    direction.current.normalize();
    if (keys.current.forward || keys.current.backward)
      velocity.current.z -= direction.current.z * speed * delta;
    if (keys.current.left || keys.current.right)
      velocity.current.x -= direction.current.x * speed * delta;
    controls.current.moveRight(-velocity.current.x * delta * 55);
    controls.current.moveForward(-velocity.current.z * delta * 55);
    camera.position.y = 1.65;
  });

  if (!enabled) return null;
  return <PointerLockControls ref={controls} />;
}
