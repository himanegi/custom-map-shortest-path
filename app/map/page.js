import React, { useEffect, useRef } from "react";

const Map = () => {
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
    var myPoints = [
      [25.495888259522516, 81.86993608590821], //Uptron
      [25.49861488542562, 81.86312708481141], //Teliyarganj Chauraha
      [25.494318289237118, 81.86126713666609], //Yamuna Gate
      [25.492486990625462, 81.85701173913526], // APS Old Cantt
      [25.492657811815377, 81.8610579644117], //Ganga Gate
      [25.494318289237118, 81.86126713666609], //Yamuna Gate
      [25.492657811815377, 81.8610579644117], //Ganga Gate
      [25.480122171991997, 81.8624741883314], //Army Canteen
      [25.495888259522516, 81.86993608590821], //Uptron
      [25.480122171991997, 81.8624741883314], //Army Canteen
      [25.47257897045846, 81.85668489287013], //Old Katra
      [25.474033767581517, 81.8477323741156], //Belly Gaon
      [25.492486990625462, 81.85701173913526], // APS Old Cantt
      [25.474033767581517, 81.8477323741156], //Belly Gaon
      [25.47257897045846, 81.85668489287013], //Old Katra
      [25.470262035007487, 81.86253387178975], //Allahabad Uni
      [25.480122171991997, 81.8624741883314], //Army Canteen
      [25.470262035007487, 81.86253387178975], //Allahabad Uni
      [25.456736707332805, 81.8593706484965], //Tagore Town
      [25.464765870097402, 81.85191021620103], //Katra
      [25.46158660125893, 81.84427073353051], //Police Line
      [25.474033767581517, 81.8477323741156], //Belly Gaon
      [25.47257897045846, 81.85668489287013], //Old Katra
      [25.464765870097402, 81.85191021620103], //Katra
      [25.456736707332805, 81.8593706484965], //Tagore Town
      [25.442679868982705, 81.86735496207731], //Chungi
      [25.445581209458688, 81.85746077782231], //CMP Degree College
      [25.449623175857198, 81.85125369815248], //RamnathPur
      [25.456736707332805, 81.8593706484965], //Tagore Town
      [25.458088766131926, 81.85187816003692], //CA Park
      [25.46158660125893, 81.84427073353051], //Police Line
      [25.4544052785852, 81.82523194476462], //Allahabad High Court
      [25.45295982867542, 81.83494025578001], //Civil Lines
      [25.449623175857198, 81.85125369815248], //RamnathPur
    ];

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
    const mapWidth = maxX - minX;
    const mapHeight = maxY - minY;
    const mapCenterX = (maxX + minX) / 2;
    const mapCenterY = (maxY + minY) / 2;

    // to find the scale that will fit the canvas get the min scale to fit height or width
    const scale = Math.min(canvas.width / mapWidth, canvas.height / mapHeight);

    // Now you can draw the map centered on the canvas
    ctx.lineWidth = 4; // make the line thicker
    ctx.strokeStyle = "#b4b4b4"; // change the color to a Google Maps-like color
    ctx.lineJoin = "round"; // round the corners of the lines
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="700"
      height="700"
      className="bg-white shadow-md rounded-lg transition-all duration-300 hover:ring-2 hover:ring-indigo-500"
    />
  );
};

export default Map;
