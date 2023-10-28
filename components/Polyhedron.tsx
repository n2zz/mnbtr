import React, { useRef, useState } from 'react'
import { Vector3, useFrame } from '@react-three/fiber'

const Polyhedron = ({ position, polyhedron }: { position: Vector3, polyhedron: any }) => {
  const ref = useRef<any>();
  const [count, setCount] = useState(0);

  console.log(typeof ref);

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.5 * delta
    ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={'lime'} wireframe />
    </mesh>
  )
};

export default Polyhedron;
