"use client";

import {useRef, useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader} from "@/lib/Shader";

export default function Mesh() {
    const { viewport } = useThree();
    const materailRef = useRef<THREE.RawShaderMaterial>(null);
    const timeRef = useRef(0);
    const maskVisibility = useRef({ value: 0 });
    const maskPosition = useRef({ x: 0, y: 0 });

    const [frontTexture, backTexture] = useTexture([
       "/images/look.jpg",
       "/images/blue.jpg"
    ]);

}