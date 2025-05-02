
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ExternalLink, Calendar, User } from "lucide-react";
import { TrainingResource } from "@/types/marketing";
import { useAuth } from "@/contexts/AuthContext";

interface TrainingResourcesListProps {
  category: TrainingResource["category"];
  searchQuery: string;
}

// Sample training resources
const sampleResources: TrainingResource[] = [
  {
    id: "1",
    title: "SEO Best Practices Guide",
    category: "SEO",
    description: "Comprehensive guide to modern SEO techniques for our website and client projects",
    contentType: "document",
    url: "https://example.com/seo-guide",
    createdBy: "Sarah Johnson",
    createdAt: "2025-03-15"
  },
  {
    id: "2",
    title: "Keyword Research Tutorial",
    category: "SEO",
    description: "Step-by-step tutorial on conducting effective keyword research using industry tools",
    contentType: "video",
    url: "https://example.com/keyword-tutorial",
    createdBy: "John Doe",
    createdAt: "2025-04-02"
  },
  {
    id: "3",
    title: "Social Media Content Calendar Template",
    category: "Social Media",
    description: "Downloadable template for planning and scheduling social media content",
    contentType: "document",
    url: "https://example.com/social-calendar",
    createdBy: "Mike Brown",
    createdAt: "2025-03-20"
  },
  {
    id: "4",
    title: "Email Marketing Best Practices",
    category: "Email Marketing",
    description: "Guide to creating effective email campaigns with high open and conversion rates",
    contentType: "document",
    url: "https://example.com/email-guide",
    createdBy: "Lisa Park",
    createdAt: "2025-04-10"
  },
  {
    id: "5",
    title: "Team Collaboration Workshop",
    category: "Collaboration",
    description: "Interactive workshop on improving team collaboration and communication",
    contentType: "interactive",
    url: "https://example.com/collaboration-workshop",
    createdBy: "Alex Green",
    createdAt: "2025-03-25"
  },
  {
    id: "6",
    title: "Marketing KPI Gamification Guide",
    category: "Gamification",
    description: "How to implement gamification elements to motivate marketing performance",
    contentType: "document",
    url: "https://example.com/gamification-guide",
    createdBy: "Jane Smith",
    createdAt: "2025-04-05"
  }
];

const TrainingResourcesList: React.FC<TrainingResourcesListProps> = ({ 
  category,
  searchQuery 
}) => {
  const { currentUser } = useAuth();
  const canManageResources = currentUser?.role === "manager" || currentUser?.role === "superuser";

  // Filter resources by category and search query
  const filteredResources = sampleResources.filter(resource => 
    resource.category === category && 
    (searchQuery === "" || 
     resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getContentTypeBadge = (contentType: TrainingResource["contentType"]) => {
    switch (contentType) {
      case "document":
        return <Badge className="bg-blue-100 text-blue-800">Document</Badge>;
      case "video":
        return <Badge className="bg-purple-100 text-purple-800">Video</Badge>;
      case "quiz":
        return <Badge className="bg-yellow-100 text-yellow-800">Quiz</Badge>;
      case "interactive":
        return <Badge className="bg-green-100 text-green-800">Interactive</Badge>;
      default:
        return <Badge>{contentType}</Badge>;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredResources.length > 0 ? (
        filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                {canManageResources && (
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-2">
                {getContentTypeBadge(resource.contentType)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{resource.description}</p>
              <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{resource.createdBy}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Access Resource
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-3 flex justify-center items-center p-8 text-center text-muted-foreground">
          No {category} resources found. {canManageResources && "Add one by clicking the 'Add Resource' button."}
        </div>
      )}
    </div>
  );
};

export default TrainingResourcesList;
