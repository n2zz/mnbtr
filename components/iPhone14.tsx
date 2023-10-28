import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useProgress } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function IPhone14(props: GroupProps) {
  const [loadState, setLoadState] = useState<string>();
  const [wallpapers, setWallpapers] = useState<ImageBitmap[]>([]);
  const [index, setIndex] = useState<number>(0);

  const primitiveRef = useRef<any>(null);
  // const { nodes, materials }: any = useGLTF("/iphone-3rd.glb");
  const { scene } = useGLTF("/iPhone.gltf");
  const { progress } = useProgress();

  // useEffect로 빼기
  useEffect(() => {
    const loader = new THREE.ImageBitmapLoader();
    if (wallpapers.length === 0) {
      loader.load("/cdnbt.png", (image) => {
        setWallpapers([image]);
      });
    } else if (wallpapers.length === 1) {
      loader.load("/candy.png", (image) => {
        setWallpapers((prev) => [...prev, image]);
      });
    } else if (wallpapers.length === 2) {
      loader.load("/yogiyo.png", (image) => {
        setWallpapers((prev) => [...prev, image]);
      });
    } else if (wallpapers.length === 3) {
      loader.load("/Image_0.jpg", (image) => {
        setWallpapers((prev) => [...prev, image]);
      });
    } else if (wallpapers.length === 4) {
      const inteval = setInterval(() => {
        setIndex((prev) => (prev + 1) % 4);
      }, 5000);
      return () => clearInterval(inteval);
    }
  }, [wallpapers, primitiveRef, scene.children]);

  useEffect(() => {
    if (loadState === "wallpaper") {
      primitiveRef.current.children[7].material.map.image = wallpapers[index];
      primitiveRef.current.children[7].material.map.needsUpdate = true;
    }
  }, [wallpapers, index, loadState]);

  useEffect(() => {
    if (progress === 100) {
      primitiveRef.current.position.y = -50;
      setLoadState("loaded");
    }
  }, [progress, primitiveRef]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (loadState === "loaded") {
      primitiveRef.current.rotation.set(
        Math.cos(t / 2) / 8,
        Math.cos(t / 2) / 8 + t * 3,
        0
      );
      primitiveRef.current.position.y =
        primitiveRef.current.position.y + 0.3 + (1 + Math.sin(t / 1.5)) / 10;
      if (primitiveRef.current.position.y >= 0) {
        setLoadState("lifted");
      }
    } else if (loadState === "lifted") {
      primitiveRef.current.rotation.set(
        Math.cos(t / 2) / 8,
        Math.cos(t / 2) / 8 + t * 3,
        0
      );
      const deg = (primitiveRef.current.rotation.y * (180 / Math.PI)) % 360;
      if (deg > 4 && deg < 8) {
        setLoadState("pinned");
        setTimeout(() => {
          setLoadState("wallpaper");
        }, 5000);
      }
    } else {
      primitiveRef.current.rotation.set(
        Math.cos(t / 2) / 8,
        Math.sin(t / 2) / 8,
        0
      );
      primitiveRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <>
      <primitive
        ref={primitiveRef}
        object={scene}
        {...props}
        scale={new THREE.Vector3(300, 300, 300)}
      />
    </>
  );
}

useGLTF.preload("/iPhone 14 Pro.glb");
