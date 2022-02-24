import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


//the 3d coin that's spinning
function Currency(props) {

  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader,'../models/0Coin.glb')

  useFrame(() => (group.current.rotation.z += 0.003))//rate of spin on z axis
  return (
    <group ref={group} {...props} rotation={[90,0,0]}>
      <mesh geometry={nodes.Coin.geometry} material={materials.Coin} />
      <mesh geometry={nodes.Zero.geometry} material={materials.Zero} />
    </group>
  ) 
}

export default Currency;