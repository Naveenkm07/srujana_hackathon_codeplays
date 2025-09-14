import React, { useEffect, useRef } from 'react';

const ParticleSystem = ({ 
  active, 
  type = 'success', 
  particleCount = 50, 
  duration = 2000,
  onComplete 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Particle configurations
    const configs = {
      success: {
        colors: ['#00ff88', '#00ffff', '#88ff00', '#ffffff'],
        gravity: 0.2,
        velocityRange: { x: [-5, 5], y: [-8, -3] },
        sizeRange: [2, 6],
        life: 100,
        sparkle: true
      },
      levelup: {
        colors: ['#ffd700', '#ffaa00', '#ff6600', '#ffffff'],
        gravity: 0.1,
        velocityRange: { x: [-8, 8], y: [-12, -5] },
        sizeRange: [3, 8],
        life: 120,
        burst: true
      },
      achievement: {
        colors: ['#ff00ff', '#8000ff', '#0080ff', '#ffffff'],
        gravity: 0.15,
        velocityRange: { x: [-6, 6], y: [-10, -4] },
        sizeRange: [2, 5],
        life: 100,
        trail: true
      },
      explosion: {
        colors: ['#ff4444', '#ff8800', '#ffff00', '#ffffff'],
        gravity: 0.3,
        velocityRange: { x: [-10, 10], y: [-10, -2] },
        sizeRange: [1, 4],
        life: 80,
        rapid: true
      }
    };

    const config = configs[type] || configs.success;
    
    // Create particles
    const particles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 50,
        vx: Math.random() * (config.velocityRange.x[1] - config.velocityRange.x[0]) + config.velocityRange.x[0],
        vy: Math.random() * (config.velocityRange.y[1] - config.velocityRange.y[0]) + config.velocityRange.y[0],
        size: Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0],
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        life: config.life,
        maxLife: config.life,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        trail: config.trail ? [] : null
      });
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        // Update position
        particle.vy += config.gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.life--;

        // Trail effect
        if (particle.trail) {
          particle.trail.push({ x: particle.x, y: particle.y });
          if (particle.trail.length > 10) {
            particle.trail.shift();
          }
        }

        // Calculate alpha based on life
        const alpha = particle.life / particle.maxLife;
        
        ctx.save();
        ctx.globalAlpha = alpha;

        // Draw trail
        if (particle.trail && particle.trail.length > 1) {
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          ctx.stroke();
        }

        // Draw particle
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);

        if (config.sparkle) {
          // Star shape for sparkle effect
          const spikes = 5;
          const outerRadius = particle.size;
          const innerRadius = particle.size * 0.5;
          
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle particle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      if (particles.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete && onComplete();
      }
    };

    // Start animation with delay for burst effect
    if (config.burst) {
      let delay = 0;
      particles.forEach((particle, index) => {
        setTimeout(() => {
          particle.active = true;
        }, delay);
        delay += 50;
      });
    }

    animate();

    // Auto cleanup after duration
    setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        onComplete && onComplete();
      }
    }, duration);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, type, particleCount, duration, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default ParticleSystem;
