import React, { useEffect, useRef } from 'react';

/**
 * InnerHero3DBackground
 * Specialized 3D Animated Canvas Background for Inner Page Hero Banners.
 * Features:
 * - 3D Perspective Wireframe Data Cuboids & Prisms rotating in 3D space
 * - Interconnected 3D Floating Data Nodes with dynamic synaptic lines
 * - Smooth Mouse Parallax Depth Tracking
 * - Enterprise Cyber Cyan & Blue Aesthetics matching #05142f theme
 */
const InnerHero3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 300);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Perspective Config
    const FOV = 420;
    const isMobile = window.innerWidth < 768;
    const scaleFactor = isMobile ? 0.65 : 1.0;

    // 3D Floating Wireframe Cuboids
    const cuboids = [
      // Top Right Floating Prism
      {
        relX: 0.35, relY: -0.22, cz: 90,
        w: 52 * scaleFactor, h: 32 * scaleFactor, d: 36 * scaleFactor,
        rotX: 0.3, rotY: 0.5, rotZ: 0.1,
        speedX: 0.007, speedY: 0.009, speedZ: 0.005,
        color: 'rgba(56, 189, 248, '
      },
      // Far Right Tech Cube
      {
        relX: 0.44, relY: 0.15, cz: 60,
        w: 38 * scaleFactor, h: 38 * scaleFactor, d: 38 * scaleFactor,
        rotX: -0.4, rotY: 0.6, rotZ: 0.2,
        speedX: -0.006, speedY: 0.008, speedZ: -0.004,
        color: 'rgba(96, 165, 250, '
      },
      // Top Mid Floating Slab
      {
        relX: 0.08, relY: -0.32, cz: 180,
        w: 42 * scaleFactor, h: 22 * scaleFactor, d: 30 * scaleFactor,
        rotX: 0.5, rotY: -0.4, rotZ: 0.3,
        speedX: 0.005, speedY: -0.006, speedZ: 0.004,
        color: 'rgba(129, 140, 248, '
      },
      // Bottom Far Right Distant Cube
      {
        relX: 0.38, relY: 0.34, cz: 140,
        w: 44 * scaleFactor, h: 28 * scaleFactor, d: 32 * scaleFactor,
        rotX: 0.2, rotY: 0.3, rotZ: -0.2,
        speedX: 0.006, speedY: 0.007, speedZ: 0.003,
        color: 'rgba(56, 189, 248, '
      },
      // Subtle Left Background Box
      {
        relX: -0.36, relY: -0.28, cz: 240,
        w: 36 * scaleFactor, h: 36 * scaleFactor, d: 36 * scaleFactor,
        rotX: 0.4, rotY: 0.2, rotZ: 0.5,
        speedX: 0.004, speedY: 0.005, speedZ: 0.003,
        color: 'rgba(147, 197, 253, '
      }
    ];

    // 3D Point Projection Helper
    const project3D = (x, y, z, cx, cy) => {
      const depth = Math.max(z + FOV, 10);
      const scale = FOV / depth;
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale,
        depth
      };
    };

    // Draw 3D Box Wireframe
    const drawCuboid = (b, mouseOffsetX, mouseOffsetY) => {
      b.rotX += b.speedX;
      b.rotY += b.speedY;
      b.rotZ += b.speedZ;

      const cx = width / 2 + b.relX * width + mouseOffsetX * 0.4;
      const cy = height / 2 + b.relY * height + mouseOffsetY * 0.4;

      const hw = b.w / 2;
      const hh = b.h / 2;
      const hd = b.d / 2;

      const rawVertices = [
        [-hw, -hh, -hd],
        [ hw, -hh, -hd],
        [ hw,  hh, -hd],
        [-hw,  hh, -hd],
        [-hw, -hh,  hd],
        [ hw, -hh,  hd],
        [ hw,  hh,  hd],
        [-hw,  hh,  hd]
      ];

      // Rotate 3D
      const cosX = Math.cos(b.rotX), sinX = Math.sin(b.rotX);
      const cosY = Math.cos(b.rotY), sinY = Math.sin(b.rotY);
      const cosZ = Math.cos(b.rotZ), sinZ = Math.sin(b.rotZ);

      const rotated = rawVertices.map(([vx, vy, vz]) => {
        // Rot Y
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        // Rot X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rot Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2 + b.cz;

        return project3D(x3, y3, z3, cx, cy);
      });

      // 12 Edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // front
        [4, 5], [5, 6], [6, 7], [7, 4], // back
        [0, 4], [1, 5], [2, 6], [3, 7]  // connectors
      ];

      ctx.beginPath();
      edges.forEach(([i, j]) => {
        ctx.moveTo(rotated[i].x, rotated[i].y);
        ctx.lineTo(rotated[j].x, rotated[j].y);
      });
      ctx.strokeStyle = `${b.color}0.45)`;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Glowing corner vertex dots
      rotated.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 2 * v.scale, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}0.85)`;
        ctx.fill();
      });
    };

    // 3D Constellation Nodes
    const nodeCount = isMobile ? 22 : 40;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 260 + 30,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Mouse Tracking
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      const mouseOffsetX = (mouse.x - width / 2) * 0.25;
      const mouseOffsetY = (mouse.y - height / 2) * 0.25;

      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic radial glow following mouse
      const glow = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, width * 0.45
      );
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      glow.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // 1. Render 3D Floating Cuboids
      cuboids.forEach((c) => drawCuboid(c, mouseOffsetX, mouseOffsetY));

      // 2. Update & Project Constellation Nodes
      const projectedNodes = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += 0.02;

        if (node.x < -width * 0.6) node.x = width * 0.6;
        if (node.x > width * 0.6) node.x = -width * 0.6;
        if (node.y < -height * 0.6) node.y = height * 0.6;
        if (node.y > height * 0.6) node.y = -height * 0.6;
        if (node.z < 20 || node.z > 320) node.vz *= -1;

        return project3D(
          node.x + mouseOffsetX * (node.z / 200),
          node.y + mouseOffsetY * (node.z / 200),
          node.z,
          width / 2,
          height / 2
        );
      });

      // 3. Draw Synaptic Lines between close 3D nodes
      const maxDist = isMobile ? 85 : 120;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const dx = projectedNodes[i].x - projectedNodes[j].x;
          const dy = projectedNodes[i].y - projectedNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(projectedNodes[i].x, projectedNodes[i].y);
            ctx.lineTo(projectedNodes[j].x, projectedNodes[j].y);
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Glowing Data Nodes
      projectedNodes.forEach((p, idx) => {
        const pulseFactor = 1 + Math.sin(nodes[idx].pulse) * 0.25;
        const rad = Math.max(nodes[idx].radius * p.scale * pulseFactor, 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(186, 230, 253, 0.75)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ display: 'block' }}
    />
  );
};

export default InnerHero3DBackground;
