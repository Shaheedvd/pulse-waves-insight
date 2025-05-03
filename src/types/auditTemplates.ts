export const ISO_AUDIT_TEMPLATE = {
  name: "ISO Business Audit",
  description: "Comprehensive ISO-aligned business assessment",
  sections: [
    {
      title: "Security (Physical & Information)",
      description: "Evaluation of physical and information security measures",
      items: [
        {
          question: "Are entry/exit points adequately secured (e.g., key cards, security personnel)?",
          subcategory: "Physical Security - Access Control"
        },
        {
          question: "Is visitor access controlled and documented?",
          subcategory: "Physical Security - Access Control"
        },
        {
          question: "Are sensitive areas (e.g., server rooms) restricted?",
          subcategory: "Physical Security - Access Control"
        },
        {
          question: "Are security systems (alarms, CCTV) functional and regularly maintained?",
          subcategory: "Physical Security - Access Control"
        },
        {
          question: "Are windows and doors secure?",
          subcategory: "Physical Security - Premises Security"
        },
        {
          question: "Is there adequate lighting in and around the premises?",
          subcategory: "Physical Security - Premises Security"
        },
        {
          question: "Are emergency exits clearly marked and unobstructed?",
          subcategory: "Physical Security - Premises Security"
        },
        {
          question: "Is there a process for securing the office outside of business hours?",
          subcategory: "Physical Security - Premises Security"
        },
        {
          question: "Is there a policy promoting a clean desk environment for sensitive information?",
          subcategory: "Physical Security - Clean Desk Policy"
        },
        {
          question: "Is the clean desk policy observed?",
          subcategory: "Physical Security - Clean Desk Policy"
        },
        {
          question: "Are employees aware of basic data protection practices?",
          subcategory: "Information Security - Data Protection Awareness"
        },
        {
          question: "Are there guidelines on handling confidential information?",
          subcategory: "Information Security - Data Protection Awareness"
        },
        {
          question: "Are sensitive documents stored securely?",
          subcategory: "Information Security - Document Security"
        },
        {
          question: "Is there a process for the secure disposal of confidential documents?",
          subcategory: "Information Security - Document Security"
        }
      ]
    },
    {
      title: "Health and Safety",
      description: "Assessment of workplace safety and employee well-being",
      items: [
        {
          question: "Are workstations adjustable to promote good posture?",
          subcategory: "Work Environment - Ergonomics"
        },
        {
          question: "Are employees provided with ergonomic guidance or training?",
          subcategory: "Work Environment - Ergonomics"
        },
        {
          question: "Is there adequate space between workstations?",
          subcategory: "Work Environment - Ergonomics"
        },
        {
          question: "Are walkways clear and free from hazards?",
          subcategory: "Work Environment - General Safety"
        },
        {
          question: "Are cables and wires managed safely to prevent trips?",
          subcategory: "Work Environment - General Safety"
        },
        {
          question: "Is there adequate ventilation and temperature control?",
          subcategory: "Work Environment - General Safety"
        },
        {
          question: "Is the office regularly cleaned and maintained?",
          subcategory: "Work Environment - General Safety"
        },
        {
          question: "Are fire extinguishers present, accessible, and regularly inspected?",
          subcategory: "Work Environment - Emergency Preparedness"
        },
        {
          question: "Are fire alarms functional and regularly tested?",
          subcategory: "Work Environment - Emergency Preparedness"
        },
        {
          question: "Are emergency evacuation plans in place and communicated to employees?",
          subcategory: "Work Environment - Emergency Preparedness"
        },
        {
          question: "Are first-aid kits readily available and adequately stocked?",
          subcategory: "Work Environment - Emergency Preparedness"
        },
        {
          question: "Are there trained first-aiders on-site?",
          subcategory: "Work Environment - Emergency Preparedness"
        },
        {
          question: "Are there adequate restroom facilities and break areas?",
          subcategory: "Well-being - Access to Welfare Facilities"
        },
        {
          question: "Is there a culture that seems to support employee well-being?",
          subcategory: "Well-being - Mental Health Awareness"
        },
        {
          question: "Are employees aware of any available health and well-being resources?",
          subcategory: "Well-being - Provision of Information/Resources"
        }
      ]
    },
    {
      title: "Employee Morale",
      description: "Evaluation of communication, culture, and employee engagement",
      items: [
        {
          question: "Are there regular opportunities for team communication and feedback?",
          subcategory: "Communication & Engagement"
        },
        {
          question: "Do employees seem informed about company news and updates?",
          subcategory: "Communication & Engagement"
        },
        {
          question: "Are there channels for employees to voice concerns or suggestions?",
          subcategory: "Communication & Engagement"
        },
        {
          question: "Is there a generally positive and respectful atmosphere observed?",
          subcategory: "Workplace Culture"
        },
        {
          question: "Is there evidence of teamwork and collaboration?",
          subcategory: "Workplace Culture"
        },
        {
          question: "Are there informal or formal mechanisms for recognizing employee contributions?",
          subcategory: "Recognition & Appreciation"
        },
        {
          question: "Are there policies or practices that support work-life balance (e.g., flexible working)?",
          subcategory: "Work-Life Balance"
        }
      ]
    },
    {
      title: "Business Policy & Structure",
      description: "Review of organizational policies, structure, and processes",
      items: [
        {
          question: "Are key business policies (e.g., code of conduct, IT usage, health & safety) documented and accessible to all employees?",
          subcategory: "Policy Awareness & Accessibility"
        },
        {
          question: "Is there evidence that employees are aware of these policies?",
          subcategory: "Policy Awareness & Accessibility"
        },
        {
          question: "Is the organizational structure clearly defined and communicated (e.g., org charts)?",
          subcategory: "Organizational Structure"
        },
        {
          question: "Are reporting lines and responsibilities clear to employees?",
          subcategory: "Organizational Structure"
        },
        {
          question: "Are key operational processes documented at a high level?",
          subcategory: "Process Documentation"
        },
        {
          question: "Is there a system for reviewing and updating policies and procedures?",
          subcategory: "Process Documentation"
        },
        {
          question: "Is there a stated commitment to ethical conduct and compliance with relevant regulations?",
          subcategory: "Compliance & Ethics"
        },
        {
          question: "Are there mechanisms for reporting unethical behavior or breaches of policy?",
          subcategory: "Compliance & Ethics"
        }
      ]
    },
    {
      title: "ISO Alignment",
      description: "Assessment of practices against ISO standards",
      items: [
        {
          question: "Is there evidence of documented policies, procedures, and records related to the areas audited?",
          subcategory: "Documented Information"
        },
        {
          question: "Is there visible support from management for the principles covered in this audit?",
          subcategory: "Management Commitment"
        },
        {
          question: "Are there mechanisms in place for identifying and addressing areas for improvement in security, health & safety, morale, policy, and structure?",
          subcategory: "Continuous Improvement"
        },
        {
          question: "Do employees seem aware of relevant policies and procedures for their roles?",
          subcategory: "Awareness & Competence"
        }
      ]
    }
  ]
};

export const COMPREHENSIVE_BUSINESS_AUDIT = {
  name: "Comprehensive Business Assessment",
  description: "A 300-question in-depth business evaluation covering all aspects of operations",
  sections: [
    {
      title: "Strategy and Vision",
      description: "Evaluation of the company's strategic direction and long-term planning",
      items: [
        {
          question: "What is the company's core mission and vision?",
          subcategory: "Core Purpose"
        },
        {
          question: "What are the key strategic objectives for the next 3-5 years?",
          subcategory: "Strategic Planning"
        },
        {
          question: "How does the company differentiate itself from competitors?",
          subcategory: "Competitive Positioning"
        },
        {
          question: "What is the company's unique value proposition?",
          subcategory: "Value Proposition"
        },
        {
          question: "What are the major risks and opportunities facing the business?",
          subcategory: "Risk Assessment"
        },
        {
          question: "How does the company monitor and adapt to industry trends?",
          subcategory: "Industry Analysis"
        },
        {
          question: "What is the company's long-term growth strategy?",
          subcategory: "Growth Planning"
        },
        {
          question: "How is innovation fostered within the organization?",
          subcategory: "Innovation Management"
        },
        {
          question: "What is the process for strategic decision-making?",
          subcategory: "Decision Processes"
        },
        {
          question: "How effectively is the strategy communicated throughout the company?",
          subcategory: "Strategy Communication"
        },
        {
          question: "What are the key performance indicators (KPIs) used to track strategic progress?",
          subcategory: "Performance Measurement"
        },
        {
          question: "How often are strategic goals reviewed and adjusted?",
          subcategory: "Strategic Review"
        },
        {
          question: "What is the company's approach to sustainability and social responsibility?",
          subcategory: "Corporate Responsibility"
        },
        {
          question: "How does the company define and measure success?",
          subcategory: "Success Metrics"
        },
        {
          question: "What is the company's exit strategy (if applicable)?",
          subcategory: "Business Planning"
        },
        {
          question: "How resilient is the business model to external shocks?",
          subcategory: "Business Resilience"
        },
        {
          question: "What are the potential barriers to achieving strategic goals?",
          subcategory: "Strategic Challenges"
        },
        {
          question: "How does the company leverage its core competencies?",
          subcategory: "Capabilities Alignment"
        },
        {
          question: "What is the company's approach to mergers and acquisitions (if relevant)?",
          subcategory: "Growth Strategy"
        },
        {
          question: "How does the company ensure alignment between different departments and strategic goals?",
          subcategory: "Organizational Alignment"
        },
        {
          question: "What is the company's competitive advantage and how is it maintained?",
          subcategory: "Competitive Advantage"
        },
        {
          question: "How does the company assess and manage its intellectual property?",
          subcategory: "IP Management"
        },
        {
          question: "What are the key assumptions underlying the current strategy?",
          subcategory: "Strategic Planning"
        },
        {
          question: "How are stakeholder interests considered in strategic planning?",
          subcategory: "Stakeholder Management"
        },
        {
          question: "What is the company's approach to international expansion (if applicable)?",
          subcategory: "Global Strategy"
        },
        {
          question: "How does the company adapt to changing regulatory environments?",
          subcategory: "Regulatory Adaptation"
        },
        {
          question: "What is the company's digital transformation strategy?",
          subcategory: "Digital Strategy"
        },
        {
          question: "How does the company leverage data analytics for strategic insights?",
          subcategory: "Data-Driven Strategy"
        },
        {
          question: "What is the company's approach to risk management and mitigation?",
          subcategory: "Risk Management"
        },
        {
          question: "How does the company foster a culture of continuous improvement?",
          subcategory: "Organizational Culture"
        }
      ]
    },
    {
      title: "Operations and Processes",
      description: "Assessment of operational efficiency, processes, and quality management",
      items: [
        {
          question: "What are the key operational processes within the company?",
          subcategory: "Process Identification"
        },
        {
          question: "How efficient and effective are these processes?",
          subcategory: "Process Efficiency"
        },
        {
          question: "What technologies are used to support operations?",
          subcategory: "Operational Technology"
        },
        {
          question: "What is the capacity utilization rate?",
          subcategory: "Capacity Management"
        },
        {
          question: "What are the key bottlenecks in the operational flow?",
          subcategory: "Process Bottlenecks"
        },
        {
          question: "How is quality control managed throughout the process?",
          subcategory: "Quality Management"
        },
        {
          question: "What are the lead times for key products or services?",
          subcategory: "Time Management"
        },
        {
          question: "What is the inventory management system?",
          subcategory: "Inventory Control"
        },
        {
          question: "How are supply chain relationships managed?",
          subcategory: "Supply Chain Management"
        },
        {
          question: "What is the level of automation in operations?",
          subcategory: "Automation"
        },
        {
          question: "What are the maintenance procedures for critical equipment?",
          subcategory: "Equipment Maintenance"
        },
        {
          question: "How is process improvement implemented and measured?",
          subcategory: "Continuous Improvement"
        },
        {
          question: "What are the standard operating procedures (SOPs) for key tasks?",
          subcategory: "Standardization"
        },
        {
          question: "How is workplace safety managed?",
          subcategory: "Safety Management"
        },
        {
          question: "What are the environmental impacts of operations and how are they mitigated?",
          subcategory: "Environmental Management"
        },
        {
          question: "How is outsourcing managed (if applicable)?",
          subcategory: "Outsourcing"
        },
        {
          question: "What is the business continuity plan in case of disruptions?",
          subcategory: "Business Continuity"
        },
        {
          question: "How is data integrity ensured in operational systems?",
          subcategory: "Data Management"
        },
        {
          question: "What are the costs associated with key operational processes?",
          subcategory: "Cost Management"
        },
        {
          question: "How are operational performance metrics tracked and reported?",
          subcategory: "Performance Metrics"
        },
        {
          question: "What is the level of waste and inefficiency in operations?",
          subcategory: "Waste Management"
        },
        {
          question: "How are customer feedback incorporated into operational improvements?",
          subcategory: "Customer-Centric Operations"
        },
        {
          question: "What is the energy consumption of operations and are there efficiency initiatives?",
          subcategory: "Energy Management"
        },
        {
          question: "How is logistics and distribution handled?",
          subcategory: "Logistics"
        },
        {
          question: "What is the level of customization offered in products or services?",
          subcategory: "Customization"
        },
        {
          question: "How scalable are the current operational processes?",
          subcategory: "Scalability"
        },
        {
          question: "What are the disaster recovery protocols?",
          subcategory: "Disaster Recovery"
        },
        {
          question: "How is knowledge management handled within operations?",
          subcategory: "Knowledge Management"
        },
        {
          question: "What is the role of technology in streamlining workflows?",
          subcategory: "Technology Integration"
        },
        {
          question: "How are operational risks identified and managed?",
          subcategory: "Operational Risk"
        },
        {
          question: "What is the process for handling returns and complaints?",
          subcategory: "Customer Service"
        },
        {
          question: "How is the performance of suppliers evaluated?",
          subcategory: "Supplier Management"
        },
        {
          question: "What are the transportation costs and efficiency?",
          subcategory: "Transportation Management"
        },
        {
          question: "How is production planning and scheduling managed?",
          subcategory: "Production Planning"
        },
        {
          question: "What is the level of integration between different operational systems?",
          subcategory: "System Integration"
        },
        {
          question: "How are operational changes communicated and implemented?",
          subcategory: "Change Management"
        },
        {
          question: "What is the training provided for operational staff?",
          subcategory: "Staff Training"
        },
        {
          question: "How is the security of operational facilities maintained?",
          subcategory: "Facility Security"
        },
        {
          question: "What are the ethical considerations in operational practices?",
          subcategory: "Ethical Operations"
        },
        {
          question: "How does the company ensure compliance with relevant operational regulations?",
          subcategory: "Regulatory Compliance"
        }
      ]
    },
    {
      title: "Marketing and Sales",
      description: "Evaluation of marketing strategies, sales processes, and customer engagement",
      items: [
        {
          question: "What are the target customer segments?",
          subcategory: "Market Segmentation"
        },
        {
          question: "What is the company's marketing strategy?",
          subcategory: "Marketing Planning"
        },
        {
          question: "What are the key marketing channels used?",
          subcategory: "Channel Strategy"
        },
        {
          question: "What is the customer acquisition cost (CAC)?",
          subcategory: "Marketing Metrics"
        },
        {
          question: "What is the customer lifetime value (CLTV)?",
          subcategory: "Customer Value"
        },
        {
          question: "How effective are the marketing campaigns?",
          subcategory: "Campaign Performance"
        },
        {
          question: "What is the brand positioning and messaging?",
          subcategory: "Brand Strategy"
        },
        {
          question: "How is brand awareness measured?",
          subcategory: "Brand Metrics"
        },
        {
          question: "What is the sales process and cycle?",
          subcategory: "Sales Process"
        },
        {
          question: "What are the sales targets and achievements?",
          subcategory: "Sales Performance"
        }
      ]
    },
    {
      title: "Finance and Accounting",
      description: "Assessment of financial health, accounting practices, and financial management",
      items: [
        {
          question: "What are the key revenue streams?",
          subcategory: "Revenue Analysis"
        },
        {
          question: "What is the cost of goods sold (COGS)?",
          subcategory: "Cost Structure"
        }
      ]
    },
    {
      title: "Human Resources and Talent Management",
      description: "Review of HR practices, organizational culture, and talent development",
      items: [
        {
          question: "What is the organizational structure?",
          subcategory: "Organizational Design"
        },
        {
          question: "What is the company culture like?",
          subcategory: "Organizational Culture"
        }
      ]
    },
    {
      title: "Technology and Innovation",
      description: "Evaluation of technology infrastructure, innovation processes, and digital capabilities",
      items: [
        {
          question: "What are the key technologies used in the business?",
          subcategory: "Technology Stack"
        },
        {
          question: "How is technology aligned with business strategy?",
          subcategory: "Technology Strategy"
        }
      ]
    },
    {
      title: "Governance and Legal",
      description: "Assessment of governance structures, legal compliance, and risk management",
      items: [
        {
          question: "What is the ownership structure of the company?",
          subcategory: "Ownership"
        },
        {
          question: "What is the board of directors' composition and responsibilities?",
          subcategory: "Board Governance"
        }
      ]
    },
    {
      title: "External Environment and Stakeholders",
      description: "Analysis of external factors, stakeholder relationships, and market positioning",
      items: [
        {
          question: "Who are the key stakeholders of the company?",
          subcategory: "Stakeholder Mapping"
        },
        {
          question: "How are relationships managed with each stakeholder group?",
          subcategory: "Stakeholder Management"
        }
      ]
    },
    {
      title: "Overall Business Health and Future Outlook",
      description: "Holistic assessment of business health and prospects",
      items: [
        {
          question: "What are the biggest strengths of the business?",
          subcategory: "Strengths Assessment"
        },
        {
          question: "What are the key areas for improvement?",
          subcategory: "Improvement Areas"
        },
        {
          question: "What is the overall financial health of the company?",
          subcategory: "Financial Health"
        },
        {
          question: "What is the long-term growth potential of the business?",
          subcategory: "Growth Potential"
        },
        {
          question: "How sustainable is the current business model?",
          subcategory: "Business Sustainability"
        },
        {
          question: "What are the key challenges the company expects to face in the future?",
          subcategory: "Future Challenges"
        },
        {
          question: "How agile and adaptable is the company to change?",
          subcategory: "Adaptability"
        },
        {
          question: "What is the overall risk profile of the business?",
          subcategory: "Risk Profile"
        },
        {
          question: "What is the leadership's vision for the future of the company?",
          subcategory: "Leadership Vision"
        },
        {
          question: "Based on the evaluation, what are the top priorities for action?",
          subcategory: "Action Priorities"
        }
      ]
    }
  ]
};

export const auditTemplates = {
  business: {
    name: "Business Audit",
    sections: [
      {
        title: "Section 1",
        items: []
      },
      {
        title: "Section 2", 
        items: []
      }
    ]
  },
  forecourt_shop: {
    name: "Forecourt Shop Audit",
    sections: [
      {
        title: "Section 1",
        items: []
      },
      {
        title: "Section 2",
        items: []
      }
    ]
  },
  shop_only: {
    name: "Shop Only Audit",
    sections: [
      {
        title: "Section 1",
        items: []
      },
      {
        title: "Section 2",
        items: []
      }
    ]
  }
};
