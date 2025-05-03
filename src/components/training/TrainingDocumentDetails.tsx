
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileText, Video, BookOpen, HelpCircle, ExternalLink, Tag } from "lucide-react";
import { TrainingDocument, TrainingDocumentType } from "@/types/training";

interface TrainingDocumentDetailsProps {
  open: boolean;
  onClose: () => void;
  document: TrainingDocument | null;
}

const TrainingDocumentDetails: React.FC<TrainingDocumentDetailsProps> = ({
  open,
  onClose,
  document,
}) => {
  if (!document) return null;

  const getDocumentTypeIcon = (type: TrainingDocumentType) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5" />;
      case "tutorial":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "faq":
        return <HelpCircle className="h-5 w-5" />;
      case "reference":
      default:
        return <FileText className="h-5 w-5" />;
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{document.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-2">
            {getDocumentTypeBadge(document.type)}
            <Badge variant="outline">{document.category}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
              {getDocumentTypeIcon(document.type)}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{document.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created By</h3>
              <div className="flex items-center mt-1">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{document.createdBy}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created On</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{new Date(document.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {document.tags && document.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {document.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Access Levels</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {document.accessLevels.map((level) => (
                <Badge key={level} variant="secondary">{level}</Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Document
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingDocumentDetails;
