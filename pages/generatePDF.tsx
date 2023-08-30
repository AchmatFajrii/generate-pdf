// pages/generatePDF.tsx

import { useState } from "react";

type MarginKey = "top" | "right" | "bottom" | "left";

function GeneratePDF() {
  const [paperSize, setPaperSize] = useState<"A4" | "Letter">("A4");
  const [margin, setMargin] = useState({
    top: 10,
    right: 7,
    bottom: 10,
    left: 13,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/api/exportPDF?paperSize=${paperSize}&marginTop=${margin.top}&marginRight=${margin.right}&marginBottom=${margin.bottom}&marginLeft=${margin.left}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f8f8f8",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Pengaturan PDF
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Ukuran Kertas:</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value as "A4" | "Letter")}
          >
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </select>
        </div>

        {(["top", "right", "bottom", "left"] as MarginKey[]).map(
          (direction) => (
            <div key={direction} style={{ marginBottom: "20px" }}>
              <label>{`Margin ${
                direction.charAt(0).toUpperCase() + direction.slice(1)
              } (mm):`}</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={margin[direction]}
                onChange={(e) =>
                  setMargin((prev) => ({
                    ...prev,
                    [direction]: +e.target.value,
                  }))
                }
              />
            </div>
          )
        )}

        <div style={{ textAlign: "center" }}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
            type="submit"
          >
            Buat PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default GeneratePDF;
