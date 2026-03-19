"use client";

import {useRef, useMemo } from "react";
import {ThreeEvent, useFrame, useThree} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader} from "@/lib/Shader";
import gsap from "gsap";

export default function Mesh() {
    const { viewport } = useThree();
    const materialRef = useRef<THREE.RawShaderMaterial>(null);
    const timeRef = useRef(0);
    const maskVisibility = useRef({ value: 0 });
    const maskPosition = useRef({ x: 0, y: 0 });

    const [frontTexture, backTexture] = useTexture([
       "/images/look.jpg",
       "/images/blue.jpg"
    ]);

    const planeRatio = viewport.width / viewport.height;

    useFrame(() => {
        if (!materialRef.current) return;
        const u = materialRef.current.uniforms;

        timeRef.current += 1;
        u.u_time.value = timeRef.current;
        u.u_maskVisibility.value = maskVisibility.current.value;
        u.u_maskPosition.value.set(maskPosition.current.x, maskPosition.current.y);
        u.uPlaneRatio.value = planeRatio;
    });

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        maskPosition.current = {
            x: e.point.x / viewport.width,
            y: e.point.y / viewport.height,
        };
    };

    const handlePointerEnter = () => {
        gsap.to(maskVisibility.current, { value: 1, duration: 0.5 });
    };

    const handlePointerLeave = () => {
        gsap.to(maskVisibility.current, { value: 0, duration: 0.5 });
    };

    const uniforms = useMemo(() => ({
        uPlaneRatio:       { value: planeRatio },
        u_frontTexture:    { value: frontTexture },
        u_backTexture:     { value: backTexture },
        u_time:            { value: 0 },
        u_maskVisibility:  { value: 0 },
        u_maskPosition:    { value: new THREE.Vector2(0, 0) }
    }), [planeRatio, frontTexture, backTexture]);

    return (
        <mesh
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry args={[viewport.width, viewport.height]} />
            <rawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    )

}