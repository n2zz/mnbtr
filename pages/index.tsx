import Image from "next/image";
import { Inter } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Polyhedron from "@/components/Polyhedron";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import IPhone14 from "@/components/iPhone14";
import { useCallback, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnUploadClick = useCallback(() => {
    console.log("click01");
    if (inputRef.current) {
      console.log("click");
      inputRef.current.click();
    }
  }, [inputRef]);

  return (
    <main
      className={`flex h-screen flex-row items-center justify-between relative ${inter.className}`}>
      <div className='basis-1/2 w-full flex flex-col items-center justify-center h-screen'>
        <Canvas
          shadows
          camera={{ position: [0, 0, -80], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
          // eventSource={document.getElementById("root")}
          eventPrefix='client'>
          <ambientLight intensity={0.5} />
          <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr' />
          {started && <IPhone14 />}
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </div>
      <div className='flex-1 flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold'>MocknButter</h1>
        <h2 className='text-2xl font-bold'>가장 쉬운 목업 제작 방법</h2>
        <div className='flex flex-col items-center justify-center mt-32'>
          <button
            onClick={() => handleOnUploadClick()}
            className='bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-5 rounded shadow-xl cursor-pointer'>
            이미지 업로드 하기
          </button>
          <input
            ref={inputRef}
            type='file'
            name='file'
            id='file'
            className='hidden'
          />
        </div>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center h-screen absolute inset-0 bg-[#DCE0E1] transition-opacity duration-500 ${
          started ? "hidden" : ""
        }`}>
        <h1 className='text-6xl font-bold'>MocknButter</h1>
        <h2 className='text-2xl font-bold'>가장 쉬운 목업 제작 방법</h2>
        <button
          className='bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 rounded shadow-xl mt-12 px-12'
          onClick={() => setStarted(true)}>
          시작하기
        </button>
      </div>
    </main>
  );
}
