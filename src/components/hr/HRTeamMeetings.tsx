
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Clock, FileText, Plus, Video } from "lucide-react";

// Sample data for team meetings
const meetingsData = [
  { 
    id: "meet1", 
    title: "Monthly HR Department Meeting", 
    date: "2024-05-15", 
    time: "09:00 - 10:30", 
    location: "Conference Room A", 
    organizer: "Sarah Johnson", 
    attendees: 12,
    status: "scheduled"
  },
  { 
    id: "meet2", 
    title: "Recruitment Strategy Session", 
    date: "2024-05-18", 
    time: "11:00 - 12:30", 
    location: "Virtual (Teams)", 
    organizer: "Michael Brown", 
    attendees: 8,
    status: "scheduled"
  },
  { 
    id: "meet3", 
    title: "Benefits Review Committee", 
    date: "2024-05-20", 
    time: "14:00 - 15:30", 
    location: "Conference Room B", 
    organizer: "John Smith", 
    attendees: 6,
    status: "scheduled"
  },
  { 
    id: "meet4", 
    title: "Employee Wellness Program Planning", 
    date: "2024-05-10", 
    time: "10:00 - 11:30", 
    location: "Virtual (Zoom)", 
    organizer: "Lisa Wong", 
    attendees: 5,
    status: "completed"
  },
];

// Sample data for meeting notes
const notesData = [
  { 
    id: "note1", 
    meetingId: "meet4", 
    title: "Employee Wellness Program Planning", 
    date: "2024-05-10",
    createdBy: "Lisa Wong",
    content: "Discussed quarterly wellness activities:\n- Fitness challenge in June\n- Mental health workshop in July\n- Nutrition seminars in August\n\nAction items assigned to team members. Budget approved for Q2 activities.",
  },
];

export const HRTeamMeetings = () => {
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false);
  const [isViewNotesOpen, setIsViewNotesOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState(null);

  const handleViewNotes = (meetingId) => {
    const notes = notesData.find(note => note.meetingId === meetingId);
    setSelectedNotes(notes);
    setIsViewNotesOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Team Meetings</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={() => setIsAddMeetingOpen(true)} className="flex gap-1">
            <Plus className="h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button variant="outline" className="flex gap-1">
            <Video className="h-4 w-4" />
            Join Virtual Meeting
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>
                Schedule and manage HR team meetings
              </CardDescription>
            </div>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Meetings</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meeting Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetingsData.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">{meeting.title}</TableCell>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>{meeting.location}</TableCell>
                  <TableCell>{meeting.organizer}</TableCell>
                  <TableCell>{meeting.attendees}</TableCell>
                  <TableCell>
                    <Badge 
                      className={meeting.status === "scheduled" 
                        ? "bg-blue-100 text-blue-800" 
                        : meeting.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }
                    >
                      {meeting.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {meeting.status === "completed" ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewNotes(meeting.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Notes
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Meeting Dialog */}
      <Dialog open={isAddMeetingOpen} onOpenChange={setIsAddMeetingOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule New Meeting
            </DialogTitle>
            <DialogDescription>
              Create a new meeting for the HR team
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input 
                id="title" 
                placeholder="Meeting title" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
              <Input 
                id="date" 
                type="date" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right">
                Time
              </label>
              <div className="col-span-3 flex gap-2">
                <Input 
                  id="startTime" 
                  type="time" 
                  className="w-1/2" 
                />
                <Input 
                  id="endTime" 
                  type="time" 
                  className="w-1/2" 
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input 
                id="location" 
                placeholder="Meeting location" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="agenda" className="text-right">
                Agenda
              </label>
              <Textarea 
                id="agenda" 
                placeholder="Meeting agenda items..." 
                className="col-span-3" 
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Meeting Notes Dialog */}
      <Dialog open={isViewNotesOpen} onOpenChange={setIsViewNotesOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Meeting Notes
            </DialogTitle>
            <DialogDescription>
              {selectedNotes?.title} - {selectedNotes?.date}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Created by:</h4>
              <p className="text-sm">{selectedNotes?.createdBy}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Notes:</h4>
              <div className="bg-muted p-3 rounded-md whitespace-pre-line text-sm">
                {selectedNotes?.content}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Download</Button>
            <Button>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRTeamMeetings;
