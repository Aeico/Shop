import React, { useRef } from 'react'
import { useFrame, Canvas, useGLTF } from '@react-three/fiber'

//    <mesh geometry={nodes.Cube.geometry} material={materials.Cube} />
//    <mesh geometry={nodes.Sphere.geometry} material={materials.Sphere} position={[0, 1.31, 0]} />

function Currency(props) {
  const mesh = useRef()
  //const { nodes, materials } = useGLTF('../models/test2.glb')
  useFrame((state, delta) => (mesh.current.rotation.x += 0.001, mesh.current.rotation.y += 0.002))
  return (
        <mesh  {...props} ref={mesh}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
  )
}

export default Currency;