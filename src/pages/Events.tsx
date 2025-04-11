
import AppLayout from "@/components/layout/AppLayout";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  isStarred: boolean;
  imageUrl?: string;
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Annual Tech Fest 2025",
    description: "Join the biggest tech event of the year with competitions, workshops, and amazing prizes!",
    date: "Apr 15, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Central Auditorium",
    category: "Tech",
    attendees: 256,
    isStarred: true,
    imageUrl: "https://picsum.photos/id/48/800/300",
  },
  {
    id: "2",
    title: "Cultural Night",
    description: "Experience cultural performances, music, and dance by talented CU students.",
    date: "Apr 20, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Open Air Theatre",
    category: "Cultural",
    attendees: 198,
    isStarred: false,
    imageUrl: "https://picsum.photos/id/106/800/300",
  },
  {
    id: "3",
    title: "Workshop on AI and Machine Learning",
    description: "Learn about the latest advancements in AI and ML from industry experts.",
    date: "Apr 12, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Block 9, Room 201",
    category: "Workshop",
    attendees: 75,
    isStarred: true,
  },
  {
    id: "4",
    title: "Sports Day",
    description: "Annual sports competition with various games and tournaments.",
    date: "Apr 25, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "University Sports Complex",
    category: "Sports",
    attendees: 320,
    isStarred: false,
    imageUrl: "https://picsum.photos/id/171/800/300",
  },
  {
    id: "5",
    title: "Career Fair 2025",
    description: "Meet top companies and explore internship and job opportunities.",
    date: "May 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Conference Hall",
    category: "Career",
    attendees: 412,
    isStarred: true,
  },
];

const Events = () => {
  const [events, setEvents] = useState(initialEvents);
  
  const starredEvents = events.filter(event => event.isStarred);
  const upcomingEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date.replace("Apr", "April").replace("May", "May"));
    const dateB = new Date(b.date.replace("Apr", "April").replace("May", "May"));
    return dateA.getTime() - dateB.getTime();
  });

  const toggleStarEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isStarred: !event.isStarred } 
        : event
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech': return 'bg-blue-100 text-blue-800';
      case 'cultural': return 'bg-pink-100 text-pink-800';
      case 'workshop': return 'bg-amber-100 text-amber-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'career': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="overflow-hidden mb-4">
      {event.imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(event.category)}`}>
                {event.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                <Users className="inline h-3 w-3 mr-1" />
                {event.attendees} attending
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {event.description}
            </p>
            
            <div className="grid gap-1 text-sm mb-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${event.isStarred ? 'text-yellow-500' : ''}`}
            onClick={() => toggleStarEvent(event.id)}
          >
            <Star className="h-5 w-5" fill={event.isStarred ? 'currentColor' : 'none'} />
          </Button>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button className="bg-cuPurple-600 hover:bg-cuPurple-700">
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6 overflow-auto">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Campus Events</h1>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="starred" className="flex-1">
                <Star className="mr-2 h-4 w-4" />
                Starred ({starredEvents.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="starred">
              {starredEvents.length > 0 ? (
                <div className="space-y-4">
                  {starredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      You haven't starred any events yet.
                    </p>
                    <Button 
                      className="bg-cuPurple-600 hover:bg-cuPurple-700"
                      onClick={() => document.querySelector('[value="upcoming"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                    >
                      Browse Events
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AppLayout>
  );
};

export default Events;
