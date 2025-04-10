
/**
 * Utility functions for handling PDF generation and downloads
 */

/**
 * Helper function to escape special characters for PDF content
 */
const escapeSpecialChars = (text: string) => {
  if (typeof text !== 'string') return '';
  return text.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\\/g, '\\\\');
};

/**
 * Generates a detailed text block for PDF content
 */
const generateTextBlock = (lines: string[], startY: number, fontSize: number = 12, indent: number = 50) => {
  let content = '';
  let currentY = startY;
  
  lines.forEach(line => {
    content += `BT\n/F1 ${fontSize} Tf\n${indent} ${currentY} Td\n(${escapeSpecialChars(line)}) Tj\nET\n`;
    currentY -= fontSize + 4; // Add spacing between lines
  });
  
  return { content, lastY: currentY };
};

/**
 * Creates PDF table content
 */
const generateTableContent = (headers: string[], rows: any[][], startY: number) => {
  let content = '';
  let currentY = startY;
  const fontSize = 10;
  const colWidth = 100;
  const rowHeight = 20;
  
  // Draw headers
  content += `BT\n/F1 ${fontSize + 2} Tf\n`;
  headers.forEach((header, idx) => {
    content += `${50 + idx * colWidth} ${currentY} Td\n(${escapeSpecialChars(header)}) Tj\n`;
    if (idx < headers.length - 1) content += `-${idx * colWidth} 0 Td\n`;
  });
  content += `ET\n`;
  
  currentY -= rowHeight;
  
  // Draw rows
  rows.forEach(row => {
    content += `BT\n/F1 ${fontSize} Tf\n`;
    row.forEach((cell, idx) => {
      const cellText = typeof cell === 'object' ? JSON.stringify(cell) : String(cell);
      content += `${50 + idx * colWidth} ${currentY} Td\n(${escapeSpecialChars(cellText)}) Tj\n`;
      if (idx < row.length - 1) content += `-${idx * colWidth} 0 Td\n`;
    });
    content += `ET\n`;
    currentY -= rowHeight;
  });
  
  return { content, lastY: currentY };
};

/**
 * Generates and triggers download of PDF content
 * @param fileName - Name of the file to be downloaded
 * @param content - Content to be included in the PDF
 */
export const downloadAsPdf = (fileName: string, content?: any) => {
  console.log(`Generating PDF for ${fileName}...`, content);
  
  // Create a valid PDF structure
  let pdfContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>>
endobj
6 0 obj
`;
  
  // Generate basic content with timestamp
  const title = fileName.replace('.pdf', '');
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  // Begin content stream
  let contentStream = `BT
/F1 16 Tf
50 750 Td
(${escapeSpecialChars(title)}) Tj
ET

BT
/F1 12 Tf
50 730 Td
(Generated on: ${escapeSpecialChars(`${date} at ${time}`)}) Tj
ET
`;

  // Add specific content based on the content type
  if (content) {
    if (typeof content === 'object') {
      // Format object data into PDF content
      const entries = Object.entries(content);
      let yPosition = 700;
      
      entries.forEach(([key, value]) => {
        if (key !== 'id' && key !== 'fileName') {
          if (Array.isArray(value)) {
            // Handle array data (like chart data)
            contentStream += `
BT
/F1 14 Tf
50 ${yPosition} Td
(${escapeSpecialChars(key.replace(/([A-Z])/g, ' $1').trim())}) Tj
ET
`;
            yPosition -= 20;

            if (value.length > 0 && typeof value[0] === 'object') {
              // Create a table for object arrays
              const headers = Object.keys(value[0]);
              const rows = value.map(item => Object.values(item));
              const tableResult = generateTableContent(headers, rows, yPosition);
              contentStream += tableResult.content;
              yPosition = tableResult.lastY - 30;
            } else {
              // Simple array
              value.forEach((item: any, index: number) => {
                contentStream += `
BT
/F1 10 Tf
70 ${yPosition} Td
(${escapeSpecialChars(`${index + 1}. ${item}`)}) Tj
ET
`;
                yPosition -= 15;
              });
              yPosition -= 10;
            }
          } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects
            contentStream += `
BT
/F1 14 Tf
50 ${yPosition} Td
(${escapeSpecialChars(key.replace(/([A-Z])/g, ' $1').trim())}) Tj
ET
`;
            yPosition -= 20;
            
            Object.entries(value).forEach(([subKey, subValue]) => {
              contentStream += `
BT
/F1 10 Tf
70 ${yPosition} Td
(${escapeSpecialChars(`${subKey}: ${subValue}`)}) Tj
ET
`;
              yPosition -= 15;
            });
            yPosition -= 10;
          } else {
            // Handle simple key-value pairs
            contentStream += `
BT
/F1 12 Tf
50 ${yPosition} Td
(${escapeSpecialChars(`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`)}) Tj
ET
`;
            yPosition -= 20;
          }
        }
      });
    } else {
      // Handle string content
      contentStream += `
BT
/F1 12 Tf
50 680 Td
(${escapeSpecialChars(String(content))}) Tj
ET
`;
    }
  }
  
  // Finalize PDF
  const contentBytes = contentStream.length;
  pdfContent += `<</Length ${contentBytes}>>
stream
${contentStream}
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7 /Root 1 0 R>>
startxref
${317 + contentBytes + 18}
%%EOF`;

  // Convert the PDF content to a Blob
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
    
  // Create a download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  
  // Set the file name
  const safeFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  link.download = safeFileName;
  
  // Append to body, click, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Release the object URL
  URL.revokeObjectURL(link.href);
};

/**
 * Generates PDF content based on specific dashboard data
 * @param dashboardData - Data to include in the dashboard PDF
 */
export const generateDashboardPdf = (dashboardData: any) => {
  const fileName = 'Dashboard_Report.pdf';
  const formattedData = {
    title: "Dashboard Report",
    overallCXScore: dashboardData.overallScore,
    improvementArea: dashboardData.improvementArea,
    topCategory: dashboardData.topCategory,
    locationsCovered: dashboardData.locationsCovered,
    monthlyScoreData: dashboardData.monthlyScoreData,
    categoryScores: dashboardData.categoryScoreData,
    upcomingEvaluations: dashboardData.upcomingEvaluations
  };
  
  downloadAsPdf(fileName, formattedData);
};

/**
 * Generates PDF content based on specific report data
 * @param reportName - Name of the report
 * @param reportData - Data to include in the report PDF
 */
export const generateReportPdf = (reportName: string, reportData?: any) => {
  const fileName = reportName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  
  // Create structured data for report PDF
  const formattedData = {
    title: reportName,
    date: new Date().toLocaleDateString(),
    type: reportData?.type || "Standard Report",
    author: reportData?.createdBy || "System Generated",
    status: reportData?.status || "Generated",
    details: reportData?.details || {},
    data: reportData || {}
  };
  
  downloadAsPdf(fileName, formattedData);
};

/**
 * Generates PDF content for business audit sheet
 * @param auditData - Audit sheet data to include in the PDF
 */
export const generateAuditPdf = (auditData: any) => {
  const fileName = `Audit_${auditData.name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'Sheet'}.pdf`;
  
  const formattedData = {
    title: auditData.name || "Business Audit",
    description: auditData.description || "Standard audit sheet",
    date: new Date().toLocaleDateString(),
    sections: auditData.sections || [],
    company: auditData.company || "",
    location: auditData.location || "",
    auditor: auditData.auditor || ""
  };
  
  downloadAsPdf(fileName, formattedData);
};

/**
 * Generates PDF content based on financial data
 * @param reportName - Name of the financial report
 * @param financialData - Data to include in the financial PDF
 */
export const generateFinancialPdf = (reportName: string, financialData?: any) => {
  const fileName = 'Financial_' + reportName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  
  // Create structured data for financial PDF
  const formattedData = {
    title: `Financial Report: ${reportName}`,
    date: new Date().toLocaleDateString(),
    period: financialData?.period || "Current Period",
    summary: financialData?.summary || {},
    transactions: financialData?.transactions || [],
    totals: financialData?.totals || {},
    charts: financialData?.charts || {},
    notes: financialData?.notes || ""
  };
  
  downloadAsPdf(fileName, formattedData);
};
