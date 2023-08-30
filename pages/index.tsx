import { useState } from "react";

type MarginKey = "top" | "right" | "bottom" | "left";

const DocumentPDF = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paperSize, setPaperSize] = useState<"A4" | "Letter">("A4");
  const [margin, setMargin] = useState({
    top: 10,
    right: 7,
    bottom: 10,
    left: 13,
  });

  const generatePDFLink = `/api/exportPDF?paperSize=${paperSize}&marginTop=${margin.top}&marginRight=${margin.right}&marginBottom=${margin.bottom}&marginLeft=${margin.left}`;

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="container mx-auto">
        {/* Tombol untuk membuka modal */}
        <button onClick={() => setIsModalOpen(true)} className="btn bg-blue-500 px-4 py-2 rounded-xl inline-block font-bold text-white mb-5 hide-on-print">
          Pengaturan Format
        </button>

        {/* Konten yang akan dijadikan PDF */}
        <h1 className="text-xl font-semibold mb-3">Pratinjau Konten</h1>
        <p className="text-gray-700">
          Ini adalah contoh halaman dengan format kertas A4. Anda dapat
          menambahkan konten sesuai kebutuhan Anda di sini.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white p-5 rounded-lg shadow-md relative max-w-xl">
            {/* Tombol close */}
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            
            {/* Isi modal (element pengaturan format) */}
            <div className="mb-3">
              <label className="block mb-1">Ukuran Kertas:</label>
              <select className="p-2 border rounded" value={paperSize} onChange={(e) => setPaperSize(e.target.value as "A4" | "Letter")}>
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
            {(["top", "right", "bottom", "left"] as MarginKey[]).map((direction) => (
              <div key={direction} className="mb-3">
                <label className="block mb-1">{`Margin ${direction.charAt(0).toUpperCase() + direction.slice(1)} (mm):`}</label>
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  value={margin[direction]}
                  onChange={(e) =>
                    setMargin((prev) => ({
                      ...prev,
                      [direction]: Number(e.target.value),
                    }))
                  }
                />
              </div>
            ))}
            <a href={generatePDFLink} className="btn bg-blue-600 px-4 py-2 rounded-xl inline-block font-bold text-white">Buat PDF</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPDF;
