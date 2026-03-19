"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Obj from "./Mesh";

export default function Scene() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: false }}
            camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                <Obj />
            </Suspense>
        </Canvas>
    )
}