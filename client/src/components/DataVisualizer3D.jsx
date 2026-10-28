import React, { useEffect, useRef } from 'react';

const DataVisualizer3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodesCount = Math.min(width > 768 ? 38 : 20, 45);
    const nodes = [];

    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 50,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 2.2 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        type: Math.random() > 0.7 ? 'data-block' : 'node'
      });
    }

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Stormy morning ambient radial glow
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      gradient.addColorStop(0, 'rgba(136, 189, 242, 0.12)');
      gradient.addColorStop(0.6, 'rgba(106, 137, 167, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        if (node.z < 30 || node.z > 250) node.vz *= -1;

        const parallaxX = (mouse.x - width / 2) * (node.z / 1400);
        const parallaxY = (mouse.y - height / 2) * (node.z / 1400);

        node.renderX = node.x + parallaxX;
        node.renderY = node.y + parallaxY;
        node.scale = (200 / (node.z + 100)) * (1 + Math.sin(node.pulse) * 0.12);
      });

      // Data Lines (#BDDDFC / #88BDF2)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].renderX - nodes[j].renderX;
          const dy = nodes[i].renderY - nodes[j].renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width > 768 ? 130 : 90;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].renderX, nodes[i].renderY);
            ctx.lineTo(nodes[j].renderX, nodes[j].renderY);
            ctx.strokeStyle = `rgba(189, 221, 252, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            if (i % 4 === 0 && j % 3 === 0) {
              const packetPos = (Math.sin(Date.now() * 0.0012 + i) + 1) / 2;
              const px = nodes[i].renderX + (nodes[j].renderX - nodes[i].renderX) * packetPos;
              const py = nodes[i].renderY + (nodes[j].renderY - nodes[i].renderY) * packetPos;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
              ctx.shadowColor = '#88BDF2';
              ctx.shadowBlur = 4;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        const radius = node.size * node.scale;
        
        if (node.type === 'data-block') {
          ctx.save();
          ctx.translate(node.renderX, node.renderY);
          ctx.rotate(node.pulse * 0.15);
          
          ctx.strokeStyle = 'rgba(189, 221, 252, 0.45)';
          ctx.fillStyle = 'rgba(136, 189, 242, 0.15)';
          ctx.lineWidth = 1;
          
          const boxSize = radius * 3.2;
          ctx.strokeRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
          ctx.fillRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);

          ctx.beginPath();
          ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(node.renderX, node.renderY, radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(136, 189, 242, 0.85)';
          ctx.shadowColor = '#6A89A7';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(node.renderX, node.renderY, radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default DataVisualizer3D;
