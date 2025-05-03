
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, User, FileText, Video, BookOpen, HelpCircle } from "lucide-react";
import { TrainingDocument, TrainingDocumentType } from "@/types/training";
import TrainingDocumentDetails from "./TrainingDocumentDetails";

interface TrainingDocumentListProps {
  documents: TrainingDocument[];
}

const TrainingDocumentList: React.FC<TrainingDocumentListProps> = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState<TrainingDocument | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getDocumentTypeIcon = (type: TrainingDocumentType) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />;
      case "tutorial":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "faq":
        return <HelpCircle className="h-4 w-4" />;
      case "reference":
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDocumentTypeBadge = (type: TrainingDocumentType) => {
    switch (type) {
      case "guide":
        return <Badge className="bg-blue-100 text-blue-800">Guide</Badge>;
      case "tutorial":
        return <Badge className="bg-green-100 text-green-800">Tutorial</Badge>;
      case "video":
        return <Badge className="bg-purple-100 text-purple-800">Video</Badge>;
      case "faq":
        return <Badge className="bg-yellow-100 text-yellow-800">FAQ</Badge>;
      case "reference":
      default:
        return <Badge className="bg-gray-100 text-gray-800">Reference</Badge>;
    }
  };

  const handleViewDocument = (document: TrainingDocument) => {
    setSelectedDocument(document);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.length > 0 ? (
          documents.map((document) => (
            <Card key={document.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                </div>
                <div className="flex gap-2 mt-2">
                  {getDocumentTypeBadge(document.type)}
                  <Badge variant="outline">{document.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {document.description}
                </p>
                <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{document.createdBy}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(document.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {document.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {document.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex-1 mr-2" onClick={() => handleViewDocument(document)}>
                  {getDocumentTypeIcon(document.type)}
                  <span className="ml-2">View Details</span>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href={document.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Access
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center p-8 text-center text-muted-foreground">
            No training documents found matching your criteria.
          </div>
        )}
      </div>

      <TrainingDocumentDetails
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        document={selectedDocument}
      />
    </>
  );
};

export default TrainingDocumentList;
