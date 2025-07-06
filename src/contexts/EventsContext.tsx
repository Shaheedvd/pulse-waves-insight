
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { eventService } from '@/lib/supabase';

export interface Event {
  id: string;
  title: string;
  type: 'meeting' | 'training' | 'evaluation' | 'maintenance' | 'other';
  start: string;
  end: string;
  date: string;
  attendees: string[];
  location: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department: string;
  recurring?: string | null;
  description?: string;
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  editEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: string) => Event[];
  getEventsThisWeek: () => Event[];
  filteredEvents: Event[];
  setFilteredEvents: (events: Event[]) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const initialEvents: Event[] = [
  {
    id: '1',
    title: "Weekly Finance Review",
    type: "meeting",
    start: "09:00",
    end: "10:30",
    date: "2025-01-09",
    attendees: ["Fiona Finance", "Shaheed Van Dawson"],
    location: "Conference Room A",
    priority: "high",
    department: "finance",
    recurring: "weekly"
  },
  {
    id: '2',
    title: "HR Policy Training",
    type: "training",
    start: "14:00",
    end: "16:00",
    date: "2025-01-09",
    attendees: ["All Staff"],
    location: "Training Room",
    priority: "medium",
    department: "hr",
    recurring: "monthly"
  }
];

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useLocalStorage<Event[]>('events', initialEvents);
  const [filteredEvents, setFilteredEvents] = useLocalStorage<Event[]>('filtered_events', events);
  const { toast } = useToast();

  // Load events from Supabase on mount
  useEffect(() => {
    const loadEventsFromDB = async () => {
      try {
        const dbEvents = await eventService.getAll();
        if (dbEvents && dbEvents.length > 0) {
          setEvents(dbEvents);
          setFilteredEvents(dbEvents);
        }
      } catch (error) {
        console.error('Error loading events from database:', error);
        // Continue with local storage data
      }
    };

    loadEventsFromDB();
  }, []);

  // Sync filtered events when events change
  useEffect(() => {
    setFilteredEvents(events);
  }, [events, setFilteredEvents]);

  const addEvent = async (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString()
    };

    try {
      // Try to save to Supabase first
      const savedEvent = await eventService.create(newEvent);
      setEvents(prev => [...prev, savedEvent]);
      
      toast({
        title: "Event Created",
        description: `${savedEvent.title} has been scheduled successfully.`
      });
    } catch (error) {
      console.error('Error saving event to database:', error);
      // Fallback to local storage
      setEvents(prev => [...prev, newEvent]);
      
      toast({
        title: "Event Created (Local)",
        description: `${newEvent.title} has been scheduled locally.`
      });
    }
  };

  const editEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      // Try to update in Supabase
      const updatedEvent = await eventService.update(id, eventData);
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      
      toast({
        title: "Event Updated",
        description: "Event has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating event in database:', error);
      // Fallback to local storage
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      ));
      
      toast({
        title: "Event Updated (Local)",
        description: "Event has been updated locally."
      });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      // Try to delete from Supabase
      await eventService.delete(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      
      toast({
        title: "Event Deleted",
        description: "Event has been removed from the schedule."
      });
    } catch (error) {
      console.error('Error deleting event from database:', error);
      // Fallback to local storage
      setEvents(prev => prev.filter(event => event.id !== id));
      
      toast({
        title: "Event Deleted (Local)",
        description: "Event has been removed locally."
      });
    }
  };

  const getEventsByDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getEventsThisWeek = () => {
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= weekFromNow;
    });
  };

  return (
    <EventsContext.Provider value={{
      events,
      addEvent,
      editEvent,
      deleteEvent,
      getEventsByDate,
      getEventsThisWeek,
      filteredEvents,
      setFilteredEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
