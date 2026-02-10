
import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  color: string;
  icon: string;
  delay: string;
}

const COLORS = ['emerald', 'rose', 'purple', 'sky'];
const ICONS = [
  '⚡', '🤖', '⚛️', '💎', '🔥', '🌐', '🛡️', '📦', 
  '🚀', '⚙️', '✨', '🧠', '☁️', '🛠️', '📡', '💾'
];

export const Constellation: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const hoveredIdRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);

  // Sync refs with state for the animation loop
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  // Generate 28 random nodes
  useEffect(() => {
    const newNodes: Node[] = [];
    for (let i = 0; i < 28; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 90 + 5, // Keep away from extreme edges
        y: Math.random() * 90 + 5,
        color: COLORS[i % COLORS.length],
        icon: ICONS[i % ICONS.length],
        delay: `${(Math.random() * 5).toFixed(2)}s`
      });
    }
    setNodes(newNodes);
  }, []);

  // Drawing logic for connecting lines
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentHoveredId = hoveredIdRef.current;
    if (currentHoveredId !== null) {
      const activeRect = document.getElementById(`node-${currentHoveredId}`)?.getBoundingClientRect();

      if (activeRect) {
        const ax = activeRect.left + activeRect.width / 2;
        const ay = activeRect.top + activeRect.height / 2;

        // Find nearest neighbors using DOM rects for accurate positioning during animations
        const neighbors = nodesRef.current
          .filter(n => n.id !== currentHoveredId)
          .map(n => {
            const el = document.getElementById(`node-${n.id}`);
            const rect = el?.getBoundingClientRect();
            if (!rect) return { ...n, dist: Infinity, x_px: 0, y_px: 0 };
            const nx = rect.left + rect.width / 2;
            const ny = rect.top + rect.height / 2;
            const dist = Math.sqrt(Math.pow(ax - nx, 2) + Math.pow(ay - ny, 2));
            return { ...n, dist, x_px: nx, y_px: ny };
          })
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 4);

        neighbors.forEach(n => {
          if (n.dist < 500) {
            const gradient = ctx.createLinearGradient(ax, ay, n.x_px, n.y_px);
            gradient.addColorStop(0, `rgba(99, 102, 241, 0.6)`);
            gradient.addColorStop(0.5, `rgba(99, 102, 241, 0.2)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(n.x_px, n.y_px);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 15]); // Sophisticated dashed look
            ctx.stroke();
            ctx.setLineDash([]); // Reset
          }
        });
      }
    }
    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {nodes.map((node) => (
        <div
          key={node.id}
          id={`node-${node.id}`}
          className={`absolute pointer-events-auto cursor-pointer animate-float w-10 h-10 rounded-xl glass border-2 flex items-center justify-center text-lg glow-${node.color} transition-all duration-500 hover:scale-150 hover:z-30 group`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: node.delay,
          }}
          onMouseEnter={() => setHoveredId(node.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
            {node.icon}
          </span>
          {/* Subtle indicator ring when hovered */}
          {hoveredId === node.id && (
            <div className="absolute inset-[-4px] rounded-xl border border-indigo-500/50 animate-ping" />
          )}
        </div>
      ))}
    </div>
  );
};
