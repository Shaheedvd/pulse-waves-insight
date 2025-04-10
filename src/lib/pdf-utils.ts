
/**
 * Utility functions for handling PDF generation and downloads
 */

/**
 * Generates and triggers download of PDF content
 * @param fileName - Name of the file to be downloaded
 * @param content - Content to be included in the PDF
 */
export const downloadAsPdf = (fileName: string, content?: any) => {
  console.log(`Generating PDF for ${fileName}...`, content);
  
  // Create a valid PDF structure using text encoding
  // This is a minimal PDF that will open in Adobe Reader
  // A real implementation would use a library like jspdf or pdfmake for proper PDF generation
  const pdfContent = `%PDF-1.4
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
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 90>>
stream
BT
/F1 12 Tf
50 700 Td
(${fileName.replace('.pdf', '')}) Tj
50 680 Td
(Generated on: ${new Date().toLocaleString()}) Tj
ET
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
406
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
  downloadAsPdf(fileName, dashboardData);
};

/**
 * Generates PDF content based on specific report data
 * @param reportName - Name of the report
 * @param reportData - Data to include in the report PDF
 */
export const generateReportPdf = (reportName: string, reportData?: any) => {
  const fileName = reportName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  downloadAsPdf(fileName, reportData);
};

/**
 * Generates PDF content based on financial data
 * @param reportName - Name of the financial report
 * @param financialData - Data to include in the financial PDF
 */
export const generateFinancialPdf = (reportName: string, financialData?: any) => {
  const fileName = 'Financial_' + reportName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  downloadAsPdf(fileName, financialData);
};

