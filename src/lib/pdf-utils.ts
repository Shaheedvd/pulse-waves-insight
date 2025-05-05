
// This file contains utility functions for PDF operations

// Import a PDF generation library (in a real app)
// For this example we'll just create a simple function that simulates PDF download

export const downloadAsPdf = (content: string, filename: string) => {
  // In a real application, this would use a library like jsPDF or pdfmake
  // to generate a real PDF document
  
  // Create a blob with HTML content
  const blob = new Blob([`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 30px; }
          h1 { color: #333; }
          table { border-collapse: collapse; width: 100%; }
          th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `], { type: 'text/html' });
  
  // Create download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
};

// Generate dashboard PDF report
export const generateDashboardPdf = (dashboardData: any) => {
  // Create HTML content for the dashboard report
  const content = `
    <h1>Pulse Point CX Dashboard Report</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Summary</h2>
    <table>
      <tr>
        <th>Overall Score</th>
        <td>${dashboardData.overallScore || 'N/A'}</td>
      </tr>
      <tr>
        <th>Locations Covered</th>
        <td>${dashboardData.locationsCovered || 'N/A'}</td>
      </tr>
      <tr>
        <th>Top Category</th>
        <td>${dashboardData.topCategory || 'N/A'}</td>
      </tr>
      <tr>
        <th>Improvement Area</th>
        <td>${dashboardData.improvementArea || 'N/A'}</td>
      </tr>
    </table>
    
    <h2>Category Scores</h2>
    <table>
      <tr>
        <th>Category</th>
        <th>Score</th>
      </tr>
      ${dashboardData.categoryScoreData?.map((category: any) => `
        <tr>
          <td>${category.name}</td>
          <td>${category.value}%</td>
        </tr>
      `).join('') || '<tr><td colspan="2">No data available</td></tr>'}
    </table>
    
    <h2>Upcoming Evaluations</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Client</th>
        <th>Location</th>
        <th>Date</th>
      </tr>
      ${dashboardData.upcomingEvaluations?.map((evaluation: any) => `
        <tr>
          <td>${evaluation.id}</td>
          <td>${evaluation.client}</td>
          <td>${evaluation.location}</td>
          <td>${evaluation.date}</td>
        </tr>
      `).join('') || '<tr><td colspan="4">No upcoming evaluations</td></tr>'}
    </table>
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, 'dashboard-report.pdf');
};

// Generate evaluation PDF report
export const generateEvaluationPdf = (evaluationData: any) => {
  // Create HTML content for the evaluation report
  const content = `
    <h1>Evaluation Report</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Evaluation Details</h2>
    <table>
      <tr>
        <th>ID</th>
        <td>${evaluationData.id || 'N/A'}</td>
      </tr>
      <tr>
        <th>Client</th>
        <td>${evaluationData.client || 'N/A'}</td>
      </tr>
      <tr>
        <th>Location</th>
        <td>${evaluationData.location || 'N/A'}</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>${evaluationData.date || 'N/A'}</td>
      </tr>
      <tr>
        <th>Evaluator</th>
        <td>${evaluationData.evaluator || 'N/A'}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>${evaluationData.status || 'N/A'}</td>
      </tr>
      <tr>
        <th>Score</th>
        <td>${evaluationData.score ? evaluationData.score + '%' : 'N/A'}</td>
      </tr>
    </table>
    
    <h2>Evaluation Results</h2>
    ${evaluationData.results ? `
      <table>
        <tr>
          <th>Category</th>
          <th>Score</th>
          <th>Comments</th>
        </tr>
        ${evaluationData.results.map((result: any) => `
          <tr>
            <td>${result.category}</td>
            <td>${result.score}%</td>
            <td>${result.comments}</td>
          </tr>
        `).join('')}
      </table>
    ` : '<p>No detailed results available</p>'}
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, `evaluation-${evaluationData.id}.pdf`);
};

// Generate client PDF report
export const generateClientPdf = (clientData: any) => {
  // Create HTML content for the client report
  const content = `
    <h1>Client Report: ${clientData.name}</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Client Details</h2>
    <table>
      <tr>
        <th>Client Name</th>
        <td>${clientData.name || 'N/A'}</td>
      </tr>
      <tr>
        <th>Industry</th>
        <td>${clientData.industry || 'N/A'}</td>
      </tr>
      <tr>
        <th>Contact Person</th>
        <td>${clientData.contactPerson || 'N/A'}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${clientData.email || 'N/A'}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>${clientData.phone || 'N/A'}</td>
      </tr>
      <tr>
        <th>Number of Locations</th>
        <td>${clientData.locations?.length || 0}</td>
      </tr>
    </table>
    
    <h2>Locations</h2>
    ${clientData.locations?.length ? `
      <table>
        <tr>
          <th>Location Name</th>
          <th>Address</th>
          <th>Primary</th>
        </tr>
        ${clientData.locations.map((location: any) => `
          <tr>
            <td>${location.name}</td>
            <td>${location.address}</td>
            <td>${location.isPrimary ? 'Yes' : 'No'}</td>
          </tr>
        `).join('')}
      </table>
    ` : '<p>No locations available</p>'}
    
    <h2>Recent Evaluations</h2>
    ${clientData.evaluations?.length ? `
      <table>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Date</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
        ${clientData.evaluations.map((evaluation: any) => `
          <tr>
            <td>${evaluation.id}</td>
            <td>${evaluation.location}</td>
            <td>${evaluation.date}</td>
            <td>${evaluation.score ? evaluation.score + '%' : '-'}</td>
            <td>${evaluation.status}</td>
          </tr>
        `).join('')}
      </table>
    ` : '<p>No recent evaluations</p>'}
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, `client-${clientData.name.replace(/\s+/g, '-')}.pdf`);
};

// Generate audit PDF report
export const generateAuditPdf = (auditData: any) => {
  // Create HTML content for the audit report
  const content = `
    <h1>Audit Report: ${auditData.title || 'Untitled'}</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Audit Information</h2>
    <table>
      <tr>
        <th>Client</th>
        <td>${auditData.client || 'N/A'}</td>
      </tr>
      <tr>
        <th>Location</th>
        <td>${auditData.location || 'N/A'}</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>${auditData.date || 'N/A'}</td>
      </tr>
      <tr>
        <th>Auditor</th>
        <td>${auditData.auditor || 'N/A'}</td>
      </tr>
      <tr>
        <th>Overall Score</th>
        <td>${auditData.overallScore ? auditData.overallScore + '%' : 'N/A'}</td>
      </tr>
    </table>
    
    <h2>Audit Categories</h2>
    ${auditData.categories?.length ? `
      ${auditData.categories.map((category: any) => `
        <h3>${category.name} (${category.score}%)</h3>
        <table>
          <tr>
            <th>Item</th>
            <th>Score</th>
            <th>Comments</th>
          </tr>
          ${category.items?.map((item: any) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.score || '-'}</td>
              <td>${item.comments || '-'}</td>
            </tr>
          `).join('') || '<tr><td colspan="3">No items</td></tr>'}
        </table>
      `).join('')}
    ` : '<p>No categories available</p>'}
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, `audit-${auditData.id || 'report'}.pdf`);
};

// Generate financial PDF report
export const generateFinancialPdf = (title: string, financialData: any) => {
  // Create HTML content for the financial report
  const content = `
    <h1>${title || 'Financial Report'}</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    <p>Period: ${financialData.period || 'N/A'}</p>
    
    <h2>Summary</h2>
    <table>
      <tr>
        <th>Revenue</th>
        <td>R ${financialData.revenue?.toFixed(2) || '0.00'}</td>
      </tr>
      <tr>
        <th>Expenses</th>
        <td>R ${financialData.expenses?.toFixed(2) || '0.00'}</td>
      </tr>
      <tr>
        <th>Profit</th>
        <td>R ${financialData.profit?.toFixed(2) || '0.00'}</td>
      </tr>
      <tr>
        <th>Outstanding Invoices</th>
        <td>R ${financialData.outstandingInvoices?.toFixed(2) || '0.00'}</td>
      </tr>
    </table>
    
    <h2>Revenue Breakdown</h2>
    ${financialData.revenueBreakdown?.length ? `
      <table>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Percentage</th>
        </tr>
        ${financialData.revenueBreakdown.map((item: any) => `
          <tr>
            <td>${item.category}</td>
            <td>R ${item.amount.toFixed(2)}</td>
            <td>${item.percentage}%</td>
          </tr>
        `).join('')}
      </table>
    ` : '<p>No revenue breakdown available</p>'}
    
    <h2>Expense Breakdown</h2>
    ${financialData.expenseBreakdown?.length ? `
      <table>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Percentage</th>
        </tr>
        ${financialData.expenseBreakdown.map((item: any) => `
          <tr>
            <td>${item.category}</td>
            <td>R ${item.amount.toFixed(2)}</td>
            <td>${item.percentage}%</td>
          </tr>
        `).join('')}
      </table>
    ` : '<p>No expense breakdown available</p>'}
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, `financial-report-${financialData.period || 'summary'}.pdf`);
};

// Generate custom report PDF
export const generateCustomReportPdf = (reportData: any) => {
  // Create HTML content for the custom report
  const content = `
    <h1>Custom Report: ${reportData.title || 'Untitled'}</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Report Parameters</h2>
    <table>
      <tr>
        <th>Period</th>
        <td>${reportData.period || 'N/A'}</td>
      </tr>
      <tr>
        <th>Clients</th>
        <td>${reportData.clients?.join(', ') || 'All'}</td>
      </tr>
      <tr>
        <th>Locations</th>
        <td>${reportData.locations?.join(', ') || 'All'}</td>
      </tr>
      <tr>
        <th>Metrics</th>
        <td>${reportData.metrics?.join(', ') || 'N/A'}</td>
      </tr>
    </table>
    
    <h2>Results</h2>
    ${reportData.results?.length ? `
      <table>
        <tr>
          ${reportData.columns?.map((column: string) => `<th>${column}</th>`).join('') || ''}
        </tr>
        ${reportData.results.map((row: any) => `
          <tr>
            ${reportData.columns?.map((column: string) => `<td>${row[column] || '-'}</td>`).join('') || ''}
          </tr>
        `).join('')}
      </table>
    ` : '<p>No results available</p>'}
  `;
  
  // Download the report as PDF
  downloadAsPdf(content, `custom-report-${reportData.title?.replace(/\s+/g, '-') || 'untitled'}.pdf`);
};

// Additional PDF utilities can be added here as needed
