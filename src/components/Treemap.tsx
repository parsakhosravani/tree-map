"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
}

interface TreemapProps {
  data: TreemapNode;
  width: number;
  height: number;
}

const Treemap: React.FC<TreemapProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const drawTreemap = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);

      const calculateTotal = (node: TreemapNode): number => {
        if (node.children) {
          return node.children.reduce(
            (sum, child) => sum + calculateTotal(child),
            0
          );
        }
        return node.value || 0;
      };

      const total = calculateTotal(data);

      const getColor = (depth: number) => {
        const hue = (depth * 60) % 360;
        return `hsl(${hue}, 70%, ${50 + depth * 5}%)`;
      };

      const drawRectangles = (
        node: TreemapNode,
        x: number,
        y: number,
        w: number,
        h: number,
        depth: number
      ) => {
        const color = getColor(depth);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "white";
        ctx.font = `${12 / scale}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = `${node.name} ${node.value ? `(${node.value})` : ""}`;
        const textWidth = ctx.measureText(text).width;
        if (textWidth < w - 4 && 12 / scale < h - 4) {
          ctx.fillText(text, x + w / 2, y + h / 2);
        }

        if (node.children) {
          let currentX = x;
          let currentY = y;
          const isHorizontal = w > h;
          node.children.forEach((child) => {
            const childValue = calculateTotal(child);
            const childRatio = childValue / calculateTotal(node);
            let childW = w;
            let childH = h;
            if (isHorizontal) {
              childW = w * childRatio;
              currentY = y;
            } else {
              childH = h * childRatio;
              currentX = x;
            }
            drawRectangles(
              child,
              currentX,
              currentY,
              childW,
              childH,
              depth + 1
            );
            if (isHorizontal) {
              currentX += childW;
            } else {
              currentY += childH;
            }
          });
        }
      };

      drawRectangles(data, 0, 0, width, height, 0);

      ctx.restore();
    };

    drawTreemap();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prevScale) => Math.min(Math.max(prevScale * delta, 0.1), 5));
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setOffset((prevOffset) => ({
          x: prevOffset.x + dx,
          y: prevOffset.y + dy,
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    canvasRef.current.addEventListener("wheel", handleWheel);
    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("wheel", handleWheel);
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [data, width, height, scale, offset, isDragging, dragStart]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-move"
        aria-label="Zoomable and pannable treemap visualization"
        role="img"
      />

      <div className="absolute top-2 left-2 bg-white bg-opacity-75 p-2 rounded">
        <button
          onClick={() => {
            setScale(1);
            setOffset({ x: 0, y: 0 });
          }}
          className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
          aria-label="Reset zoom and pan"
        >
          Reset View
        </button>
        <span>Zoom: {(scale * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default Treemap;
