
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, Search, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  EvaluationQuestion, 
  getAllCategories, 
  getQuestionsByCategory, 
  getSubcategoriesByCategory 
} from "@/data/evaluationQuestions";

interface QuestionSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectQuestions: (questions: EvaluationQuestion[]) => void;
  evaluationType: 'audit' | 'evaluation';
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  open,
  onClose,
  onSelectQuestions,
  evaluationType,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<EvaluationQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("categories");

  useEffect(() => {
    // Load categories when component mounts
    const allCategories = getAllCategories();
    setCategories(allCategories);
    
    // Set first category as default if available
    if (allCategories.length > 0) {
      setSelectedCategory(allCategories[0]);
    }
  }, []);

  useEffect(() => {
    // When selected category changes, update subcategories and questions
    if (selectedCategory) {
      const categorySubcategories = getSubcategoriesByCategory(selectedCategory);
      setSubcategories(categorySubcategories);
      
      // Load questions for the selected category
      const categoryQuestions = getQuestionsByCategory(selectedCategory)
        .filter(q => q.type === evaluationType || evaluationType === 'both');
      setQuestions(categoryQuestions);
    }
  }, [selectedCategory, evaluationType]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search is cleared, show questions for current category
      if (selectedCategory) {
        const categoryQuestions = getQuestionsByCategory(selectedCategory)
          .filter(q => q.type === evaluationType || evaluationType === 'both');
        setQuestions(categoryQuestions);
      }
      return;
    }
    
    // Search across all questions regardless of category
    const lowerTerm = term.toLowerCase();
    const filteredQuestions = getQuestionsByCategory(selectedCategory)
      .filter(q => 
        (q.type === evaluationType || evaluationType === 'both') && 
        (q.text.toLowerCase().includes(lowerTerm) || 
         q.subcategory.toLowerCase().includes(lowerTerm))
      );
    
    setQuestions(filteredQuestions);
  };

  const isQuestionSelected = (question: EvaluationQuestion): boolean => {
    return selectedQuestions.some(q => q.id === question.id);
  };

  const toggleQuestionSelection = (question: EvaluationQuestion) => {
    if (isQuestionSelected(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleSelectAll = (subcategory: string) => {
    const subcategoryQuestions = questions.filter(q => q.subcategory === subcategory);
    
    // Check if all questions in this subcategory are already selected
    const allSelected = subcategoryQuestions.every(q => isQuestionSelected(q));
    
    if (allSelected) {
      // Deselect all questions in this subcategory
      setSelectedQuestions(selectedQuestions.filter(q => q.subcategory !== subcategory));
    } else {
      // Add all questions from this subcategory that aren't already selected
      const newSelectedQuestions = [...selectedQuestions];
      
      subcategoryQuestions.forEach(question => {
        if (!isQuestionSelected(question)) {
          newSelectedQuestions.push(question);
        }
      });
      
      setSelectedQuestions(newSelectedQuestions);
    }
  };

  const handleSubmit = () => {
    onSelectQuestions(selectedQuestions);
    onClose();
  };

  const renderQuestionsBySubcategory = () => {
    // Group questions by subcategory
    const groupedQuestions: Record<string, EvaluationQuestion[]> = {};
    
    questions.forEach(question => {
      if (!groupedQuestions[question.subcategory]) {
        groupedQuestions[question.subcategory] = [];
      }
      groupedQuestions[question.subcategory].push(question);
    });
    
    return Object.entries(groupedQuestions).map(([subcategory, subcategoryQuestions]) => (
      <div key={subcategory} className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{subcategory}</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSelectAll(subcategory)}
          >
            {subcategoryQuestions.every(q => isQuestionSelected(q)) 
              ? "Deselect All" 
              : "Select All"}
          </Button>
        </div>
        <div className="space-y-2">
          {subcategoryQuestions.map(question => (
            <div 
              key={question.id} 
              className="flex items-start space-x-2 p-2 rounded hover:bg-muted"
            >
              <Checkbox 
                id={question.id}
                checked={isQuestionSelected(question)}
                onCheckedChange={() => toggleQuestionSelection(question)}
                className="mt-1"
              />
              <Label 
                htmlFor={question.id}
                className="cursor-pointer flex-1"
              >
                {question.text}
              </Label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Select {evaluationType === 'audit' ? 'Audit' : 'Evaluation'} Questions
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="selected">
              Selected ({selectedQuestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="flex-1 flex flex-col">
            <div className="flex space-x-4 mb-4">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search questions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <Card className="flex-1">
              <CardHeader className="py-3">
                <CardTitle className="text-md">
                  {selectedCategory} Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {questions.length > 0 ? (
                    renderQuestionsBySubcategory()
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No questions found for the selected criteria
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selected" className="flex-1 flex flex-col">
            <Card className="flex-1">
              <CardHeader className="py-3">
                <CardTitle className="text-md">
                  Selected Questions ({selectedQuestions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {selectedQuestions.length > 0 ? (
                    <div className="space-y-2">
                      {selectedQuestions.map(question => (
                        <div 
                          key={question.id} 
                          className="flex items-start space-x-2 p-2 rounded bg-muted/50"
                        >
                          <Check className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p>{question.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {question.category} - {question.subcategory}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleQuestionSelection(question)}
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No questions selected yet
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedQuestions.length === 0}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {selectedQuestions.length} Questions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionSelector;
