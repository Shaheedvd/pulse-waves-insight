
export interface MarketingTask {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  trackingMethod: string;
  assignedTo: string | null;
  dueDate: string | null;
  status: "pending" | "in-progress" | "completed" | "overdue";
  completionDate?: string;
  metrics?: {
    [key: string]: number | string;
  };
}

export interface MarketingCategory {
  name: string;
  subcategories: {
    name: string;
    tasks: MarketingTask[];
  }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "not-started" | "in-progress" | "on-hold" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignedTo: string[];
  completionPercentage: number;
  tasks: ProjectTask[];
  createdBy: string;
  createdAt: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignedTo: string | null;
  dueDate: string | null;
  completionDate?: string;
  priority: "low" | "medium" | "high";
  dependsOn?: string[];
}

export interface TrainingResource {
  id: string;
  title: string;
  category: "SEO" | "Social Media" | "Email Marketing" | "Collaboration" | "Gamification";
  description: string;
  contentType: "video" | "document" | "quiz" | "interactive";
  url: string;
  createdBy: string;
  createdAt: string;
}

export interface AdminKpi {
  id: string;
  name: string;
  category: "marketing" | "sales" | "operations" | "training";
  description: string;
  target: string;
  current: number | null;
  unit: string;
  progress: number;
  trend: "up" | "down" | "stable" | "none";
  lastUpdated: string;
}

// New interfaces for ISO Audit

export interface ISOAuditItem {
  id: string;
  question: string;
  category: string;
  subcategory: string;
  section: string;
  maxScore: number;
  score?: number;
  comments?: string;
  hasEvidence?: boolean;
  evidenceNotes?: string;
}

export interface ISOAuditSection {
  title: string;
  description?: string;
  items: ISOAuditItem[];
}

export interface ISOAuditTemplate {
  id: string;
  name: string;
  description?: string;
  sections: ISOAuditSection[];
  createdBy: string;
  createdAt: string;
  lastUpdated?: string;
}

// Marketing Strategy Tasks Templates

export interface MarketingStrategyTemplate {
  category: string;
  subcategories: {
    name: string;
    tasks: {
      title: string;
      description: string;
      trackingMethod: string;
    }[];
  }[];
}

export const MARKETING_STRATEGIES: MarketingStrategyTemplate[] = [
  {
    category: "Digital Marketing",
    subcategories: [
      {
        name: "SEO",
        tasks: [
          {
            title: "Keyword Research",
            description: "Conduct keyword research to identify relevant search terms for our services. Use tools like SEMrush, Ahrefs or Google Keyword Planner.",
            trackingMethod: "Document with keyword list and search volume data"
          },
          {
            title: "Content Optimization",
            description: "Optimize existing website pages for target keywords. Track changes made and before/after SEO metrics.",
            trackingMethod: "List of optimized pages, changes made, and metric changes"
          }
        ]
      },
      {
        name: "Content Marketing",
        tasks: [
          {
            title: "Blog Post Creation",
            description: "Write blog posts on customer experience topics. Follow the content calendar and SEO guidelines.",
            trackingMethod: "Link to published blog post, date of publication"
          },
          {
            title: "Infographic Design",
            description: "Design infographics summarizing key data points from client case studies. Use brand colors and style guidelines.",
            trackingMethod: "Infographic file, publication details"
          }
        ]
      },
      {
        name: "PPC Advertising",
        tasks: [
          {
            title: "Google Ads Campaign",
            description: "Create and manage targeted Google Ads campaigns for key service offerings.",
            trackingMethod: "Campaign metrics, CTR, conversion rate, cost per acquisition"
          },
          {
            title: "Remarketing Campaign",
            description: "Set up remarketing campaigns to target website visitors who didn't convert.",
            trackingMethod: "Campaign metrics, conversion rate from returning visitors"
          }
        ]
      },
      {
        name: "Email Marketing",
        tasks: [
          {
            title: "Newsletter Creation",
            description: "Design and send monthly newsletters showcasing insights, case studies, and service updates.",
            trackingMethod: "Open rates, click-through rates, conversion metrics"
          },
          {
            title: "Email List Management",
            description: "Maintain and grow email subscriber list through website opt-ins and lead magnets.",
            trackingMethod: "List growth rate, engagement metrics"
          }
        ]
      },
      {
        name: "Website Optimization",
        tasks: [
          {
            title: "Website Performance Review",
            description: "Conduct monthly review of website performance, load times, and user experience.",
            trackingMethod: "Performance metrics report, recommendations log"
          },
          {
            title: "Landing Page Creation",
            description: "Design and implement targeted landing pages for specific services or campaigns.",
            trackingMethod: "Conversion rates, bounce rates, time on page"
          }
        ]
      }
    ]
  },
  {
    category: "Social Media Marketing",
    subcategories: [
      {
        name: "LinkedIn",
        tasks: [
          {
            title: "LinkedIn Engagement",
            description: "Share relevant industry articles on LinkedIn and engage in discussions. Track interactions.",
            trackingMethod: "List of posts shared, engagement metrics"
          },
          {
            title: "Thought Leadership Content",
            description: "Create and share original thought leadership articles on industry trends and best practices.",
            trackingMethod: "Content performance metrics, engagement rates"
          }
        ]
      },
      {
        name: "Twitter",
        tasks: [
          {
            title: "Twitter Industry Engagement",
            description: "Monitor and engage with relevant industry conversations and trending topics.",
            trackingMethod: "Engagement metrics, follower growth"
          },
          {
            title: "Twitter Content Strategy",
            description: "Create and schedule regular tweets sharing company updates, insights, and industry news.",
            trackingMethod: "Engagement metrics, click-through rates"
          }
        ]
      },
      {
        name: "Facebook/Instagram",
        tasks: [
          {
            title: "Visual Content Creation",
            description: "Develop visual content showcasing company culture, client success stories, and service highlights.",
            trackingMethod: "Engagement metrics, reach, saved posts"
          },
          {
            title: "FB/IG Campaign Management",
            description: "Create and manage targeted ad campaigns on Facebook and Instagram.",
            trackingMethod: "Campaign metrics, conversion rates, ROI"
          }
        ]
      },
      {
        name: "Video Marketing",
        tasks: [
          {
            title: "Client Testimonial Videos",
            description: "Produce video testimonials featuring satisfied clients discussing results achieved.",
            trackingMethod: "Video completion rates, engagement, lead generation"
          },
          {
            title: "Service Overview Videos",
            description: "Create short videos explaining key services and methodologies in an engaging format.",
            trackingMethod: "View counts, watch time, conversion from viewers"
          }
        ]
      }
    ]
  },
  {
    category: "Direct Sales & Business Development",
    subcategories: [
      {
        name: "Targeted Outreach",
        tasks: [
          {
            title: "Prospect List Creation",
            description: "Research and compile lists of potential clients in target sectors with contact information for key decision-makers.",
            trackingMethod: "Document with prospect list, database entries"
          },
          {
            title: "Personalized Email Campaign",
            description: "Draft and send personalized emails to prospects, introducing services and scheduling meetings.",
            trackingMethod: "Number of emails sent, open rate, response rate, meetings scheduled"
          }
        ]
      },
      {
        name: "Industry Events",
        tasks: [
          {
            title: "Event Identification & Planning",
            description: "Identify relevant industry conferences and events to attend or sponsor.",
            trackingMethod: "Event calendar, attendance plans, budget allocation"
          },
          {
            title: "Event Follow-up",
            description: "Execute systematic follow-up with contacts made at industry events.",
            trackingMethod: "Contact list, follow-up communications, conversion rate"
          }
        ]
      },
      {
        name: "Partnerships",
        tasks: [
          {
            title: "Industry Association Outreach",
            description: "Identify and contact relevant industry associations to explore partnership opportunities.",
            trackingMethod: "List of associations contacted, status of communications"
          },
          {
            title: "Strategic Partner Development",
            description: "Develop relationships with complementary service providers for referral arrangements.",
            trackingMethod: "Partner meeting notes, referral tracking"
          }
        ]
      },
      {
        name: "Client Programs",
        tasks: [
          {
            title: "Pilot Program Development",
            description: "Design limited-scope pilot programs to demonstrate service value to prospective clients.",
            trackingMethod: "Pilot program details, conversion rate to full clients"
          },
          {
            title: "Client Referral Program",
            description: "Implement and promote client referral program with appropriate incentives.",
            trackingMethod: "Number of referrals, conversion rate, incentive distribution"
          }
        ]
      }
    ]
  },
  {
    category: "Marketing Tools & Technology",
    subcategories: [
      {
        name: "CRM Management",
        tasks: [
          {
            title: "CRM Data Entry",
            description: "Ensure all leads and client interactions are properly recorded in the CRM system.",
            trackingMethod: "Number of records updated/added, data quality metrics"
          },
          {
            title: "CRM Pipeline Management",
            description: "Maintain accurate sales pipeline with appropriate follow-up tasks and reminders.",
            trackingMethod: "Pipeline accuracy, follow-up completion rate"
          }
        ]
      },
      {
        name: "Marketing Automation",
        tasks: [
          {
            title: "Automation Workflow Creation",
            description: "Develop automated marketing workflows for lead nurturing and client engagement.",
            trackingMethod: "Workflow performance metrics, conversion rates"
          },
          {
            title: "Email Sequence Optimization",
            description: "Monitor and optimize automated email sequences based on performance data.",
            trackingMethod: "Open rates, click rates, conversion rates per sequence"
          }
        ]
      },
      {
        name: "Analytics",
        tasks: [
          {
            title: "Monthly Marketing Analytics Review",
            description: "Analyze marketing performance across all channels and prepare summary report.",
            trackingMethod: "Monthly analytics report, key insights identified"
          },
          {
            title: "Campaign Attribution Analysis",
            description: "Track and analyze which marketing activities are generating qualified leads and clients.",
            trackingMethod: "Attribution model data, channel performance metrics"
          }
        ]
      },
      {
        name: "Social Listening",
        tasks: [
          {
            title: "Brand Mention Monitoring",
            description: "Monitor social media and other channels for brand mentions and competitor analysis.",
            trackingMethod: "Brand mention reports, sentiment analysis"
          },
          {
            title: "Industry Trend Tracking",
            description: "Track emerging industry trends and discussions relevant to service offerings.",
            trackingMethod: "Trend reports, opportunity identification"
          }
        ]
      }
    ]
  }
];

// ISO Audit Template

export const ISO_AUDIT_TEMPLATE: ISOAuditTemplate = {
  id: "iso-audit-001",
  name: "ISO Business Audit Template",
  description: "Comprehensive business audit based on ISO principles for office-based businesses",
  sections: [
    {
      title: "Security (Physical & Information)",
      items: [
        {
          id: "sec-phys-001",
          question: "Are entry/exit points adequately secured (e.g., key cards, security personnel)?",
          category: "Physical Security",
          subcategory: "Access Control",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-phys-002",
          question: "Is visitor access controlled and documented?",
          category: "Physical Security",
          subcategory: "Access Control",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-phys-003",
          question: "Are sensitive areas (e.g., server rooms) restricted?",
          category: "Physical Security",
          subcategory: "Access Control",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-phys-004",
          question: "Are security systems (alarms, CCTV) functional and regularly maintained?",
          category: "Physical Security",
          subcategory: "Access Control",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-prem-001",
          question: "Are windows and doors secure?",
          category: "Physical Security",
          subcategory: "Premises Security",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-prem-002",
          question: "Is there adequate lighting in and around the premises?",
          category: "Physical Security",
          subcategory: "Premises Security",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-prem-003",
          question: "Are emergency exits clearly marked and unobstructed?",
          category: "Physical Security",
          subcategory: "Premises Security",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-prem-004",
          question: "Is there a process for securing the office outside of business hours?",
          category: "Physical Security",
          subcategory: "Premises Security",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-desk-001",
          question: "Is there a policy promoting a clean desk environment for sensitive information?",
          category: "Physical Security",
          subcategory: "Clean Desk Policy",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-desk-002",
          question: "Is the clean desk policy observed?",
          category: "Physical Security",
          subcategory: "Clean Desk Policy",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-data-001",
          question: "Are employees aware of basic data protection practices?",
          category: "Information Security",
          subcategory: "Data Protection Awareness",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-data-002",
          question: "Are there guidelines on handling confidential information?",
          category: "Information Security",
          subcategory: "Data Protection Awareness",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-doc-001",
          question: "Are sensitive documents stored securely?",
          category: "Information Security",
          subcategory: "Document Security",
          section: "Security",
          maxScore: 5
        },
        {
          id: "sec-doc-002",
          question: "Is there a process for the secure disposal of confidential documents?",
          category: "Information Security",
          subcategory: "Document Security",
          section: "Security",
          maxScore: 5
        }
      ]
    },
    {
      title: "Health and Safety",
      items: [
        {
          id: "hs-erg-001",
          question: "Are workstations adjustable to promote good posture?",
          category: "Work Environment",
          subcategory: "Ergonomics",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-erg-002",
          question: "Are employees provided with ergonomic guidance or training?",
          category: "Work Environment",
          subcategory: "Ergonomics",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-erg-003",
          question: "Is there adequate space between workstations?",
          category: "Work Environment",
          subcategory: "Ergonomics",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-safe-001",
          question: "Are walkways clear and free from hazards?",
          category: "Work Environment",
          subcategory: "General Safety",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-safe-002",
          question: "Are cables and wires managed safely to prevent trips?",
          category: "Work Environment",
          subcategory: "General Safety",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-safe-003",
          question: "Is there adequate ventilation and temperature control?",
          category: "Work Environment",
          subcategory: "General Safety",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-safe-004",
          question: "Is the office regularly cleaned and maintained?",
          category: "Work Environment",
          subcategory: "General Safety",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-emerg-001",
          question: "Are fire extinguishers present, accessible, and regularly inspected?",
          category: "Work Environment",
          subcategory: "Emergency Preparedness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-emerg-002",
          question: "Are fire alarms functional and regularly tested?",
          category: "Work Environment",
          subcategory: "Emergency Preparedness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-emerg-003",
          question: "Are emergency evacuation plans in place and communicated to employees?",
          category: "Work Environment",
          subcategory: "Emergency Preparedness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-emerg-004",
          question: "Are first-aid kits readily available and adequately stocked?",
          category: "Work Environment",
          subcategory: "Emergency Preparedness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-emerg-005",
          question: "Are there trained first-aiders on-site?",
          category: "Work Environment",
          subcategory: "Emergency Preparedness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-well-001",
          question: "Are there adequate restroom facilities and break areas?",
          category: "Well-being",
          subcategory: "Access to Welfare Facilities",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-well-002",
          question: "Is there a culture that seems to support employee well-being?",
          category: "Well-being",
          subcategory: "Mental Health Awareness",
          section: "Health and Safety",
          maxScore: 5
        },
        {
          id: "hs-well-003",
          question: "Are employees aware of any available health and well-being resources?",
          category: "Well-being",
          subcategory: "Provision of Information/Resources",
          section: "Health and Safety",
          maxScore: 5
        }
      ]
    },
    {
      title: "Employee Morale",
      items: [
        {
          id: "em-comm-001",
          question: "Are there regular opportunities for team communication and feedback?",
          category: "Communication & Engagement",
          subcategory: "Team Communication",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-comm-002",
          question: "Do employees seem informed about company news and updates?",
          category: "Communication & Engagement",
          subcategory: "Information Sharing",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-comm-003",
          question: "Are there channels for employees to voice concerns or suggestions?",
          category: "Communication & Engagement",
          subcategory: "Feedback Channels",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-cult-001",
          question: "Is there a generally positive and respectful atmosphere observed?",
          category: "Workplace Culture",
          subcategory: "Atmosphere",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-cult-002",
          question: "Is there evidence of teamwork and collaboration?",
          category: "Workplace Culture",
          subcategory: "Collaboration",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-recog-001",
          question: "Are there informal or formal mechanisms for recognizing employee contributions?",
          category: "Recognition & Appreciation",
          subcategory: "Recognition Systems",
          section: "Employee Morale",
          maxScore: 5
        },
        {
          id: "em-work-001",
          question: "Are there policies or practices that support work-life balance (e.g., flexible working)?",
          category: "Work-Life Balance",
          subcategory: "Flexible Policies",
          section: "Employee Morale",
          maxScore: 5
        }
      ]
    },
    {
      title: "Business Policy & Structure",
      items: [
        {
          id: "bp-policy-001",
          question: "Are key business policies documented and accessible to all employees?",
          category: "Policy Awareness & Accessibility",
          subcategory: "Documentation",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-policy-002",
          question: "Is there evidence that employees are aware of these policies?",
          category: "Policy Awareness & Accessibility",
          subcategory: "Awareness",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-org-001",
          question: "Is the organizational structure clearly defined and communicated?",
          category: "Organizational Structure",
          subcategory: "Definition",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-org-002",
          question: "Are reporting lines and responsibilities clear to employees?",
          category: "Organizational Structure",
          subcategory: "Clarity",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-proc-001",
          question: "Are key operational processes documented at a high level?",
          category: "Process Documentation",
          subcategory: "Documentation",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-proc-002",
          question: "Is there a system for reviewing and updating policies and procedures?",
          category: "Process Documentation",
          subcategory: "Maintenance",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-comp-001",
          question: "Is there a stated commitment to ethical conduct and compliance with relevant regulations?",
          category: "Compliance & Ethics",
          subcategory: "Commitment",
          section: "Business Policy",
          maxScore: 5
        },
        {
          id: "bp-comp-002",
          question: "Are there mechanisms for reporting unethical behavior or breaches of policy?",
          category: "Compliance & Ethics",
          subcategory: "Reporting",
          section: "Business Policy",
          maxScore: 5
        }
      ]
    },
    {
      title: "ISO Alignment",
      items: [
        {
          id: "iso-doc-001",
          question: "Is there evidence of documented policies, procedures, and records related to the areas audited?",
          category: "ISO Alignment",
          subcategory: "Documented Information",
          section: "ISO Principles",
          maxScore: 5
        },
        {
          id: "iso-mgmt-001",
          question: "Is there visible support from management for the principles covered in this audit?",
          category: "ISO Alignment",
          subcategory: "Management Commitment",
          section: "ISO Principles",
          maxScore: 5
        },
        {
          id: "iso-imp-001",
          question: "Are there mechanisms in place for identifying and addressing areas for improvement?",
          category: "ISO Alignment",
          subcategory: "Continuous Improvement",
          section: "ISO Principles",
          maxScore: 5
        },
        {
          id: "iso-aware-001",
          question: "Do employees seem aware of relevant policies and procedures for their roles?",
          category: "ISO Alignment",
          subcategory: "Awareness & Competence",
          section: "ISO Principles",
          maxScore: 5
        }
      ]
    }
  ],
  createdBy: "system",
  createdAt: new Date().toISOString()
};
