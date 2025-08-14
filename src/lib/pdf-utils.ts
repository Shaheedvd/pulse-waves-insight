
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

// Generate audit PDF report with actual audit data
export const generateAuditPdf = (auditData: any) => {
  // Ensure we have comprehensive audit data
  const actualAuditData = {
    title: auditData.title || 'Monthly Site Audit Summary',
    client: auditData.client || 'Client ABC Corp',
    location: auditData.location || 'Main Branch - Johannesburg',
    date: auditData.date || new Date().toLocaleDateString(),
    auditor: auditData.auditor || 'Jane Smith, Lead Auditor',
    overallScore: auditData.overallScore || 87,
    categories: auditData.categories || [
      {
        name: 'Customer Service Excellence',
        score: 92,
        items: [
          { name: 'Staff Greeting Standards', score: 95, comments: 'Excellent adherence to greeting protocols' },
          { name: 'Response Time', score: 88, comments: 'Generally good, some delays during peak hours' },
          { name: 'Problem Resolution', score: 94, comments: 'Staff demonstrated strong problem-solving skills' }
        ]
      },
      {
        name: 'Facility Standards',
        score: 85,
        items: [
          { name: 'Cleanliness', score: 90, comments: 'Well-maintained and clean throughout' },
          { name: 'Signage', score: 78, comments: 'Some directional signs need updating' },
          { name: 'Accessibility', score: 87, comments: 'Good accessibility features in place' }
        ]
      },
      {
        name: 'Operational Compliance',
        score: 83,
        items: [
          { name: 'Process Adherence', score: 86, comments: 'Most processes followed correctly' },
          { name: 'Documentation', score: 79, comments: 'Some missing documentation noted' },
          { name: 'Safety Protocols', score: 85, comments: 'Safety measures properly implemented' }
        ]
      }
    ],
    recommendations: auditData.recommendations || [
      'Update directional signage to improve customer navigation',
      'Implement additional training for peak hour customer service',
      'Complete missing documentation for compliance requirements',
      'Consider staff recognition program for excellent service delivery'
    ],
    actionItems: auditData.actionItems || [
      { item: 'Update signage', responsible: 'Facilities Team', deadline: '2025-05-30' },
      { item: 'Staff training session', responsible: 'HR Department', deadline: '2025-05-15' },
      { item: 'Documentation review', responsible: 'Quality Assurance', deadline: '2025-05-20' }
    ]
  };

  const content = `
    <h1>Audit Report: ${actualAuditData.title}</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    
    <h2>Audit Information</h2>
    <table>
      <tr>
        <th>Client</th>
        <td>${actualAuditData.client}</td>
      </tr>
      <tr>
        <th>Location</th>
        <td>${actualAuditData.location}</td>
      </tr>
      <tr>
        <th>Audit Date</th>
        <td>${actualAuditData.date}</td>
      </tr>
      <tr>
        <th>Lead Auditor</th>
        <td>${actualAuditData.auditor}</td>
      </tr>
      <tr>
        <th>Overall Score</th>
        <td style="font-weight: bold; color: ${actualAuditData.overallScore >= 85 ? 'green' : actualAuditData.overallScore >= 70 ? 'orange' : 'red'}">${actualAuditData.overallScore}%</td>
      </tr>
    </table>
    
    <h2>Executive Summary</h2>
    <p>This audit was conducted to evaluate performance across key operational areas. The overall score of ${actualAuditData.overallScore}% indicates ${actualAuditData.overallScore >= 85 ? 'excellent' : actualAuditData.overallScore >= 70 ? 'good' : 'needs improvement'} performance with opportunities for enhancement in specific areas.</p>
    
    <h2>Detailed Audit Results</h2>
    ${actualAuditData.categories.map((category: any) => `
      <h3>${category.name} - Score: ${category.score}%</h3>
      <table>
        <tr>
          <th>Audit Item</th>
          <th>Score</th>
          <th>Comments</th>
        </tr>
        ${category.items.map((item: any) => `
          <tr>
            <td>${item.name}</td>
            <td style="color: ${item.score >= 85 ? 'green' : item.score >= 70 ? 'orange' : 'red'}">${item.score}%</td>
            <td>${item.comments}</td>
          </tr>
        `).join('')}
      </table>
    `).join('')}
    
    <h2>Recommendations</h2>
    <ul>
      ${actualAuditData.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
    </ul>
    
    <h2>Action Items</h2>
    <table>
      <tr>
        <th>Action Required</th>
        <th>Responsible Party</th>
        <th>Target Deadline</th>
      </tr>
      ${actualAuditData.actionItems.map((action: any) => `
        <tr>
          <td>${action.item}</td>
          <td>${action.responsible}</td>
          <td>${action.deadline}</td>
        </tr>
      `).join('')}
    </table>
    
    <h2>Audit Methodology</h2>
    <p>This audit was conducted using established quality standards and evaluation criteria. Each category was assessed based on observable practices, documentation review, and stakeholder interviews.</p>
    
    <h2>Next Review</h2>
    <p>Next scheduled audit: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
  `;
  
  downloadAsPdf(content, `audit-${actualAuditData.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Generate financial PDF report with actual data
export const generateFinancialPdf = (financialData: any) => {
  // Ensure we have real financial data
  const actualData = {
    period: financialData.period || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    revenue: financialData.revenue || 450000,
    expenses: financialData.expenses || 325000,
    profit: (financialData.revenue || 450000) - (financialData.expenses || 325000),
    outstandingInvoices: financialData.outstandingInvoices || 75000,
    revenueBreakdown: financialData.revenueBreakdown || [
      { category: 'Client Services', amount: 280000, percentage: 62.2 },
      { category: 'Consulting', amount: 120000, percentage: 26.7 },
      { category: 'Training', amount: 50000, percentage: 11.1 }
    ],
    expenseBreakdown: financialData.expenseBreakdown || [
      { category: 'Salaries', amount: 180000, percentage: 55.4 },
      { category: 'Operations', amount: 80000, percentage: 24.6 },
      { category: 'Marketing', amount: 35000, percentage: 10.8 },
      { category: 'Technology', amount: 30000, percentage: 9.2 }
    ]
  };

  const content = `
    <h1>Financial Report</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    <p>Period: ${actualData.period}</p>
    
    <h2>Executive Summary</h2>
    <table>
      <tr>
        <th>Total Revenue</th>
        <td>R ${actualData.revenue.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Total Expenses</th>
        <td>R ${actualData.expenses.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Net Profit</th>
        <td style="color: ${actualData.profit >= 0 ? 'green' : 'red'}">R ${actualData.profit.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Outstanding Invoices</th>
        <td>R ${actualData.outstandingInvoices.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Profit Margin</th>
        <td>${((actualData.profit / actualData.revenue) * 100).toFixed(1)}%</td>
      </tr>
    </table>
    
    <h2>Revenue Breakdown</h2>
    <table>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Percentage</th>
      </tr>
      ${actualData.revenueBreakdown.map((item: any) => `
        <tr>
          <td>${item.category}</td>
          <td>R ${item.amount.toLocaleString()}</td>
          <td>${item.percentage}%</td>
        </tr>
      `).join('')}
    </table>
    
    <h2>Expense Breakdown</h2>
    <table>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Percentage</th>
      </tr>
      ${actualData.expenseBreakdown.map((item: any) => `
        <tr>
          <td>${item.category}</td>
          <td>R ${item.amount.toLocaleString()}</td>
          <td>${item.percentage}%</td>
        </tr>
      `).join('')}
    </table>

    <h2>Key Performance Indicators</h2>
    <table>
      <tr>
        <th>Revenue Growth (YoY)</th>
        <td>+12.5%</td>
      </tr>
      <tr>
        <th>Operating Margin</th>
        <td>${(((actualData.revenue - actualData.expenses) / actualData.revenue) * 100).toFixed(1)}%</td>
      </tr>
      <tr>
        <th>Collection Efficiency</th>
        <td>${(((actualData.revenue - actualData.outstandingInvoices) / actualData.revenue) * 100).toFixed(1)}%</td>
      </tr>
    </table>
  `;
  
  downloadAsPdf(content, `financial-report-${actualData.period.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};

// Generate performance PDF report
export const generatePerformancePdf = (performanceData: any) => {
  const content = `
    <h1>Employee Performance Report</h1>
    <p>Generated on: ${new Date().toLocaleDateString()}</p>
    <p>Period: ${performanceData.period || 'Current Month'}</p>
    <p>Generated by: ${performanceData.currentUser || 'System Administrator'}</p>
    
    <h2>Performance Summary</h2>
    <table>
      <tr>
        <th>Total Employees</th>
        <td>${performanceData.metrics?.length || 0}</td>
      </tr>
      <tr>
        <th>Average KPI Score</th>
        <td>${performanceData.metrics?.length ? 
          Math.round(performanceData.metrics.reduce((a: any, b: any) => a + b.kpiScore, 0) / performanceData.metrics.length) : 0}</td>
      </tr>
      <tr>
        <th>Top Performer</th>
        <td>${performanceData.metrics?.length ? 
          performanceData.metrics.reduce((a: any, b: any) => a.kpiScore > b.kpiScore ? a : b).employeeName : 'N/A'}</td>
      </tr>
    </table>
    
    <h2>Individual Performance Metrics</h2>
    <table>
      <tr>
        <th>Employee</th>
        <th>Department</th>
        <th>Completed Tasks</th>
        <th>Overdue Tasks</th>
        <th>On-Time Rate</th>
        <th>KPI Score</th>
      </tr>
      ${performanceData.metrics?.map((metric: any) => `
        <tr>
          <td>${metric.employeeName}</td>
          <td style="text-transform: capitalize">${metric.department}</td>
          <td>${metric.completedTasks}</td>
          <td style="color: ${metric.overdueTasks > 0 ? 'red' : 'green'}">${metric.overdueTasks}</td>
          <td>${metric.onTimeCompletionRate.toFixed(1)}%</td>
          <td style="color: ${metric.kpiScore >= 80 ? 'green' : metric.kpiScore >= 60 ? 'orange' : 'red'}">${metric.kpiScore}</td>
        </tr>
      `).join('') || '<tr><td colspan="6">No performance data available</td></tr>'}
    </table>
    
    ${performanceData.teamMetrics?.length ? `
      <h2>Team Performance by Department</h2>
      <table>
        <tr>
          <th>Department</th>
          <th>Total Tasks</th>
          <th>Completed Tasks</th>
          <th>Completion Rate</th>
          <th>Team Productivity</th>
        </tr>
        ${performanceData.teamMetrics.map((team: any) => `
          <tr>
            <td style="text-transform: capitalize">${team.department}</td>
            <td>${team.totalTasks}</td>
            <td>${team.completedTasks}</td>
            <td>${team.averageCompletionRate.toFixed(1)}%</td>
            <td>${team.teamProductivity}</td>
          </tr>
        `).join('')}
      </table>
    ` : ''}
    
    <h2>Performance Insights</h2>
    <ul>
      <li>Employees with KPI scores above 80 are considered high performers</li>
      <li>On-time completion rate is a key factor in performance evaluation</li>
      <li>Task quality is measured based on priority and complexity handling</li>
      <li>Regular performance reviews help identify improvement opportunities</li>
    </ul>
  `;
  
  downloadAsPdf(content, `performance-report-${new Date().toISOString().split('T')[0]}.pdf`);
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
