// utils/drawPath.js
import { useEffect, useRef } from "react";

function drawPath(allPaths) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the context by 90 degrees
    ctx.rotate((3 * Math.PI) / 4);

    // Translate back
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    var minX, minY, maxX, maxY;
    allPaths.forEach((p, i) => {
      if (i === 0) {
        // if first point
        minX = maxX = p[0];
        minY = maxY = p[1];
      } else {
        minX = Math.min(p[0], minX);
        minY = Math.min(p[1], minY);
        maxX = Math.max(p[0], maxX);
        maxY = Math.max(p[1], maxY);
      }
    });

    // now get the map width and height in its local coords
    const mapWidth = maxX - minX;
    const mapHeight = maxY - minY;
    const mapCenterX = (maxX + minX) / 2;
    const mapCenterY = (maxY + minY) / 2;

    // to find the scale that will fit the canvas get the min scale to fit height or width
    const scale = Math.min(canvas.width / mapWidth, canvas.height / mapHeight);

    // Now you can draw the map centered on the canvas
    ctx.lineWidth = 4; // make the line thicker
    ctx.strokeStyle = "#000000"; // change the color to a Google Maps-like color
    ctx.lineJoin = "round"; // round the corners of the lines
    ctx.beginPath();
    allPaths.forEach((p) => {
      ctx.lineTo(
        (p[0] - mapCenterX) * scale + canvas.width / 2,
        (p[1] - mapCenterY) * scale + canvas.height / 2
      );
    });
    ctx.stroke();
  }, []);
  return <canvas ref={canvasRef} />;
}

export default drawPath;
