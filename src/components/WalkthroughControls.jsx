import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

export default function WalkthroughControls({ enabled }) {
  const { camera, gl } = useThree();
  const controls = useRef();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const keys = useRef({ forward: false, backward: false, left: false, right: false, sprint: false });

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.forward = true; break;
        case 'KeyS': case 'ArrowDown': keys.current.backward = true; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = true; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = true; break;
        case 'ShiftLeft': case 'ShiftRight': keys.current.sprint = true; break;
      }
    };
    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.forward = false; break;
        case 'KeyS': case 'ArrowDown': keys.current.backward = false; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = false; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = false; break;
        case 'ShiftLeft': case 'ShiftRight': keys.current.sprint = false; break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [enabled]);

  useFrame((_, delta) => {
    if (!enabled || !controls.current?.isLocked) return;

    const speed = keys.current.sprint ? 8 : 3.5;
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z = Number(keys.current.forward) - Number(keys.current.backward);
    direction.current.x = Number(keys.current.right) - Number(keys.current.left);
    direction.current.normalize();

    if (keys.current.forward || keys.current.backward) velocity.current.z -= direction.current.z * speed * delta;
    if (keys.current.left || keys.current.right) velocity.current.x -= direction.current.x * speed * delta;

    controls.current.moveRight(-velocity.current.x * delta * 60);
    controls.current.moveForward(-velocity.current.z * delta * 60);

    // Keep camera at eye height
    camera.position.y = 1.65;
  });

  if (!enabled) return null;

  return <PointerLockControls ref={controls} />;
}