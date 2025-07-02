
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Filter, Download, Eye, Image, Video, FileText } from "lucide-react";

export const AssetLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const assets = [
    { id: "1", name: "Product Hero Image", type: "image", category: "Product", size: "2.5 MB", downloads: 15, tags: ["hero", "product", "main"] },
    { id: "2", name: "Brand Video", type: "video", category: "Brand", size: "45 MB", downloads: 8, tags: ["brand", "video", "intro"] },
    { id: "3", name: "Email Template", type: "template", category: "Email", size: "1.2 MB", downloads: 23, tags: ["email", "template", "newsletter"] },
    { id: "4", name: "Social Media Kit", type: "template", category: "Social", size: "15 MB", downloads: 31, tags: ["social", "kit", "templates"] },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-5 w-5 text-blue-600" />;
      case "video": return <Video className="h-5 w-5 text-red-600" />;
      case "template": return <FileText className="h-5 w-5 text-green-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Asset Library</h2>
          <p className="text-muted-foreground">Manage your marketing assets and brand resources</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Asset
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(asset.type)}
                  <span className="text-sm font-medium">{asset.name}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size</span>
                <span>{asset.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Downloads</span>
                <span>{asset.downloads}</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
