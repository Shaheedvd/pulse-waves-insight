
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
 * Generate a simple chart visualization for PDF
 */
const generateChartVisualization = (data: any[], startY: number, width: number = 400, height: number = 150) => {
  let content = '';
  const maxValue = Math.max(...data.map(item => typeof item.value === 'number' ? item.value : 0));
  const barWidth = width / data.length;
  const scaleFactor = height / maxValue;
  
  // Draw chart axes
  content += `q\n1 0 0 1 50 ${startY - height} cm\n`;
  content += `0.5 w\n0 0 m ${width} 0 l S\n`;
  content += `0 0 m 0 ${height} l S\n`;
  
  // Draw bars
  data.forEach((item, index) => {
    const value = typeof item.value === 'number' ? item.value : 0;
    const barHeight = value * scaleFactor;
    content += `0.75 0.75 0.75 rg\n`;
    content += `${index * barWidth} 0 ${barWidth * 0.8} ${barHeight} re f\n`;
    
    // Add label
    content += `BT\n/F1 8 Tf\n`;
    content += `${index * barWidth + barWidth / 2 - 10} -15 Td\n(${escapeSpecialChars(item.name || '')}) Tj\n`;
    content += `ET\n`;
  });
  
  content += `Q\n`;
  
  return { content, lastY: startY - height - 30 };
};

/**
 * Generates and triggers download of PDF content
 * @param fileName - Name of the file to be downloaded
 * @param content - Content to be included in the PDF
 */
export const downloadAsPdf = (fileName: string, content?: any) => {
  console.log(`Generating PDF for ${fileName}...`, content);
  
  // Create a valid PDF structure with better formatting
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
  
  // Begin content stream with better formatting
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

% Draw a header line
1 0 0 1 0 0 cm
0.5 w
50 720 m 562 720 l S
`;

  // Add specific content based on the content type
  if (content) {
    if (typeof content === 'object') {
      // Format object data into PDF content
      const entries = Object.entries(content);
      let yPosition = 700;
      
      entries.forEach(([key, value]) => {
        if (key !== 'id' && key !== 'fileName') {
          // Format section heading
          contentStream += `
BT
/F1 14 Tf
50 ${yPosition} Td
(${escapeSpecialChars(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim())}) Tj
ET
`;
          yPosition -= 20;

          if (Array.isArray(value)) {
            // Handle array data (like chart data or tables)
            if (value.length > 0 && typeof value[0] === 'object') {
              // Create a table for object arrays
              const headers = Object.keys(value[0]);
              const rows = value.map(item => Object.values(item));
              const tableResult = generateTableContent(headers, rows, yPosition);
              contentStream += tableResult.content;
              yPosition = tableResult.lastY - 30;
              
              // Add a simple visualization for numeric data if it exists
              if (value[0].value !== undefined && typeof value[0].value === 'number' && value[0].name !== undefined) {
                const chartResult = generateChartVisualization(value, yPosition);
                contentStream += chartResult.content;
                yPosition = chartResult.lastY;
              }
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
            // Enhanced handling of nested objects with better formatting
            Object.entries(value).forEach(([subKey, subValue]) => {
              const formattedKey = subKey.charAt(0).toUpperCase() + subKey.slice(1).replace(/([A-Z])/g, ' $1').trim();
              
              if (typeof subValue === 'object' && subValue !== null && !Array.isArray(subValue)) {
                // Handle nested objects (two levels deep)
                contentStream += `
BT
/F1 12 Tf
70 ${yPosition} Td
(${escapeSpecialChars(formattedKey)}:) Tj
ET
`;
                yPosition -= 20;
                
                Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
                  const formattedNestedKey = nestedKey.charAt(0).toUpperCase() + 
                    nestedKey.slice(1).replace(/([A-Z])/g, ' $1').trim();
                  
                  contentStream += `
BT
/F1 10 Tf
90 ${yPosition} Td
(${escapeSpecialChars(`${formattedNestedKey}: ${nestedValue}`)}) Tj
ET
`;
                  yPosition -= 15;
                });
              } else if (Array.isArray(subValue)) {
                // Handle arrays inside nested objects
                contentStream += `
BT
/F1 12 Tf
70 ${yPosition} Td
(${escapeSpecialChars(formattedKey)}:) Tj
ET
`;
                yPosition -= 20;
                
                subValue.forEach((item: any, index: number) => {
                  const itemText = typeof item === 'object' ? 
                    Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ') : 
                    item.toString();
                  
                  contentStream += `
BT
/F1 10 Tf
90 ${yPosition} Td
(${escapeSpecialChars(`${index + 1}. ${itemText}`)}) Tj
ET
`;
                  yPosition -= 15;
                });
              } else {
                // Handle simple key-value pairs
                contentStream += `
BT
/F1 10 Tf
70 ${yPosition} Td
(${escapeSpecialChars(`${formattedKey}: ${subValue}`)}) Tj
ET
`;
                yPosition -= 15;
              }
            });
            yPosition -= 10;
          } else {
            // Handle simple key-value pairs with better formatting
            contentStream += `
BT
/F1 12 Tf
50 ${yPosition} Td
(${escapeSpecialChars(`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}: ${value}`)}) Tj
ET
`;
            yPosition -= 20;
          }
          
          // Add a separator line between sections
          contentStream += `
1 0 0 1 0 0 cm
0.2 w
50 ${yPosition} m 562 ${yPosition} l S
`;
          yPosition -= 10;
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
  
  // Add footer
  contentStream += `
% Footer
BT
/F1 8 Tf
250 50 Td
(${escapeSpecialChars(`Generated by Audit Management System on ${date}`)}) Tj
ET
`;
  
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
  
  // Ensure we have a comprehensive data object with all dashboard information
  const formattedData = {
    title: "Dashboard Report",
    date: new Date().toLocaleDateString(),
    metrics: {
      overallCXScore: dashboardData.overallScore || "89%",
      improvementArea: dashboardData.improvementArea || "Product Knowledge",
      topCategory: dashboardData.topCategory || "Store Cleanliness",
      locationsCovered: dashboardData.locationsCovered || "42/50",
    },
    trends: {
      monthlyScores: dashboardData.monthlyScoreData || [],
      quarterlyScores: dashboardData.quarterlyScoreData || [],
    },
    categories: {
      categoryScores: dashboardData.categoryScoreData || [],
    },
    upcomingEvaluations: dashboardData.upcomingEvaluations || []
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
  
  // Create structured data for report PDF with comprehensive information
  const formattedData = {
    title: reportName,
    date: new Date().toLocaleDateString(),
    type: reportData?.type || "Standard Report",
    author: reportData?.createdBy || "System Generated",
    status: reportData?.status || "Generated",
    summary: reportData?.summary || {},
    metrics: reportData?.metrics || {},
    details: reportData?.details || {},
    data: reportData?.data || {}
  };
  
  downloadAsPdf(fileName, formattedData);
};

/**
 * Generates PDF content for business audit sheet
 * @param auditData - Audit sheet data to include in the PDF
 */
export const generateAuditPdf = (auditData: any) => {
  const fileName = `Audit_${auditData.name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'Sheet'}.pdf`;
  
  // Create comprehensive audit data with all details
  const formattedData = {
    title: auditData.name || "Business Audit",
    description: auditData.description || "Standard audit sheet",
    date: new Date().toLocaleDateString(),
    companyInfo: {
      company: auditData.company || "",
      location: auditData.location || "",
      auditor: auditData.auditor || "",
      auditDate: auditData.date || new Date().toLocaleDateString()
    },
    sections: auditData.sections?.map((section: any) => ({
      title: section.title,
      items: section.items?.map((item: any) => ({
        question: item.question,
        maxScore: item.maxScore
      }))
    })) || [],
    evaluatorDetails: auditData.evaluatorDetails || {},
    observations: {
      strengths: auditData.strengths || "",
      improvementAreas: auditData.improvementAreas || "",
      recommendations: auditData.recommendations || "",
      followupActions: auditData.followupActions || "",
      visualMerchandising: auditData.visualMerchandising || "",
      customerServiceObservations: auditData.customerServiceObservations || "",
      actionItems: auditData.actionItems || "",
      generalNotes: auditData.generalNotes || ""
    }
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
  
  // Create structured data for financial PDF with comprehensive information
  const formattedData = {
    title: `Financial Report: ${reportName}`,
    date: new Date().toLocaleDateString(),
    period: financialData?.period || "Current Period",
    summary: financialData?.summary || {},
    revenueData: financialData?.charts?.revenueVsExpenses || [],
    incomeData: financialData?.charts?.incomeSources || [],
    expenseData: financialData?.charts?.expenseCategories || [],
    transactions: financialData?.transactions || [],
    upcomingPayments: financialData?.upcomingPayments || [],
    totals: financialData?.totals || {},
    notes: financialData?.notes || ""
  };
  
  downloadAsPdf(fileName, formattedData);
};
