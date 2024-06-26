import React, { useEffect, useRef, useState } from "react";
import createAdjacencyList from "../utils/adjacencyList.js";
import dijkstra from "../utils/dijkstra.js";

const Map = ({ myPoints }) => {
  const [, setRender] = useState(0); // State to trigger re-render
  const locations = {
    Uptron: { lat: 25.495888259522516, lon: 81.86993608590821 },
    "Teliyarganj Chauraha": { lat: 25.49861488542562, lon: 81.86312708481141 },
    "Yamuna Gate": { lat: 25.494318289237118, lon: 81.86126713666609 },
    "APS Old Cantt": { lat: 25.492486990625462, lon: 81.85701173913526 },
    "Ganga Gate": { lat: 25.492657811815377, lon: 81.8610579644117 },
    "Army Canteen": { lat: 25.480122171991997, lon: 81.8624741883314 },
    "Old Katra": { lat: 25.47257897045846, lon: 81.85668489287013 },
    "Belly Gaon": { lat: 25.474033767581517, lon: 81.8477323741156 },
    "Allahabad Uni": { lat: 25.470262035007487, lon: 81.86253387178975 },
    "Tagore Town": { lat: 25.456736707332805, lon: 81.8593706484965 },
    Katra: { lat: 25.464765870097402, lon: 81.85191021620103 },
    "Police Line": { lat: 25.46158660125893, lon: 81.84427073353051 },
    Chungi: { lat: 25.442679868982705, lon: 81.86735496207731 },
    "CMP Degree College": { lat: 25.445581209458688, lon: 81.85746077782231 },
    RamnathPur: { lat: 25.449623175857198, lon: 81.85125369815248 },
    "CA Park": { lat: 25.458088766131926, lon: 81.85187816003692 },
    "Allahabad High Court": { lat: 25.4544052785852, lon: 81.82523194476462 },
    "Civil Lines": { lat: 25.45295982867542, lon: 81.83494025578001 },
  };

  const pointsWithNames = {
    Uptron: [25.495888259522516, 81.86993608590821],
    "Teliyarganj Chauraha": [25.49861488542562, 81.86312708481141],
    "Yamuna Gate": [25.494318289237118, 81.86126713666609],
    APS: [25.492486990625462, 81.85701173913526],
    "Ganga Gate": [25.492657811815377, 81.8610579644117],
    "Army Canteen": [25.480122171991997, 81.8624741883314],
    "Old Katra": [25.47257897045846, 81.85668489287013],
    "Belly Gaon": [25.474033767581517, 81.8477323741156],
    "Allahabad Uni": [25.470262035007487, 81.86253387178975],
    "Tagore Town": [25.456736707332805, 81.8593706484965],
    Katra: [25.464765870097402, 81.85191021620103],
    "Police Line": [25.46158660125893, 81.84427073353051],
    Chungi: [25.442679868982705, 81.86735496207731],
    "CMP Degree College": [25.445581209458688, 81.85746077782231],
    RamnathPur: [25.449623175857198, 81.85125369815248],
    "CA Park": [25.458088766131926, 81.85187816003692],
    "Allahabad High Court": [25.4544052785852, 81.82523194476462],
    "Civil Lines": [25.45295982867542, 81.83494025578001],
  };

  const adjacencyList = createAdjacencyList(locations);

  const path = dijkstra(adjacencyList, "Teliyarganj Chauraha", "CA Park");

  let allPaths = [];
  path.forEach((name) => {
    allPaths.push([locations[name].lat, locations[name].lon]);
  });
  console.log("type:", typeof allPaths);

  const canvasRef = useRef(null);
  const drawMap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the context by 90 degrees
    ctx.rotate((3 * Math.PI) / 2);

    // Translate back
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    var minX, minY, maxX, maxY;
    myPoints.forEach((p, i) => {
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
    var mapWidth = maxX - minX;
    var mapHeight = maxY - minY;
    var mapCenterX = (maxX + minX) / 2;
    var mapCenterY = (maxY + minY) / 2;

    // to find the scale that will fit the canvas get the min scale to fit height or width
    var scale = Math.min(canvas.width / mapWidth, canvas.height / mapHeight);

    // Draw the map routes
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#b4b4b4";
    ctx.lineJoin = "round";
    ctx.beginPath();
    myPoints.forEach((p) => {
      ctx.lineTo(
        (p[0] - mapCenterX) * scale + canvas.width / 2,
        (p[1] - mapCenterY) * scale + canvas.height / 2
      );
    });
    ctx.stroke();

    ctx.font = "bold 15px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.fillStyle = "black";
    for (const [name, [x, y]] of Object.entries(pointsWithNames)) {
      const scaledX = (x - mapCenterX) * scale + canvas.width / 2;
      const scaledY = (y - mapCenterY) * scale + canvas.height / 2;
      ctx.save(); // Save the current state

      // Translate to the position of the text
      ctx.translate(scaledX, scaledY);

      // Rotate the context by 90 degrees
      ctx.rotate(Math.PI / 2);

      // Draw the text at the origin, since we've translated to the correct position
      ctx.fillText(name, -20, -5);

      ctx.restore();
    }

    // Draw the allPaths on top
    ctx.lineWidth = 2; // Make the path line thicker
    ctx.strokeStyle = "red"; // Change the color to red
    ctx.beginPath();
    ctx.moveTo(
      (allPaths[0][0] - mapCenterX) * scale + canvas.width / 2,
      (allPaths[0][1] - mapCenterY) * scale + canvas.height / 2
    );
    allPaths.forEach((p) => {
      ctx.lineTo(
        (p[0] - mapCenterX) * scale + canvas.width / 2,
        (p[1] - mapCenterY) * scale + canvas.height / 2
      );
    });
    ctx.stroke();

    // Draw the source marker
    const sourceX = (allPaths[0][0] - mapCenterX) * scale + canvas.width / 2;
    const sourceY = (allPaths[0][1] - mapCenterY) * scale + canvas.height / 2;
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(sourceX, sourceY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the destination marker
    const destX =
      (allPaths[allPaths.length - 1][0] - mapCenterX) * scale +
      canvas.width / 2;
    const destY =
      (allPaths[allPaths.length - 1][1] - mapCenterY) * scale +
      canvas.height / 2;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(destX, destY, 8, 0, 2 * Math.PI);
    ctx.fill();
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 1200;

    drawMap();
  }, [myPoints, allPaths]);

  useEffect(() => {
    const handleResize = () => {
      setRender((prevRender) => prevRender + 1); // Trigger re-render
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="bg-white shadow-md rounded-lg transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
    />
  );
};

export default Map;
