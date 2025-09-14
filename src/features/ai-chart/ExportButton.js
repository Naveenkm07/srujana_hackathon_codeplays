import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportButton({ chartPayload }){
  const [exporting, setExporting] = useState(false);

  const exportPNG = async () => {
    const el = document.querySelector('#chart-container');
    if(!el) return alert('No chart to export');
    
    setExporting(true);
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `${chartPayload?.chartSpec?.title || 'chart'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('PNG export failed:', error);
      alert('Failed to export PNG');
    } finally {
      setExporting(false);
    }
  };

  const exportPDF = async () => {
    const el = document.querySelector('#chart-container');
    if(!el) return alert('No chart to export');
    
    setExporting(true);
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Add title
      if (chartPayload?.chartSpec?.title) {
        pdf.setFontSize(16);
        pdf.text(chartPayload.chartSpec.title, 20, 20);
      }
      
      // Add chart
      pdf.addImage(imgData, 'PNG', 10, 30, pdfWidth - 20, Math.min(pdfHeight, 150));
      
      // Add explanation if available
      if (chartPayload?.explanation) {
        pdf.setFontSize(10);
        const splitText = pdf.splitTextToSize(chartPayload.explanation, pdfWidth - 40);
        pdf.text(splitText, 20, 190);
      }
      
      pdf.save(`${chartPayload?.chartSpec?.title || 'chart'}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  const exportJSON = () => {
    if (!chartPayload) return;
    
    const dataStr = JSON.stringify({
      chartSpec: chartPayload.chartSpec,
      data: chartPayload.data,
      explanation: chartPayload.explanation,
      exportedAt: new Date().toISOString()
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chartPayload?.chartSpec?.title || 'chart'}-data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!chartPayload) return null;

  return (
    <div className="export-buttons">
      <div className="export-group">
        <button 
          className="export-btn png" 
          onClick={exportPNG} 
          disabled={exporting}
          title="Export as PNG image"
        >
          {exporting ? '⏳' : '🖼️'} PNG
        </button>
        
        <button 
          className="export-btn pdf" 
          onClick={exportPDF} 
          disabled={exporting}
          title="Export as PDF document"
        >
          {exporting ? '⏳' : '📄'} PDF
        </button>
        
        <button 
          className="export-btn json" 
          onClick={exportJSON} 
          disabled={exporting}
          title="Export chart data as JSON"
        >
          📊 Data
        </button>
      </div>
      
      {exporting && (
        <div className="export-status">
          <span>Exporting...</span>
        </div>
      )}
    </div>
  );
}
