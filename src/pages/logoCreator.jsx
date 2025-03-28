import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

const LogoGenerator = () => {
  const [brandName, setBrandName] = useState("Your Brand");
  const [slogan, setSlogan] = useState("Your Slogan");
  const [color, setColor] = useState("#ff5733");
  const [template, setTemplate] = useState("basic");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 300,
      height: 200,
      backgroundColor: "#fff",
    });

    canvas.clear();

    if (template === "basic") {
      // Basic template
      const text = new fabric.Text(brandName, {
        left: 50,
        top: 50,
        fontSize: 30,
        fill: color,
        fontWeight: "bold",
      });
      const sloganText = new fabric.Text(slogan, {
        left: 50,
        top: 100,
        fontSize: 18,
        fill: color,
      });
      canvas.add(text);
      canvas.add(sloganText);
    } else if (template === "circle") {
      // Circle template
      const circle = new fabric.Circle({
        left: 120,
        top: 50,
        radius: 40,
        fill: color,
      });
      const text = new fabric.Text(brandName, {
        left: 50,
        top: 120,
        fontSize: 24,
        fill: color,
        fontWeight: "bold",
      });
      canvas.add(circle);
      canvas.add(text);
    } else if (template === "square") {
      // Square template
      const square = new fabric.Rect({
        left: 100,
        top: 40,
        width: 80,
        height: 80,
        fill: color,
      });
      const text = new fabric.Text(brandName, {
        left: 50,
        top: 130,
        fontSize: 24,
        fill: color,
        fontWeight: "bold",
      });
      canvas.add(square);
      canvas.add(text);
    }
  }, [brandName, slogan, color, template]);

  const downloadLogo = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "logo.png";
    link.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Logo Generator</h2>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }}></canvas>
      <div>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter Brand Name"
        />
        <input
          type="text"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          placeholder="Enter Slogan"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="basic">Basic</option>
          <option value="circle">Circle</option>
          <option value="square">Square</option>
        </select>
        <button onClick={downloadLogo}>Download Logo</button>
      </div>
    </div>
  );
};

export default LogoGenerator;
