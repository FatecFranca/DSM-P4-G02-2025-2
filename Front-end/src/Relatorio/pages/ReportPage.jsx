import React, { useState } from "react";
import Filtro from "../components/Filtro";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/MenuMoblie";
import Table from "../components/Table";
import ExportButtons from "../components/ExportButtons";
import Breadcrumb from "../../components/BreadCrumb";

const ReportPage = () => {
  const [dados, setDados] = useState([]);
  const { isDarkMode } = useTheme();
  const [filtroAtivo, setFiltroAtivo] = useState(false);

  const handleFiltrar = async (filtros) => {
    const params = {};
    if (filtros.start) params.start = filtros.start;
    if (filtros.end) params.end = filtros.end;
    if (filtros.minHumidity) params.minHumidity = filtros.minHumidity;
    if (filtros.maxHumidity) params.maxHumidity = filtros.maxHumidity;

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(
      `https://back-end-pi-27ls.onrender.com/api/sensor/report?${query}`
    );
    setDados(response.data);
    setFiltroAtivo(true);
  };

  const exportExcel = () => {
    if (dados.length === 0) {
      toast.info("Nenhum dado para exportar.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(
      dados.map((item) => ({
        Umidade: item.humidity,
        "Data/Hora": new Date(item.timestamp).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  const exportPDF = () => {
    if (dados.length === 0) {
      toast.info("Nenhum dado para exportar.");
      return;
    }
  
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147); 
    doc.text("Relatório de Umidade", 105, 20, { align: "center" });
    
    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); 
    doc.setFillColor(40, 53, 147); 
    
    doc.rect(14, 30, 30, 10, "F"); 
    doc.text("Umidade (%)", 19, 37);
    
    doc.rect(44, 30, 70, 10, "F"); 
    doc.text("Data/Hora", 65, 37);
  
    let y = 40;
    let page = 1;
    const pageHeight = doc.internal.pageSize.height;
    
    dados.forEach((item, index) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        page++;
        y = 30; 
      }
  
      const fillColor = index % 2 === 0 ? [240, 240, 240] : [255, 255, 255];
      doc.setFillColor(...fillColor);
      doc.rect(14, y, 30, 10, "F");
      doc.rect(44, y, 70, 10, "F");
  
      doc.setTextColor(0, 0, 0); 
      doc.setFont("helvetica", "normal");
      
      doc.text(`${item.humidity}%`, 19, y + 7);
      
      const dataFormatada = new Date(item.timestamp).toLocaleString('pt-BR');
      doc.text(dataFormatada, 49, y + 7);
  
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(14, y + 10, 44, y + 10);  
      doc.line(44, y + 10, 114, y + 10);  
      doc.line(14, y, 14, y + 10);  
      doc.line(44, y, 44, y + 10);  
      doc.line(114, y, 114, y + 10);  
  
      y += 10;
    });
  
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`Página ${page}`, 105, pageHeight - 10, { align: "center" });
  
    doc.save("relatorio_umidade.pdf");
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar />
      <Navbar />

      <main className="flex-1">
        <div className="ml-0 md:ml-64 p-4 transition-all mt-20 md:mt-0 duration-300">
          <ToastContainer />
          <div className="w-full transition-all duration-300 ">
            <Breadcrumb items={[]} currentPage="Relatorios"  className={`flex min-h-screen ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`} />

            <div className="mt-6 w-full">
              <div className="flex justify-center w-full">
                <div className="w-full ">
                  <Filtro onFiltrar={handleFiltrar} />
                </div>
              </div>

              <div className="flex flex-col items-center w-full mt-4">
                {dados.length > 0 ? (
                  <Table
                    rows={dados.map((item, idx) => ({
                      id: idx,
                      humidity: item.humidity,
                      timestamp: new Date(item.timestamp).toLocaleString(),
                    }))}
                  />
                ) : (
                  filtroAtivo && (
                    <p
                      className={`text-center ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Nenhum dado encontrado.
                    </p>
                  )
                )}

                {filtroAtivo && (
                  <div className="flex justify-center mt-4">
                    <ExportButtons onExcel={exportExcel} onPDF={exportPDF} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportPage;