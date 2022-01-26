import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Currency(props) {

  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader,'../models/0Coin.glb')

  useFrame(() => (group.current.rotation.z += 0.003))
  return (
    <group ref={group} {...props} rotation={[90,0,0]} onClick={(event) => console.log("hi")}>
      <mesh geometry={nodes.Coin.geometry} material={materials.Coin} />
      <mesh geometry={nodes.Zero.geometry} material={materials.Zero} />
    </group>
  ) 
}

export default Currency;