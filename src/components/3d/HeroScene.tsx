"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function GalaxyBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color1 = new THREE.Color("#c084fc"); // Purple
    const color2 = new THREE.Color("#ffffff"); // White
    
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 40 + 5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  // Subtle parallax effect and continuous orbit
  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

      {/* Sketchfab-style Interactive Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />

      {/* Deep purple-black background */}
      <color attach="background" args={["#010005"]} />

      {/* Minimal ambient so shaders dominate */}
      <ambientLight intensity={0.02} color="#0a0118" />

      {/* Wide purple rim fills at left/right horizon corners */}
      <pointLight position={[-14, -2, -10]} intensity={9} color="#8800ff" distance={22} decay={1.2} />
      <pointLight position={[14, -2, -10]} intensity={9} color="#8800ff" distance={22} decay={1.2} />
      {/* Secondary softer inner fills */}
      <pointLight position={[-7, -1, -5]} intensity={3} color="#a030ff" distance={18} decay={2} />
      <pointLight position={[7, -1, -5]} intensity={3} color="#a030ff" distance={18} decay={2} />

      {/* HDRI Environment — subtle */}
      <Environment preset="night" />

      {/* ═══════ POST-PROCESSING ═══════ */}
      <EffectComposer>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.04}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.9}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>

      {/* ═══════════════ GALAXY BACKGROUND ═══════════════ */}
      <GalaxyBackground />

      {/* ═══════════════ EXISTING MODELS (UNTOUCHED) ═══════════════ */}

      <group ref={groupRef}>
        {/* Sci-Fi Arena Base */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <ShowRoomModel scale={1.5} position={[0, -2, 0]} rotation={[0, 0, 0]} />
        </Float>

        {/* Floating MacBook on the Left */}
        <MacbookModel scale={1.0} position={[-5.5, 0, 0.2]} rotation={[0, 1.2, 0]} />

        {/* Floating Phone on the Right */}
        <PhoneModel scale={1} position={[5, -0.05, 0.7]} rotation={[0, 3.5, -0.15]} />

        {/* Orbiting Elements */}
        <group ref={orbitRef}>
          {/* Active Crystal Swarm Physics */}
          <CrystalSwarm count={50} />
        </group>

      </group>
    </>
  );
}


/* ═══════════════════════════════════════════════════════
   CRACKED FLOOR — Dark reflective marble with thin purple veins
   Matches the reference: very dark surface, thin delicate cracks
   ═══════════════════════════════════════════════════════ */

const crackedFloorVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const crackedFloorFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float minDist = 1.0;
    float secondMin = 1.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        vec2 r = g - f + o;
        float d = dot(r, r);
        if (d < minDist) {
          secondMin = minDist;
          minDist = d;
        } else if (d < secondMin) {
          secondMin = d;
        }
      }
    }
    return secondMin - minDist;
  }

  void main() {
    // Use perspective-correct UV scaling so cracks look denser near horizon
    vec2 uv = vUv * vec2(10.0, 12.0);
    
    // PRIMARY crack network — bold visible veins
    float crack1 = voronoi(uv);
    // SECONDARY finer overlay cracks
    float crack2 = voronoi(uv * 2.1 + vec2(5.7, 3.1));
    
    // Sharp bright crack lines — much wider smoothstep so they're clearly visible
    float line1 = 1.0 - smoothstep(0.0, 0.03, crack1);
    float line2 = 1.0 - smoothstep(0.0, 0.02, crack2);
    float allCracks = max(line1, line2 * 0.7);
    
    // Wide soft glow halo around every crack
    float glow1 = 1.0 - smoothstep(0.0, 0.14, crack1);
    float glow2 = 1.0 - smoothstep(0.0, 0.09, crack2);
    float crackGlow = max(glow1, glow2 * 0.6);
    
    // Very dark obsidian floor — nearly black base
    vec3 baseColor = vec3(0.005, 0.002, 0.010);
    
    // Vivid electric purple crack colors (boosted for reference match)
    vec3 crackCore = vec3(0.85, 0.25, 1.0);   // Bright neon purple core
    vec3 crackOuter = vec3(0.45, 0.06, 0.82); // Wide violet halo
    
    // Pulse: subtle breathing animation
    float pulse = 0.88 + 0.12 * sin(uTime * 0.5 + vWorldPos.x * 0.3 + vWorldPos.z * 0.2);
    
    vec3 color = baseColor;
    // Reduced glow halo
    color += crackOuter * crackGlow * 0.52 * pulse;
    // Slightly reduced crack line brightness
    color += crackCore * allCracks * 1.05 * pulse;
    
    // Center mirror-strip reflection
    float centerDist = abs(vUv.x - 0.5);
    float reflectionStrength = exp(-centerDist * centerDist * 10.0) * smoothstep(0.2, 0.85, vUv.y) * 0.18;
    color += vec3(0.65, 0.58, 0.90) * reflectionStrength;
    
    // Left edge corner bloom — reduced
    float leftEdge = smoothstep(0.18, 0.0, vUv.x);
    color += vec3(0.55, 0.08, 0.95) * leftEdge * 0.55;
    // Right edge corner bloom — reduced
    float rightEdge = smoothstep(0.82, 1.0, vUv.x);
    color += vec3(0.55, 0.08, 0.95) * rightEdge * 0.55;
    
    // Horizon purple glow — reduced
    float horizonGlow = smoothstep(0.55, 1.0, vUv.y);
    color += vec3(0.55, 0.08, 1.0) * horizonGlow * 0.4;
    
    // Near-camera fade
    float frontFade = smoothstep(0.0, 0.05, vUv.y);
    color *= frontFade;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function CrackedFloor() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  const uniforms = useMemo(() => ({ uTime: { value: 0.0 } }), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
      <planeGeometry args={[50, 35, 1, 1]} />
      <shaderMaterial ref={matRef} vertexShader={crackedFloorVertexShader} fragmentShader={crackedFloorFragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOOR GLOW STRIP — Saturated purple corner flares at horizon
   ═══════════════════════════════════════════════════════ */

const floorGlowVS = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const floorGlowFS = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Height gradient — tallest at the bottom (horizon line), fading up
    float heightFade = 1.0 - smoothstep(0.0, 1.0, vUv.y);
    heightFade = pow(heightFade, 1.3);
    
    // Width falloff: inner edge is bright, outer edge fades
    float widthFade = 1.0 - smoothstep(0.0, 1.0, vUv.x);
    widthFade = pow(widthFade, 0.5); // softer falloff for wide bloom
    
    // Bright saturated magenta-purple (boosted to match reference)
    vec3 coreColor = vec3(0.85, 0.10, 1.0);  // vivid electric purple
    vec3 outerColor = vec3(0.45, 0.02, 0.88); // deep violet outer
    
    float pulse = 0.9 + 0.1 * sin(uTime * 0.6);
    vec3 color = mix(outerColor, coreColor, heightFade * 0.8) * pulse * 3.5;
    
    float alpha = heightFade * widthFade * 0.98;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

function FloorGlowStrip({ side }: { side: 'left' | 'right' }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const isLeft = side === 'left';
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  const uniforms = useMemo(() => ({ uTime: { value: 0.0 } }), []);
  return (
    // Very wide tall bloom at the left/right horizon wall junction
    <mesh position={[isLeft ? -16 : 16, 0, -10]} rotation={[0, isLeft ? 0.35 : -0.35, 0]}>
      <planeGeometry args={[22, 12, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={floorGlowVS}
        fragmentShader={floorGlowFS}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   BACK WALL — Atmospheric vertical wall with top spotlight
   and dark marble crack textures (100% reference match)
   ═══════════════════════════════════════════════════════ */

const backWallVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const backWallFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float minDist = 1.0;
    float secondMin = 1.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        vec2 r = g - f + o;
        float d = dot(r, r);
        if (d < minDist) {
          secondMin = minDist;
          minDist = d;
        } else if (d < secondMin) {
          secondMin = d;
        }
      }
    }
    return secondMin - minDist;
  }

  void main() {
    vec2 uv = vUv;
    
    // ─── TOP CENTER SPOTLIGHT BEAM ───
    // The bright white-purple cone descending from the top center in the reference
    vec2 beamCenter = vec2(0.5, 1.0);
    float beamDist = length((uv - beamCenter) * vec2(0.9, 1.8));
    float topBeam = exp(-beamDist * beamDist * 2.2);
    
    // Narrower bright core of the beam
    float beamCore = exp(-beamDist * beamDist * 8.0);
    
    // ─── WALL MARBLE CRACK TEXTURE ───
    vec2 wallUv = uv * vec2(7.0, 11.0);
    float crack1 = voronoi(wallUv);
    float crackLine = 1.0 - smoothstep(0.0, 0.025, crack1);
    float marbleGlow = 1.0 - smoothstep(0.0, 0.10, crack1);
    
    // ─── BASE COLOR ───
    vec3 baseColor = vec3(0.006, 0.003, 0.015);
    
    // Ambient purple haze fills the whole wall
    vec3 ambientHaze = vec3(0.10, 0.02, 0.22);
    
    // Bright white/lavender beam at top center
    vec3 beamColor = vec3(0.75, 0.70, 1.00);   // near-white lavender
    vec3 beamWide = vec3(0.35, 0.20, 0.65);    // wider purple glow
    
    vec3 color = baseColor + ambientHaze * 0.5;
    // Wide soft purple glow cone
    color += beamWide * topBeam * 0.6;
    // Bright white-lavender core beam
    color += beamColor * beamCore * 0.8;
    
    // Subtle marble crack texture slightly visible through beam
    color += vec3(0.15, 0.07, 0.28) * (crackLine * 0.2 + marbleGlow * 0.05);
    
    // ─── BOTTOM HORIZON PURPLE FLARE ───
    // Purple glow at the bottom wall edge where it meets the floor
    float bottomGlow = exp(-uv.y * 6.0);
    color += vec3(0.40, 0.06, 0.75) * bottomGlow * 0.6;
    
    // Left & right corner intensification
    float leftCorner = smoothstep(0.25, 0.0, uv.x);
    float rightCorner = smoothstep(0.75, 1.0, uv.x);
    color += vec3(0.55, 0.05, 0.95) * (leftCorner + rightCorner) * bottomGlow * 1.2;
    
    // ─── EDGE VIGNETTE ───
    float vignette = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
    color *= mix(0.5, 1.0, vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function BackWall() {
  return (
    <mesh position={[0, 4, -12]}>
      <planeGeometry args={[50, 25, 1, 1]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   VIOLET DUST PARTICLES — Simple round glowing violet dots
   Spread in all directions around the entire hero volume
   ═══════════════════════════════════════════════════════ */

const dotVS = `
  attribute float aSize;
  attribute float aBrightness;
  varying float vBrightness;
  void main() {
    vBrightness = aBrightness;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aSize * (350.0 / -mvPos.z);
  }
`;

const dotFS = `
  uniform float uTime;
  varying float vBrightness;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);

    // Clean circular dot — sharp edge with soft falloff
    float circle = 1.0 - smoothstep(0.18, 0.5, dist);
    
    // Soft outer glow
    float glow = exp(-dist * dist * 10.0) * 0.6;
    
    float alpha = max(circle, glow) * vBrightness;
    if (alpha < 0.01) discard;

    // Gentle twinkle
    float twinkle = 0.80 + 0.20 * sin(uTime * 1.2 + vBrightness * 25.0);

    // Rich violet color — brighter core fades to deep violet edges
    vec3 coreColor  = vec3(0.82, 0.60, 1.0);  // lavender-white center
    vec3 outerColor = vec3(0.48, 0.04, 0.90); // deep vivid violet
    vec3 color = mix(outerColor, coreColor, circle);

    gl_FragColor = vec4(color * twinkle, alpha);
  }
`;

function GlareStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, brightness } = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const sz  = new Float32Array(count);
    const br  = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Full spherical spread — covers every direction around the hero
      const zone = Math.random();

      if (zone < 0.30) {
        // Back wall — dense cluster on the dark wall
        pos[i*3]   = (Math.random() - 0.5) * 40;
        pos[i*3+1] = Math.random() * 18 - 3;
        pos[i*3+2] = -9 - Math.random() * 5;

      } else if (zone < 0.45) {
        // Left side
        pos[i*3]   = -10 - Math.random() * 8;
        pos[i*3+1] = Math.random() * 18 - 3;
        pos[i*3+2] = -3 - Math.random() * 10;

      } else if (zone < 0.60) {
        // Right side
        pos[i*3]   = 10 + Math.random() * 8;
        pos[i*3+1] = Math.random() * 18 - 3;
        pos[i*3+2] = -3 - Math.random() * 10;

      } else if (zone < 0.72) {
        // Upper ceiling area
        pos[i*3]   = (Math.random() - 0.5) * 32;
        pos[i*3+1] = 7 + Math.random() * 10;
        pos[i*3+2] = -4 - Math.random() * 8;

      } else if (zone < 0.84) {
        // Lower sides / near floor level
        pos[i*3]   = (Math.random() - 0.5) * 30;
        pos[i*3+1] = -2 - Math.random() * 3;
        pos[i*3+2] = -3 - Math.random() * 8;

      } else if (zone < 0.93) {
        // Front sides — close to camera, peripheral
        pos[i*3]   = (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 6);
        pos[i*3+1] = Math.random() * 12 - 2;
        pos[i*3+2] = -1 - Math.random() * 4;

      } else {
        // Mid-depth scattered fill
        pos[i*3]   = (Math.random() - 0.5) * 22;
        pos[i*3+1] = Math.random() * 10 - 1;
        pos[i*3+2] = -4 - Math.random() * 5;
      }

      // All particles are simple dots — vary size & brightness only
      br[i] = 0.15 + Math.random() * 0.75;
      sz[i] = 0.012 + Math.random() * 0.035;
    }
    return { positions: pos, sizes: sz, brightness: br };
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0.0 } }), []);
  useFrame((state) => {
    if (pointsRef.current) {
      (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightness, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={dotVS}
        fragmentShader={dotFS}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function PurpleCrystalModel({ scale = 1 }: { scale?: number }) {
  const { scene } = useGLTF("/purple_crystal.glb");
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={copiedScene} scale={scale} position={[0, 0, 0]} />;
}

useGLTF.preload("/purple_crystal.glb");

function ShowRoomModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: { scale?: number, position?: [number, number, number], rotation?: [number, number, number] }) {
  const { scene } = useGLTF("/medium_show_room.glb");
  const copiedScene = useMemo(() => {
    const clone = scene.clone();

    // Turn off emissive lights (the bright white rings)
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (child.material.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = 0;
        }
        if (child.material.emissive) {
          child.material.emissive.setHex(0x000000);
        }
      }
    });

    // Auto-scale and center logic to ensure the model is visible regardless of its original size
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Target a specific width (e.g., 6 units)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 3;
    const autoScale = maxDim > 0 ? targetSize / maxDim : 1;

    clone.scale.set(autoScale, autoScale, autoScale);

    // Center the model properly
    clone.position.set(-center.x * autoScale, -center.y * autoScale, -center.z * autoScale);

    return clone;
  }, [scene]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={copiedScene} />
    </group>
  );
}
useGLTF.preload("/medium_show_room.glb");

function MacbookModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: { scale?: number, position?: [number, number, number], rotation?: [number, number, number] }) {
  const { scene } = useGLTF("/macbook_air_m2.glb");
  const groupRef = useRef<THREE.Group>(null);

  const initialY = position[1];
  const initialRotZ = rotation[2];

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = initialY + Math.sin(time) * 0.08;
      groupRef.current.rotation.z = initialRotZ + Math.sin(time) * 0.02;
    }
  });

  const copiedScene = useMemo(() => {
    const clone = scene.clone();

    // Auto-scale and center logic
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Target a specific width (e.g., 2 units)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2;
    const autoScale = maxDim > 0 ? targetSize / maxDim : 1;

    clone.scale.set(autoScale, autoScale, autoScale);
    clone.position.set(-center.x * autoScale, -center.y * autoScale, -center.z * autoScale);

    return clone;
  }, [scene]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={copiedScene} />
    </group>
  );
}
useGLTF.preload("/macbook_air_m2.glb");

function PhoneModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: { scale?: number, position?: [number, number, number], rotation?: [number, number, number] }) {
  const { scene } = useGLTF("/iphone_12_pro.glb");
  const groupRef = useRef<THREE.Group>(null);

  const initialY = position[1];
  const initialRotZ = rotation[2];

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = initialY + Math.sin(time + 1.3) * 0.07;
      groupRef.current.rotation.z = initialRotZ + Math.sin(time) * 0.03;
    }
  });

  const copiedScene = useMemo(() => {
    const clone = scene.clone();

    // Auto-scale and center logic
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Target a specific width/height (e.g., 1.2 units)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 1.2;
    const autoScale = maxDim > 0 ? targetSize / maxDim : 1;

    clone.scale.set(autoScale, autoScale, autoScale);
    clone.position.set(-center.x * autoScale, -center.y * autoScale, -center.z * autoScale);

    return clone;
  }, [scene]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={copiedScene} />
    </group>
  );
}
useGLTF.preload("/iphone_12_pro.glb");

function CrystalSwarm({ count = 50 }) {
  const refs = useRef<(THREE.Group | null)[]>([]);

  // Initialize state array (position, velocity, rotation)
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      ),
      scale: 0.02 + Math.random() * 0.02,
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      )
    }));
  }, [count]);

  const mouseVec = useMemo(() => new THREE.Vector3(), []);
  const dummy = useMemo(() => new THREE.Vector3(), []);
  
  // Static Colliders (approximations of components)
  const obstacles = useMemo(() => [
    { pos: new THREE.Vector3(-5.5, 0, 0.2), radius: 3 }, // Laptop
    { pos: new THREE.Vector3(5, -0.05, 0.7), radius: 2.5 }, // Phone
    { pos: new THREE.Vector3(0, -2, 0), radius: 4 }, // Panther Center
  ], []);

  useFrame((state, delta) => {
    // Determine 3D mouse position on Z plane near objects
    mouseVec.set(state.pointer.x, state.pointer.y, 0.5);
    mouseVec.unproject(state.camera);
    mouseVec.sub(state.camera.position).normalize();
    
    // Calculate intersection with Z=0 plane (or roughly where particles are)
    const distance = -state.camera.position.z / (mouseVec.z || 0.0001);
    const mousePos = new THREE.Vector3().copy(state.camera.position).add(mouseVec.multiplyScalar(distance));
    
    // Bounds limit so they don't fly to infinity
    const bounds = { x: 12, y: 8, z: 6 };

    particles.forEach((p, i) => {
      const ref = refs.current[i];
      if (!ref) return;

      // Move particle
      p.position.addScaledVector(p.velocity, delta);

      // 1. Mouse Repulsion
      dummy.subVectors(p.position, mousePos);
      const distToMouse = dummy.length();
      if (distToMouse < 4) {
        // Strong push away from mouse
        const force = (4 - distToMouse) * 2.5; 
        dummy.normalize().multiplyScalar(force * delta);
        p.velocity.add(dummy);
      }

      // 2. Obstacle Collision
      obstacles.forEach(obs => {
        dummy.subVectors(p.position, obs.pos);
        const distToObs = dummy.length();
        if (distToObs < obs.radius) {
          // Bounce! Reflect velocity
          dummy.normalize();
          const dot = p.velocity.dot(dummy);
          if (dot < 0) {
            const reflection = dummy.clone().multiplyScalar(2 * dot);
            p.velocity.sub(reflection);
            
            // Add a slight outward push to prevent sticking
            p.velocity.add(dummy.multiplyScalar(0.5));
          }
        }
      });

      // 3. Boundary Bounce
      if (p.position.x > bounds.x || p.position.x < -bounds.x) p.velocity.x *= -1;
      if (p.position.y > bounds.y || p.position.y < -bounds.y) p.velocity.y *= -1;
      if (p.position.z > bounds.z || p.position.z < -bounds.z) p.velocity.z *= -1;
      
      // Clamp strictly
      p.position.x = THREE.MathUtils.clamp(p.position.x, -bounds.x, bounds.x);
      p.position.y = THREE.MathUtils.clamp(p.position.y, -bounds.y, bounds.y);
      p.position.z = THREE.MathUtils.clamp(p.position.z, -bounds.z, bounds.z);

      // 4. Dampening (Air resistance) + Default drift
      p.velocity.multiplyScalar(0.98); 
      // If velocity is too low, add a gentle random drift to keep them alive
      if (p.velocity.length() < 0.2) {
        p.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ));
      }

      // Apply to ThreeJS reference
      ref.position.copy(p.position);
      ref.rotation.x += p.rotationSpeed.x * delta;
      ref.rotation.y += p.rotationSpeed.y * delta;
      ref.rotation.z += p.rotationSpeed.z * delta;
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <group key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <PurpleCrystalModel scale={p.scale} />
        </group>
      ))}
    </group>
  );
}

