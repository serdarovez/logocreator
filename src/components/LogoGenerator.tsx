import { useRef, useState } from "react";
import { LogoOptions, LogoCategory } from "../types";
import { getRandomLogo } from "./LogoSvg";

const categories: LogoCategory[] = ["fashion", "car", "food"];
const fonts = ["Arial", "Helvetica", "Georgia", "Verdana", "Times New Roman"];

export default function LogoGenerator() {
  const [options, setOptions] = useState<LogoOptions>({
    name: "",
    category: "food",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    font: fonts[0],
  });
  const [logo, setLogo] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateLogo = () => {
    setLogo(getRandomLogo(options.category, options.color));
  };

  const downloadLogo = () => {
    if (!containerRef.current || !logo) return;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 300;
    canvas.height = 300;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 300, 300);

      // Add text
      ctx.font = `24px ${options.font}`;
      ctx.fillStyle = options.textColor;
      ctx.textAlign = "center";
      ctx.fillText(options.name, canvas.width / 2, canvas.height - 30);

      const link = document.createElement("a");
      link.download = "logo.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Options Panel */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Logo Options</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={options.name}
                  onChange={(e) =>
                    setOptions({ ...options, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={options.category}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      category: e.target.value as LogoCategory,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Logo Color
                </label>
                <input
                  type="color"
                  value={options.color}
                  onChange={(e) =>
                    setOptions({ ...options, color: e.target.value })
                  }
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Background Color
                </label>
                <input
                  type="color"
                  value={options.backgroundColor}
                  onChange={(e) =>
                    setOptions({ ...options, backgroundColor: e.target.value })
                  }
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Text Color
                </label>
                <input
                  type="color"
                  value={options.textColor}
                  onChange={(e) =>
                    setOptions({ ...options, textColor: e.target.value })
                  }
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Font
                </label>
                <select
                  value={options.font}
                  onChange={(e) =>
                    setOptions({ ...options, font: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateLogo}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Generate Logo
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Logo Preview</h2>
            <div
              ref={containerRef}
              className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center"
              style={{ backgroundColor: options.backgroundColor }}
            >
              {logo ? (
                <div className="text-center">
                  {logo}
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: options.font,
                      color: options.textColor,
                    }}
                  >
                    {options.name}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Generate a logo to see preview</p>
              )}
            </div>
            <button
              onClick={downloadLogo}
              disabled={!logo}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Download Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
