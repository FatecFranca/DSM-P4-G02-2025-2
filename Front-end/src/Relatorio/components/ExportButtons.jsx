import { FaFileExcel, FaFilePdf } from "react-icons/fa";

export default function ExportButtons({ onExcel, onPDF }) {
  return (
    <div className="flex justify-center gap-3 mt-6 mb-4">
      <button
        onClick={onExcel}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        <FaFileExcel size={20} />
        Baixar Excel
      </button>
      <button
        onClick={onPDF}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
      >
        <FaFilePdf size={20} />
        Baixar PDF
      </button>
    </div>
  );
}