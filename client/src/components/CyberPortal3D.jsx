import React, { useEffect, useRef } from 'react';

const CyberPortal3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const width = (canvas.width = 540);
    const height = (canvas.height = 540);
    const cx = width / 2;
    const cy = height / 2;

    // Floating energy particles
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 220,
      z: Math.random() * 80,
      speed: 0.4 + Math.random() * 0.8,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.7
    }));

    const render = () => {
      angle += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Save context for isometric 3D ellipse projection
      ctx.save();
      ctx.translate(cx, cy + 30);
      ctx.scale(1, 0.48); // 3D oblique tilt

      // 1. Deep ambient glow under the reactor
      const ambientGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 240);
      ambientGlow.addColorStop(0, 'rgba(0, 180, 255, 0.35)');
      ambientGlow.addColorStop(0.4, 'rgba(30, 100, 240, 0.18)');
      ambientGlow.addColorStop(0.8, 'rgba(76, 141, 247, 0.06)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Track Ring with tick marks
      ctx.save();
      ctx.rotate(angle * 0.3);
      ctx.strokeStyle = 'rgba(76, 141, 247, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Outer tick notches
      const ticks = 48;
      for (let i = 0; i < ticks; i++) {
        const a = (i / ticks) * Math.PI * 2;
        const len = i % 4 === 0 ? 12 : 5;
        const r1 = 208;
        const r2 = r1 + len;
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(0, 220, 255, 0.7)' : 'rgba(76, 141, 247, 0.3)';
        ctx.lineWidth = i % 4 === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Segmented Circuit Ring (Rotating Counter-Clockwise)
      ctx.save();
      ctx.rotate(-angle * 0.7);
      const segments = 6;
      for (let i = 0; i < segments; i++) {
        const startA = (i / segments) * Math.PI * 2;
        const endA = startA + (Math.PI / segments) * 0.75;
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.65)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 175, startA, endA);
        ctx.stroke();

        // Node block on segments
        const nodeX = Math.cos(startA) * 175;
        const nodeY = Math.sin(startA) * 175;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 4. Middle Tech HUD Ring with Dashes (Rotating Clockwise)
      ctx.save();
      ctx.rotate(angle * 1.1);
      ctx.setLineDash([14, 8, 4, 8]);
      ctx.strokeStyle = 'rgba(76, 141, 247, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 5. Inner High-Speed Power Ring
      ctx.save();
      ctx.rotate(-angle * 1.6);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.8)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 105, 0, Math.PI * 1.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 105, Math.PI * 1.55, Math.PI * 1.95);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 6. Innermost Core Aperture Ring
      ctx.save();
      ctx.rotate(angle * 2.2);
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 7. Core Solid Ring
      ctx.strokeStyle = 'rgba(76, 141, 247, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.stroke();

      // Restore tilt transform
      ctx.restore();

      // 8. Vertical Volumetric Light Flare & Central Reactor Core (un-tilted for vertical light beam effect)
      const coreY = cy + 18;
      
      // Vertical soft energy cone/dome
      const verticalBeam = ctx.createRadialGradient(cx, coreY - 20, 5, cx, coreY - 40, 120);
      verticalBeam.addColorStop(0, 'rgba(120, 210, 255, 0.55)');
      verticalBeam.addColorStop(0.35, 'rgba(40, 130, 255, 0.28)');
      verticalBeam.addColorStop(0.7, 'rgba(20, 60, 200, 0.08)');
      verticalBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = verticalBeam;
      ctx.beginPath();
      ctx.arc(cx, coreY - 30, 110, 0, Math.PI * 2);
      ctx.fill();

      // Intense central reactor core (white-hot center)
      const coreLight = ctx.createRadialGradient(cx, coreY, 0, cx, coreY, 50);
      coreLight.addColorStop(0, '#ffffff');
      coreLight.addColorStop(0.2, '#99ecff');
      coreLight.addColorStop(0.5, 'rgba(0, 190, 255, 0.8)');
      coreLight.addColorStop(0.8, 'rgba(30, 100, 245, 0.3)');
      coreLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreLight;
      ctx.beginPath();
      ctx.arc(cx, coreY, 50, 0, Math.PI * 2);
      ctx.fill();

      // 9. Floating Upward Cyber Particles
      particles.forEach((p) => {
        p.z += p.speed;
        if (p.z > 90) {
          p.z = 0;
          p.x = (Math.random() - 0.5) * 180;
          p.y = (Math.random() - 0.5) * 180;
        }

        // Project particle
        const px = cx + p.x;
        const py = coreY + p.y * 0.45 - p.z;
        const alpha = Math.max(0, p.opacity * (1 - p.z / 90));

        ctx.fillStyle = `rgba(180, 235, 255, ${alpha})`;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full max-w-[540px] aspect-square select-none pointer-events-none">
      {/* Background radial blue glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-600/30 via-cyan-500/15 to-transparent rounded-full blur-3xl" />
      
      {/* Outer spinning CSS ring for extra depth */}
      <div 
        className="absolute w-[440px] h-[440px] rounded-full border border-cyan-400/20 animate-spin"
        style={{ 
          transform: 'scaleY(0.48) rotate(0deg)',
          animationDuration: '32s' 
        }} 
      />
      <div 
        className="absolute w-[360px] h-[360px] rounded-full border border-blue-500/25 border-dashed animate-spin"
        style={{ 
          transform: 'scaleY(0.48) rotate(0deg)',
          animationDuration: '24s',
          animationDirection: 'reverse'
        }} 
      />

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full max-w-[520px] max-h-[520px] object-contain drop-shadow-[0_0_40px_rgba(0,180,255,0.45)]"
      />
    </div>
  );
};

export default CyberPortal3D;
