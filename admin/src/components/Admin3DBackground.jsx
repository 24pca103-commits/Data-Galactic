import React, { useEffect, useRef } from 'react';

/**
 * Admin3DBackground
 * Full-screen interactive 3D animated Canvas background.
 * Used across both Admin Login and Admin Dashboard.
 * 
 * Features:
 * - Full-screen responsive viewport (100vw x 100vh fixed background)
 * - Full-screen distribution of 3D rotating wireframe rectangles / cuboids & cubes
 * - 3D Spherical & Orbital Constellation of data nodes spanning entire screen
 * - Real-time 3D Perspective Projection math (X, Y, Z with FOV scaling)
 * - Interactive Mouse Parallax & 3D tilt tracking across window
 * - Dynamic energy pulses traveling along synaptic connections
 * - Cyber undulating perspective floor wave
 */
const Admin3DBackground = ({ variant = 'login' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDashboard = variant === 'dashboard';

    // 3D Scene Config
    const FOV = 460;
    const isMobile = window.innerWidth < 768;

    // Helper to generate full-screen distributed 3D wireframe rectangles (cuboids)
    const generateRectangles = (w, h) => {
      const scale = isMobile ? 0.65 : 1.0;
      
      if (isDashboard) {
        // In Dashboard mode, keep rectangles in the outer periphery (margins & corners)
        // so they frame the screen without blocking overview metrics or tables
        return [
          // 1. Top-Far-Left Floating Prism
          {
            relX: -0.43, relY: -0.40, cz: 90,
            w: 44 * scale, h: 26 * scale, d: 30 * scale,
            rotX: 0.2, rotY: 0.4, rotZ: 0.1,
            speedX: 0.005, speedY: 0.008, speedZ: 0.004,
            color: 'rgba(56, 189, 248, '
          },
          // 2. Top-Far-Right Floating Slab
          {
            relX: 0.43, relY: -0.38, cz: 80,
            w: 48 * scale, h: 28 * scale, d: 32 * scale,
            rotX: 0.4, rotY: -0.4, rotZ: 0.2,
            speedX: -0.006, speedY: 0.007, speedZ: 0.005,
            color: 'rgba(96, 165, 250, '
          },
          // 3. Mid-Far-Left Vertical Prism
          {
            relX: -0.46, relY: -0.02, cz: 50,
            w: 30 * scale, h: 56 * scale, d: 28 * scale,
            rotX: 0.6, rotY: 0.3, rotZ: 0.3,
            speedX: 0.004, speedY: -0.006, speedZ: 0.005,
            color: 'rgba(56, 189, 248, '
          },
          // 4. Mid-Far-Right Vertical Prism
          {
            relX: 0.46, relY: 0.06, cz: 70,
            w: 32 * scale, h: 58 * scale, d: 30 * scale,
            rotX: -0.3, rotY: 0.5, rotZ: 0.2,
            speedX: -0.005, speedY: 0.007, speedZ: -0.004,
            color: 'rgba(129, 140, 248, '
          },
          // 5. Bottom-Far-Left Cube
          {
            relX: -0.42, relY: 0.42, cz: 70,
            w: 40 * scale, h: 40 * scale, d: 40 * scale,
            rotX: 0.5, rotY: 0.3, rotZ: -0.2,
            speedX: 0.006, speedY: 0.008, speedZ: 0.004,
            color: 'rgba(56, 189, 248, '
          },
          // 6. Bottom-Far-Right Tech Slab
          {
            relX: 0.42, relY: 0.40, cz: 60,
            w: 50 * scale, h: 28 * scale, d: 30 * scale,
            rotX: -0.4, rotY: -0.5, rotZ: 0.3,
            speedX: 0.005, speedY: -0.007, speedZ: 0.005,
            color: 'rgba(96, 165, 250, '
          },
          // 7. Distant Deep Background Left
          {
            relX: -0.30, relY: 0.32, cz: 280,
            w: 36 * scale, h: 36 * scale, d: 36 * scale,
            rotX: 0.2, rotY: 0.6, rotZ: 0.1,
            speedX: 0.003, speedY: 0.005, speedZ: 0.003,
            color: 'rgba(56, 189, 248, '
          },
          // 8. Distant Deep Background Right
          {
            relX: 0.30, relY: -0.28, cz: 290,
            w: 38 * scale, h: 24 * scale, d: 24 * scale,
            rotX: -0.4, rotY: 0.2, rotZ: 0.5,
            speedX: -0.004, speedY: -0.005, speedZ: 0.003,
            color: 'rgba(129, 140, 248, '
          }
        ];
      }

      return [
        // 1. Top-Left Floating Rectangle
        {
          relX: -0.40, relY: -0.36, cz: 80,
          w: 48 * scale, h: 28 * scale, d: 32 * scale,
          rotX: 0.2, rotY: 0.4, rotZ: 0.1,
          speedX: 0.007, speedY: 0.011, speedZ: 0.005,
          color: 'rgba(56, 189, 248, ' // Cyan
        },
        // 2. Top-Center Floating Cube
        {
          relX: -0.12, relY: -0.42, cz: 180,
          w: 32 * scale, h: 32 * scale, d: 32 * scale,
          rotX: 0.5, rotY: -0.3, rotZ: 0.2,
          speedX: -0.008, speedY: 0.009, speedZ: 0.006,
          color: 'rgba(96, 165, 250, ' // Royal Blue
        },
        // 3. Top-Right Cyber Slab
        {
          relX: 0.38, relY: -0.35, cz: 70,
          w: 54 * scale, h: 30 * scale, d: 36 * scale,
          rotX: 0.4, rotY: 0.5, rotZ: -0.2,
          speedX: 0.009, speedY: -0.012, speedZ: 0.006,
          color: 'rgba(129, 140, 248, ' // Indigo
        },
        // 4. Mid Far-Left Tall Vertical Data Prism
        {
          relX: -0.44, relY: 0.02, cz: 50,
          w: 34 * scale, h: 62 * scale, d: 30 * scale,
          rotX: 0.7, rotY: 0.2, rotZ: 0.4,
          speedX: -0.006, speedY: 0.008, speedZ: 0.007,
          color: 'rgba(56, 189, 248, ' // Cyan
        },
        // 5. Mid Far-Right Tall Vertical Data Prism
        {
          relX: 0.43, relY: -0.04, cz: 110,
          w: 36 * scale, h: 66 * scale, d: 32 * scale,
          rotX: 0.3, rotY: -0.6, rotZ: 0.1,
          speedX: 0.008, speedY: 0.01, speedZ: -0.005,
          color: 'rgba(96, 165, 250, ' // Royal
        },
        // 6. Bottom-Left Horizontal Rectangle
        {
          relX: -0.37, relY: 0.38, cz: 90,
          w: 58 * scale, h: 32 * scale, d: 34 * scale,
          rotX: -0.4, rotY: 0.3, rotZ: 0.5,
          speedX: 0.01, speedY: -0.007, speedZ: 0.006,
          color: 'rgba(56, 189, 248, ' // Cyan
        },
        // 7. Bottom-Center Wide Data Slab
        {
          relX: 0.06, relY: 0.43, cz: 150,
          w: 64 * scale, h: 26 * scale, d: 30 * scale,
          rotX: 0.6, rotY: 0.2, rotZ: -0.3,
          speedX: -0.007, speedY: 0.009, speedZ: 0.008,
          color: 'rgba(129, 140, 248, ' // Indigo
        },
        // 8. Bottom-Right Cyber Cube
        {
          relX: 0.40, relY: 0.36, cz: 60,
          w: 44 * scale, h: 44 * scale, d: 44 * scale,
          rotX: 0.8, rotY: 0.4, rotZ: 0.2,
          speedX: 0.009, speedY: 0.011, speedZ: -0.007,
          color: 'rgba(56, 189, 248, ' // Cyan
        },
        // 9. Far-Back Deep Floating Prism 1
        {
          relX: -0.22, relY: 0.16, cz: 240,
          w: 38 * scale, h: 38 * scale, d: 38 * scale,
          rotX: 0.1, rotY: 0.8, rotZ: 0.3,
          speedX: 0.005, speedY: 0.007, speedZ: 0.004,
          color: 'rgba(96, 165, 250, ' // Royal Blue
        },
        // 10. Far-Back Deep Floating Prism 2
        {
          relX: 0.24, relY: -0.18, cz: 260,
          w: 46 * scale, h: 26 * scale, d: 26 * scale,
          rotX: -0.5, rotY: 0.3, rotZ: 0.7,
          speedX: -0.006, speedY: -0.008, speedZ: 0.005,
          color: 'rgba(56, 189, 248, ' // Cyan
        }
      ];
    };

    let rectangles = generateRectangles(width, height);

    // Full-screen Distributed 3D Nodes
    const nodeCount = isMobile ? 55 : 105;
    const generateNodes = (w, h) => {
      const list = [];
      const spreadX = w * 0.58;
      const spreadY = h * 0.58;
      for (let i = 0; i < nodeCount; i++) {
        list.push({
          x: (Math.random() - 0.5) * spreadX * 2,
          y: (Math.random() - 0.5) * spreadY * 2,
          z: (Math.random() - 0.5) * 500,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          vz: (Math.random() - 0.5) * 0.3,
          baseRadius: Math.random() * 2.4 + 1.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.025,
          color: Math.random() > 0.4 ? '#38BDF8' : (Math.random() > 0.5 ? '#60A5FA' : '#818CF8')
        });
      }
      return list;
    };

    let nodes = generateNodes(width, height);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rectangles = generateRectangles(width, height);
      nodes = generateNodes(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Pulses
    const pulses = [];
    for (let p = 0; p < 10; p++) {
      pulses.push({
        sourceIdx: Math.floor(Math.random() * nodeCount),
        targetIdx: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014
      });
    }

    // Mouse coordinates
    let mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - width / 2) * 0.001;
      mouse.targetY = (e.clientY - height / 2) * 0.001;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = (e.touches[0].clientX - width / 2) * 0.001;
        mouse.targetY = (e.touches[0].clientY - height / 2) * 0.001;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Dynamic rotation angle
    let rotX = 0.12;
    let rotY = 0;
    const baseRotSpeedY = 0.0022;

    // Helper: 3D point projection to 2D screen
    const project = (x, y, z, fov = FOV) => {
      const distance = z + fov;
      if (distance <= 0) return null;
      const scale = fov / distance;
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
        scale,
        depth: z
      };
    };

    // Helper: 3D Rectangular Prism Vertices given half dimensions (w, h, d)
    const getRectVertices = (hw, hh, hd) => [
      [-hw, -hh, -hd], [hw, -hh, -hd], [hw, hh, -hd], [-hw, hh, -hd], // Back face
      [-hw, -hh, hd],  [hw, -hh, hd],  [hw, hh, hd],  [-hw, hh, hd]   // Front face
    ];

    const rectEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back
      [4, 5], [5, 6], [6, 7], [7, 4], // Front
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];

    // Main render loop
    const render = () => {
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      rotY += baseRotSpeedY;
      const currentRotY = rotY + mouse.x;
      const currentRotX = rotX + mouse.y;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      ctx.clearRect(0, 0, width, height);

      // Deep space ambient cyber gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2 + mouse.x * 250,
        height / 2 + mouse.y * 180,
        40,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );

      if (isDashboard) {
        // Deep cyber slate for admin dashboard
        bgGrad.addColorStop(0, 'rgba(0, 34, 68, 0.35)');
        bgGrad.addColorStop(0.5, 'rgba(2, 14, 34, 0.75)');
        bgGrad.addColorStop(1, 'rgba(1, 8, 18, 0.95)');
      } else {
        // Deep cosmic cyber for login
        bgGrad.addColorStop(0, 'rgba(0, 34, 68, 0.55)');
        bgGrad.addColorStop(0.4, 'rgba(2, 16, 38, 0.82)');
        bgGrad.addColorStop(1, 'rgba(1, 8, 20, 0.99)');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 3D Horizon Grid Wave (Perspective floor across the full width)
      const gridCols = isMobile ? 14 : 28;
      const gridRows = 9;
      const gridSpacing = width / gridCols;
      const horizonY = height * 0.74;
      const time = Date.now() * 0.0018;

      ctx.save();
      ctx.strokeStyle = isDashboard ? 'rgba(56, 189, 248, 0.05)' : 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;

      for (let r = 0; r < gridRows; r++) {
        const yPos = horizonY + r * (height * 0.038) * (1 + r * 0.05);
        ctx.beginPath();
        for (let c = 0; c <= gridCols; c++) {
          const xPos = c * gridSpacing;
          const wave = Math.sin(time + c * 0.35 + r * 0.5) * 5;
          if (c === 0) {
            ctx.moveTo(xPos, yPos + wave);
          } else {
            ctx.lineTo(xPos, yPos + wave);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // Transform and Project 3D Nodes across the whole screen
      const projectedNodes = [];
      const spreadX = width * 0.58;
      const spreadY = height * 0.58;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulse += node.pulseSpeed;
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Wrap around bounds so full screen is always populated
        if (node.x < -spreadX) node.x = spreadX;
        if (node.x > spreadX) node.x = -spreadX;
        if (node.y < -spreadY) node.y = spreadY;
        if (node.y > spreadY) node.y = -spreadY;
        if (node.z < -250) node.z = 250;
        if (node.z > 250) node.z = -250;

        // Rotate in 3D
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const proj = project(x1, y2, z2);
        if (proj) {
          projectedNodes.push({
            orig: node,
            x: proj.x,
            y: proj.y,
            scale: proj.scale,
            depth: proj.depth,
            pulseSize: node.baseRadius * proj.scale * (1 + Math.sin(node.pulse) * 0.28),
            color: node.color
          });
        }
      }

      // Sort by depth
      projectedNodes.sort((a, b) => b.depth - a.depth);

      // Draw connecting lines between nearby nodes
      const maxConnectDist = isMobile ? 90 : 135;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (isDashboard ? 0.32 : 0.45) * Math.min(n1.scale, n2.scale);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = Math.max(0.8, 1.3 * n1.scale);
            ctx.stroke();
          }
        }
      }

      // Traveling Energy Pulses
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.sourceIdx = Math.floor(Math.random() * projectedNodes.length);
          pulse.targetIdx = (pulse.sourceIdx + Math.floor(Math.random() * 8) + 1) % projectedNodes.length;
        }

        const sNode = projectedNodes[pulse.sourceIdx];
        const tNode = projectedNodes[pulse.targetIdx];
        if (sNode && tNode) {
          const px = sNode.x + (tNode.x - sNode.x) * pulse.progress;
          const py = sNode.y + (tNode.y - sNode.y) * pulse.progress;
          const pScale = (sNode.scale + tNode.scale) * 0.5;

          ctx.beginPath();
          ctx.arc(px, py, 2.8 * pScale, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const pn = projectedNodes[i];
        const alpha = Math.min(1, Math.max(0.2, (pn.depth + 400) / 800));

        ctx.beginPath();
        ctx.arc(pn.x, pn.y, pn.pulseSize * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.18})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pn.x, pn.y, Math.max(1, pn.pulseSize), 0, Math.PI * 2);
        ctx.fillStyle = pn.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Render All Full-screen Distributed 3D Rectangles / Cuboids
      rectangles.forEach((rect) => {
        rect.rotX += rect.speedX;
        rect.rotY += rect.speedY;
        rect.rotZ += rect.speedZ;

        const cCosX = Math.cos(rect.rotX);
        const cSinX = Math.sin(rect.rotX);
        const cCosY = Math.cos(rect.rotY);
        const cSinY = Math.sin(rect.rotY);
        const cCosZ = Math.cos(rect.rotZ);
        const cSinZ = Math.sin(rect.rotZ);

        const vertices = getRectVertices(rect.w, rect.h, rect.d);

        // Project rectangle vertices with 3D rotation and parallax
        const projVertices = vertices.map(([vx, vy, vz]) => {
          // Rotate around X
          let y1 = vy * cCosX - vz * cSinX;
          let z1 = vz * cCosX + vy * cSinX;

          // Rotate around Y
          let x2 = vx * cCosY + z1 * cSinY;
          let z2 = z1 * cCosY - vx * cSinY;

          // Rotate around Z
          let x3 = x2 * cCosZ - y1 * cSinZ;
          let y3 = y1 * cCosZ + x2 * cSinZ;

          // World translation spanning across full screen width & height
          const worldX = rect.relX * width + x3 + mouse.x * 140;
          const worldY = rect.relY * height + y3 + mouse.y * 140;
          const worldZ = rect.cz + z2;

          return project(worldX, worldY, worldZ);
        });

        // Draw rectangle wireframe edges
        ctx.lineWidth = 1.6;
        rectEdges.forEach(([start, end]) => {
          const p1 = projVertices[start];
          const p2 = projVertices[end];
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const maxEdgeAlpha = isDashboard ? 0.65 : 0.85;
            const edgeAlpha = Math.min(maxEdgeAlpha, Math.max(0.25, (rect.cz + 350) / 700));
            ctx.strokeStyle = `${rect.color}${edgeAlpha})`;
            ctx.stroke();
          }
        });

        // Draw glowing vertex points at all corners
        projVertices.forEach((p) => {
          if (p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, (isDashboard ? 2.0 : 2.6) * p.scale, 0, Math.PI * 2);
            ctx.fillStyle = '#38BDF8';
            ctx.shadowColor = '#38BDF8';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default Admin3DBackground;
