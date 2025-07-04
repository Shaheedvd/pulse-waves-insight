import { TrainingDocument } from '@/types/training';

export const getTrainingDocuments = (): TrainingDocument[] => [
  {
    id: '1',
    title: 'Onboarding New Employees',
    description: 'A guide to effectively onboard new employees and integrate them into the company culture.',
    type: 'guide',
    category: 'HR',
    url: 'https://example.com/onboarding-guide',
    tags: ['onboarding', 'hr', 'new hires'],
    accessLevels: ['admin', 'manager', 'employee'],
    createdBy: 'HR Department',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Effective Communication Strategies',
    description: 'Techniques and strategies for improving communication within teams and with clients.',
    type: 'tutorial',
    category: 'Communication',
    url: 'https://example.com/communication-strategies',
    tags: ['communication', 'teamwork', 'clients'],
    accessLevels: ['admin', 'manager', 'employee'],
    createdBy: 'Training Department',
    createdAt: '2024-02-15'
  },
  {
    id: '3',
    title: 'Project Management Fundamentals',
    description: 'An introduction to project management principles and best practices.',
    type: 'reference',
    category: 'Project Management',
    url: 'https://example.com/project-management-fundamentals',
    tags: ['project management', 'planning', 'execution'],
    accessLevels: ['admin', 'manager'],
    createdBy: 'PMO',
    createdAt: '2024-03-01'
  },
  {
    id: '4',
    title: 'Sales Training: Closing the Deal',
    description: 'Advanced sales techniques for closing deals and exceeding sales targets.',
    type: 'video',
    category: 'Sales',
    url: 'https://example.com/sales-training-closing-the-deal',
    tags: ['sales', 'closing', 'targets'],
    accessLevels: ['admin', 'manager', 'sales'],
    createdBy: 'Sales Manager',
    createdAt: '2024-03-10'
  },
  {
    id: '5',
    title: 'Customer Service Excellence',
    description: 'Training module on providing excellent customer service and handling difficult situations.',
    type: 'faq',
    category: 'Customer Service',
    url: 'https://example.com/customer-service-excellence',
    tags: ['customer service', 'support', 'satisfaction'],
    accessLevels: ['admin', 'manager', 'support'],
    createdBy: 'Support Lead',
    createdAt: '2024-03-15'
  },
  
  // Add the new Teams and WhatsApp setup guide
  {
    id: 'teams-whatsapp-setup',
    title: 'Setting Up Teams and WhatsApp API Configuration',
    description: 'Complete step-by-step guide for integrating Microsoft Teams (via Graph API) and WhatsApp Business Cloud API into your system. Includes authentication setup, permissions configuration, and security best practices.',
    type: 'guide',
    category: 'Communication',
    url: '/training/teams-whatsapp-setup',
    tags: ['teams', 'whatsapp', 'api', 'integration', 'configuration', 'communication'],
    accessLevels: ['admin', 'manager', 'developer'],
    createdBy: 'System Administrator',
    createdAt: new Date().toISOString(),
    isBuiltIn: true
  }
];
