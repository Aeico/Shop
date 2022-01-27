import '../App.css';
import axios from "axios";
import React, { Component, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Currency from './Currency';

//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

export function PostUser(props) {
  const [post, setPost] = React.useState(null);
  const user = { user_id: props.user_id, name: props.name, currency: props.currency }
  React.useEffect(() => {
    axios.post('http://127.0.0.1:8000/user/1/', user)
      .then((response) => {
        setPost(response.data)
      });
  }, []);

  if (!post) return <p>Loading</p>;
  return (
    <div className='h-full w-full p-6 bg-orange-700 items-center text-3xl shadow-lg'>
      <p>Hello {post.name}!</p>
      <div className='pt-5 inline-flex items-center'>Your
        <div className='w-20 h-20 inline-flex pt-1'>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <Currency />
          </Canvas>
        </div>
        : {post.currency}
      </div>
    </div>
  )
}

export default PostUser;