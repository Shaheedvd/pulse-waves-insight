
import { TrainingDocument } from "@/types/training";
import { UserRole } from "@/contexts/AuthContext";

// Sample training documentation database
const trainingDocuments: TrainingDocument[] = [
  // SEO Training
  {
    id: "doc-1",
    title: "How to Optimize Page SEO",
    description: "A comprehensive guide on optimizing page content for search engines",
    type: "guide",
    category: "SEO",
    url: "https://example.com/seo-optimization",
    accessLevels: ["all"],
    createdBy: "Sarah Johnson",
    createdAt: "2025-04-01",
    tags: ["SEO", "optimization", "keywords"]
  },
  {
    id: "doc-2",
    title: "Keyword Research Advanced Techniques",
    description: "Learn advanced methods for effective keyword research and implementation",
    type: "tutorial",
    category: "SEO",
    url: "https://example.com/keyword-research",
    accessLevels: ["manager", "admin", "superuser"],
    createdBy: "John Doe",
    createdAt: "2025-04-05",
    tags: ["keywords", "research", "analytics"]
  },
  
  // Social Media Training
  {
    id: "doc-3",
    title: "Social Media Content Strategy",
    description: "Creating an effective social media content calendar and strategy",
    type: "guide",
    category: "Social Media",
    url: "https://example.com/social-strategy",
    accessLevels: ["all"],
    createdBy: "Mike Brown",
    createdAt: "2025-03-28",
    tags: ["social media", "content", "strategy"]
  },
  {
    id: "doc-4",
    title: "Advanced Analytics for Social Media",
    description: "Understanding and leveraging social media analytics for business growth",
    type: "tutorial",
    category: "Social Media",
    url: "https://example.com/social-analytics",
    accessLevels: ["manager", "admin", "superuser"],
    createdBy: "Lisa Park",
    createdAt: "2025-04-03",
    tags: ["analytics", "metrics", "social media"]
  },
  
  // Email Marketing
  {
    id: "doc-5",
    title: "Email Marketing Campaign Basics",
    description: "Setting up and running effective email marketing campaigns",
    type: "guide",
    category: "Email Marketing",
    url: "https://example.com/email-basics",
    accessLevels: ["all"],
    createdBy: "Alex Green",
    createdAt: "2025-03-20",
    tags: ["email", "campaigns", "marketing"]
  },
  {
    id: "doc-6",
    title: "A/B Testing for Email Campaigns",
    description: "Advanced A/B testing strategies for optimizing email performance",
    type: "tutorial",
    category: "Email Marketing",
    url: "https://example.com/email-testing",
    accessLevels: ["manager", "admin", "superuser"],
    createdBy: "Jane Smith",
    createdAt: "2025-04-07",
    tags: ["email", "testing", "optimization"]
  },
  
  // Collaboration Tools
  {
    id: "doc-7",
    title: "Team Collaboration Tools Guide",
    description: "Overview of collaboration tools available for team productivity",
    type: "reference",
    category: "Collaboration",
    url: "https://example.com/collab-tools",
    accessLevels: ["all"],
    createdBy: "Robert Wilson",
    createdAt: "2025-03-25",
    tags: ["collaboration", "tools", "productivity"]
  },
  {
    id: "doc-8",
    title: "Project Management Workflows",
    description: "Setting up efficient project management workflows for teams",
    type: "video",
    category: "Collaboration",
    url: "https://example.com/project-workflows",
    accessLevels: ["manager", "admin", "superuser"],
    createdBy: "Emma Davis",
    createdAt: "2025-04-02",
    tags: ["project management", "workflow", "teams"]
  },
  
  // Gamification
  {
    id: "doc-9",
    title: "Implementing Gamification Elements",
    description: "Introduction to adding gamification to marketing strategies",
    type: "guide",
    category: "Gamification",
    url: "https://example.com/gamification-intro",
    accessLevels: ["all"],
    createdBy: "Thomas Johnson",
    createdAt: "2025-03-18",
    tags: ["gamification", "engagement", "strategy"]
  },
  {
    id: "doc-10",
    title: "Advanced KPI Gamification",
    description: "Advanced strategies for gamifying team performance metrics",
    type: "tutorial",
    category: "Gamification",
    url: "https://example.com/kpi-gamification",
    accessLevels: ["admin", "superuser"],
    createdBy: "Claire Miller",
    createdAt: "2025-04-04",
    tags: ["KPI", "metrics", "gamification"]
  },
  
  // Admin-specific training
  {
    id: "doc-11",
    title: "User Management Administration",
    description: "Guide to managing users and permissions in the system",
    type: "tutorial",
    category: "Administration",
    url: "https://example.com/user-management",
    accessLevels: ["admin", "superuser"],
    createdBy: "Admin Team",
    createdAt: "2025-03-15",
    tags: ["admin", "users", "permissions"]
  },
  {
    id: "doc-12",
    title: "System Configuration Guide",
    description: "Comprehensive guide to system configuration options",
    type: "reference",
    category: "Administration",
    url: "https://example.com/system-config",
    accessLevels: ["superuser"],
    createdBy: "System Admin",
    createdAt: "2025-03-10",
    tags: ["configuration", "system", "admin"]
  }
];

export const getTrainingDocuments = (
  userRole: UserRole,
  category?: string,
  searchQuery?: string
): TrainingDocument[] => {
  // Filter documents by user role access
  let filteredDocs = trainingDocuments.filter(doc => 
    doc.accessLevels.includes(userRole) || doc.accessLevels.includes("all")
  );
  
  // Filter by category if provided
  if (category && category !== "All") {
    filteredDocs = filteredDocs.filter(doc => doc.category === category);
  }
  
  // Filter by search query if provided
  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase().trim();
    filteredDocs = filteredDocs.filter(doc => 
      doc.title.toLowerCase().includes(query) || 
      doc.description.toLowerCase().includes(query) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }
  
  return filteredDocs;
};

export const getTrainingCategories = (userRole: UserRole): string[] => {
  // Get unique categories from documents user has access to
  const accessibleDocs = getTrainingDocuments(userRole);
  const categories = new Set<string>();
  
  accessibleDocs.forEach(doc => {
    categories.add(doc.category);
  });
  
  return ["All", ...Array.from(categories)];
};
