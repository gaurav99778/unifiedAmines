import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroMolecule3D.css';

gsap.registerPlugin(ScrollTrigger);

// Expansive 3D Chemical Framing Lattice:
// Left cluster (Cobalt Blue / Cyan Amine) + Right cluster (Brand Orange / Amber Complex)
// Center corridor remains 100% clear for headline & subtitle legibility!
const ATOM_DEFINITIONS = [
  // --- LEFT CLUSTER: Cobalt Blue & Cyan Amine Hub ---
  {
    id: 'n-core-left',
    name: 'Nitrogen Primary Hub (N-15)',
    type: 'Primary Amine Core',
    description: 'High-purity coordination center with active lone pair',
    radius: 1.1,
    pos: [-5.6, 0.6, 0.8],
    color: 0x2563eb, // Cobalt Blue
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.7,
    tag: 'N° Left'
  },
  {
    id: 'c-left-1',
    name: 'Alpha-Alkyl Matrix (C₁)',
    type: 'Aliphatic Backbone',
    description: 'Sterically stabilized covalent anchor',
    radius: 0.88,
    pos: [-7.2, 1.8, -0.6],
    color: 0x00e5ff, // Cyan
    emissive: 0x0099cc,
    emissiveIntensity: 0.65,
    tag: 'C-Alpha'
  },
  {
    id: 'c-left-2',
    name: 'Beta-Chelate Node (C₂)',
    type: 'Polyamine Chain',
    description: 'Thermal degradation buffer',
    radius: 0.85,
    pos: [-6.8, -1.4, 0.4],
    color: 0x38bdf8, // Sky Blue
    emissive: 0x0284c7,
    emissiveIntensity: 0.6,
    tag: 'C-Beta'
  },
  {
    id: 'h-left-1',
    name: 'Hydrogen Proton (H₁)',
    type: 'Coordination Proton',
    description: 'Dynamic hydrogen bonding bridge',
    radius: 0.52,
    pos: [-4.2, 2.2, 0.2],
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.5,
    tag: 'H⁺'
  },
  {
    id: 'h-left-2',
    name: 'Peripheral Proton (H₂)',
    type: 'Stabilizing Proton',
    description: 'Electrostatic equilibrium balancer',
    radius: 0.48,
    pos: [-8.4, -0.2, -1.0],
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.5,
    tag: 'H⁺'
  },

  // --- RIGHT CLUSTER: Brand Orange & Amber Conjugated Matrix ---
  {
    id: 'c-core-right',
    name: 'Aromatic Resonance Core (C₃)',
    type: 'Conjugated Aromatic Ring',
    description: 'Delocalized electron density with high thermal stability',
    radius: 1.08,
    pos: [5.6, 0.4, 0.6],
    color: 0xff5a00, // Brand Orange
    emissive: 0xe04000,
    emissiveIntensity: 0.75,
    tag: 'C-Aromatic'
  },
  {
    id: 'c-right-1',
    name: 'Tert-Methyl Radical (CH₃)',
    type: 'Lipophilic Branch',
    description: 'Engineered barrier protecting reactive locus',
    radius: 0.86,
    pos: [7.2, 1.7, -0.5],
    color: 0xffa500, // Amber Gold
    emissive: 0xd97706,
    emissiveIntensity: 0.65,
    tag: 'CH₃'
  },
  {
    id: 'o-right-1',
    name: 'Oxygen Polar Terminal (O₁)',
    type: 'Hydrophilic Anchor',
    description: 'Amphiphilic surfactant activity locus',
    radius: 0.88,
    pos: [6.6, -1.5, 0.5],
    color: 0xff5a00, // Brand Orange
    emissive: 0xe04000,
    emissiveIntensity: 0.7,
    tag: 'O-Polar'
  },
  {
    id: 'h-right-1',
    name: 'Terminal Ligand (L₁)',
    type: 'Auxiliary Radical',
    description: 'Polymer synthesis catalytic accelerator',
    radius: 0.52,
    pos: [4.3, 2.0, 0.3],
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.5,
    tag: 'Ligand'
  },
  {
    id: 'h-right-2',
    name: 'Terminal Proton (H₄)',
    type: 'Coordination Proton',
    description: 'Terminal valence satisfaction node',
    radius: 0.48,
    pos: [8.3, -0.4, -0.8],
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.5,
    tag: 'H⁺'
  },

  // --- DEEP BRIDGE NODES (Arching in background behind text, deep in Z-axis) ---
  {
    id: 'bridge-upper',
    name: 'Deep Polymeric Link (C-Bridge)',
    type: 'Conjugated Molecular Bridge',
    description: 'High-density inter-cluster valence link',
    radius: 0.62,
    pos: [0, 3.2, -3.8],
    color: 0x60a5fa,
    emissive: 0x2563eb,
    emissiveIntensity: 0.5,
    tag: 'Bridge-α'
  },
  {
    id: 'bridge-lower',
    name: 'Conjugated Backbone Node',
    type: 'Inter-Matrix Backbone',
    description: 'Extended covalent resonance pathway',
    radius: 0.62,
    pos: [0, -3.4, -4.2],
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.5,
    tag: 'Bridge-β'
  }
];

// Covalent chemical bonds linking left & right matrices and the deep background bridges
const BOND_PAIRS = [
  // Left Cluster Bonds
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 4],

  // Right Cluster Bonds
  [5, 6],
  [5, 7],
  [5, 8],
  [6, 9],
  [7, 9],

  // Arching Deep Bridges (Pass deep behind the text)
  [3, 10], // H-left-1 -> Bridge-upper
  [10, 8], // Bridge-upper -> Ligand-right
  [2, 11], // C-left-2 -> Bridge-lower
  [11, 7]  // Bridge-lower -> O-right-1
];

export default function HeroMolecule3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);

  const [activeAtom, setActiveAtom] = useState(null);
  const activeAtomIdRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 16.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0a1526, 2.4);
    scene.add(ambientLight);

    // Warm Key Light (Right)
    const orangeKeyLight = new THREE.DirectionalLight(0xff6a00, 3.8);
    orangeKeyLight.position.set(14, 8, 10);
    scene.add(orangeKeyLight);

    // Cool Fill Light (Left)
    const blueFillLight = new THREE.DirectionalLight(0x2563eb, 3.4);
    blueFillLight.position.set(-14, -8, 8);
    scene.add(blueFillLight);

    // Top Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    rimLight.position.set(0, 14, -8);
    scene.add(rimLight);

    // Dynamic Left Light Core
    const leftPointLight = new THREE.PointLight(0x00d4ff, 3.8, 22);
    leftPointLight.position.set(-5.6, 0.6, 1.2);
    scene.add(leftPointLight);

    // Dynamic Right Light Core
    const rightPointLight = new THREE.PointLight(0xff5a00, 4.2, 22);
    rightPointLight.position.set(5.6, 0.4, 1.2);
    scene.add(rightPointLight);

    // --- PARENT MOLECULE CONTAINER ---
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // --- ATOM MESHES WITH FROSTED GLASS & INNER GLOWING CORE ---
    const atomMeshes = [];
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const innerGeo = new THREE.SphereGeometry(1, 20, 20);

    ATOM_DEFINITIONS.forEach((def, index) => {
      // Outer Frosted Glass Shell
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: def.color,
        emissive: def.emissive,
        emissiveIntensity: def.emissiveIntensity * 0.45,
        metalness: 0.15,
        roughness: 0.12,
        transmission: 0.45,
        thickness: 0.9,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.95
      });

      const outerMesh = new THREE.Mesh(sphereGeo, glassMaterial);
      outerMesh.scale.setScalar(def.radius);
      outerMesh.position.set(...def.pos);

      // Inner Glowing Quantum Nucleus
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.9
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
      innerMesh.scale.setScalar(0.48);
      outerMesh.add(innerMesh);

      outerMesh.userData = {
        ...def,
        index,
        baseScale: def.radius,
        baseEmissive: def.emissiveIntensity * 0.45,
        innerMesh
      };

      moleculeGroup.add(outerMesh);
      atomMeshes.push(outerMesh);
    });

    // --- SLEEK COVALENT CHEMICAL BONDS (CYLINDERS) ---
    const bondMeshes = [];
    const bondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x64748b,
      emissive: 0x0f172a,
      emissiveIntensity: 0.3,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.8,
      transparent: true,
      opacity: 0.8
    });

    BOND_PAIRS.forEach(([fromIdx, toIdx]) => {
      const fromPos = new THREE.Vector3(...ATOM_DEFINITIONS[fromIdx].pos);
      const toPos = new THREE.Vector3(...ATOM_DEFINITIONS[toIdx].pos);
      const distance = fromPos.distanceTo(toPos);

      const cylinderGeo = new THREE.CylinderGeometry(0.048, 0.048, distance, 14);
      const cylinder = new THREE.Mesh(cylinderGeo, bondMaterial.clone());

      const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
      cylinder.position.copy(midPoint);

      const direction = new THREE.Vector3().subVectors(toPos, fromPos).normalize();
      const orientation = new THREE.Quaternion();
      orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      cylinder.setRotationFromQuaternion(orientation);

      cylinder.userData = { fromIdx, toIdx, originalDistance: distance, baseEmissive: 0.3 };
      moleculeGroup.add(cylinder);
      bondMeshes.push(cylinder);

      // Glowing Energy Pulse Bead
      const pulseGeo = new THREE.SphereGeometry(0.12, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xff9900,
        transparent: true,
        opacity: 0.95
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.userData = {
        fromPos,
        toPos,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.006
      };
      moleculeGroup.add(pulseMesh);
    });

    // --- EXPANSIVE ORBITAL RINGS WRAPPING THE VIEWPORT ---
    const ringGroup = new THREE.Group();
    moleculeGroup.add(ringGroup);

    const createOrbitalRing = (radius, tiltX, tiltY, colorHex) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.018, 14, 140);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.28
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      ringGroup.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createOrbitalRing(7.8, Math.PI / 3.4, Math.PI / 4, 0xff5a00);
    const ring2 = createOrbitalRing(9.4, -Math.PI / 4.2, Math.PI / 3, 0x00d4ff);
    const ring3 = createOrbitalRing(11.2, Math.PI / 2.2, -Math.PI / 6, 0xffb300);

    // --- INTERACTION & ROTATION VARIABLES ---
    let targetRotationX = 0.1;
    let targetRotationY = 0.15;
    let currentRotationX = 0.1;
    let currentRotationY = 0.15;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseNDC = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();

    let clock = new THREE.Clock();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseNDC.x = (x / rect.width) * 2 - 1;
      mouseNDC.y = -(y / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        targetRotationY = normX * 0.38;
        targetRotationX = normY * 0.24;
      }
    };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onCanvasClick = () => {
      gsap.fromTo(
        [leftPointLight, rightPointLight],
        { intensity: 7.5, distance: 30 },
        { intensity: 4.0, distance: 22, duration: 1.0, ease: 'power2.out' }
      );
      bondMeshes.forEach((mesh) => {
        gsap.fromTo(
          mesh.material,
          { emissiveIntensity: 1.2 },
          { emissiveIntensity: 0.3, duration: 0.8, ease: 'power2.out' }
        );
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onCanvasClick);

    // --- SCROLLTRIGGER 3D MORPHING ---
    const heroSection = document.querySelector('.hero-section') || container;

    const scrollAnim = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    scrollAnim.to(moleculeGroup.position, {
      z: -4.5,
      y: -1.0,
      ease: 'none'
    });

    scrollAnim.to(
      moleculeGroup.scale,
      {
        x: 0.85,
        y: 0.85,
        z: 0.85,
        ease: 'none'
      },
      0
    );

    // --- ANIMATION RENDER LOOP WITH VIEWPORT VISIBILITY PAUSING ---
    let animationFrameId = null;
    let isHeroVisible = true;

    const animate = () => {
      if (!isHeroVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerping
      currentRotationX += (targetRotationX - currentRotationX) * 0.045;
      currentRotationY += (targetRotationY - currentRotationY) * 0.045;

      moleculeGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.5) * 0.05;
      moleculeGroup.rotation.y = currentRotationY + elapsedTime * 0.16;
      moleculeGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.18;

      ring1.rotation.z = elapsedTime * 0.24;
      ring2.rotation.z = -elapsedTime * 0.2;
      ring3.rotation.z = elapsedTime * 0.15;

      // Animate energy pulse beads along bonds
      moleculeGroup.children.forEach((child) => {
        if (child.userData && child.userData.speed) {
          child.userData.progress += child.userData.speed;
          if (child.userData.progress > 1) child.userData.progress = 0;
          child.position.lerpVectors(
            child.userData.fromPos,
            child.userData.toPos,
            child.userData.progress
          );
        }
      });

      // Raycasting for atom hover
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObjects(atomMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        canvas.style.cursor = 'pointer';

        atomMeshes.forEach((mesh) => {
          if (mesh === hit) {
            mesh.scale.lerp(new THREE.Vector3().setScalar(mesh.userData.baseScale * 1.25), 0.15);
            mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
              mesh.material.emissiveIntensity,
              mesh.userData.baseEmissive * 2.5,
              0.15
            );
          } else {
            mesh.scale.lerp(new THREE.Vector3().setScalar(mesh.userData.baseScale), 0.1);
            mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
              mesh.material.emissiveIntensity,
              mesh.userData.baseEmissive,
              0.1
            );
          }
        });

        // Guard React setState - only fire when active atom ID actually changes
        if (activeAtomIdRef.current !== hit.userData.id) {
          activeAtomIdRef.current = hit.userData.id;
          setActiveAtom(hit.userData);
        }

        if (tooltipRef.current) {
          const worldPos = new THREE.Vector3();
          hit.getWorldPosition(worldPos);
          worldPos.project(camera);

          const halfWidth = width / 2;
          const halfHeight = height / 2;
          const screenX = worldPos.x * halfWidth + halfWidth;
          const screenY = -(worldPos.y * halfHeight) + halfHeight;

          tooltipRef.current.style.transform = `translate3d(${screenX}px, ${screenY - 18}px, 0)`;
          tooltipRef.current.style.opacity = '1';
        }
      } else {
        canvas.style.cursor = isDragging ? 'grabbing' : 'default';
        atomMeshes.forEach((mesh) => {
          mesh.scale.lerp(new THREE.Vector3().setScalar(mesh.userData.baseScale), 0.08);
          mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
            mesh.material.emissiveIntensity,
            mesh.userData.baseEmissive,
            0.08
          );
        });

        if (activeAtomIdRef.current !== null) {
          activeAtomIdRef.current = null;
          setActiveAtom(null);
        }

        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
        }
      }

      renderer.render(scene, camera);
    };

    // Pause 3D render loop when user scrolls away from Hero section
    const heroObserver = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible && !animationFrameId) {
        animate();
      }
    }, { threshold: 0.02 });

    heroObserver.observe(heroSection);

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      heroObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onCanvasClick);

      if (scrollAnim && scrollAnim.scrollTrigger) {
        scrollAnim.scrollTrigger.kill();
      }

      sphereGeo.dispose();
      innerGeo.dispose();
      bondMaterial.dispose();
      atomMeshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-container" ref={containerRef}>
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="hero-3d-canvas" />

      {/* Dynamic 3D Atom Screen Tooltip */}
      <div className="hero-atom-tooltip" ref={tooltipRef}>
        {activeAtom && (
          <div className="tooltip-glass-card">
            <div className="tooltip-header">
              <span className="tooltip-tag">{activeAtom.tag}</span>
              <span className="tooltip-status">COVALENT NODE</span>
            </div>
            <div className="tooltip-title">{activeAtom.name}</div>
            <div className="tooltip-type">{activeAtom.type}</div>
            <div className="tooltip-desc">{activeAtom.description}</div>
          </div>
        )}
      </div>
    </div>
  );
}
