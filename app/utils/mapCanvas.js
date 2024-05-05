import React, { useEffect, useRef } from "react";

const MapCanvas = ({ myPoints, allPaths }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Draw the map points
    myPoints.forEach(([lat, lon]) => {
      const x = lon * 10; // Adjust scaling as needed
      const y = lat * 10; // Adjust scaling as needed
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    // Draw the paths
    ctx.beginPath();
    ctx.moveTo(allPaths[0][1] * 10, allPaths[0][0] * 10); // Adjust scaling as needed
    allPaths.forEach(([lat, lon]) => {
      const x = lon * 10; // Adjust scaling as needed
      const y = lat * 10; // Adjust scaling as needed
      ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }, [myPoints, allPaths]);

  return <canvas ref={canvasRef} />;
};

export default MapCanvas;
