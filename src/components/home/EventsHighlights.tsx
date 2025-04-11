
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock events data
const events = [
  {
    id: "1",
    title: "Tech Fest 2025",
    date: "April 15, 2025",
    location: "Main Auditorium",
    participants: 120,
  },
  {
    id: "2",
    title: "Cultural Evening",
    date: "April 20, 2025",
    location: "Open Air Theatre",
    participants: 85,
  },
];

const EventsHighlights = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-accent rounded-md p-3 hover:bg-accent/80 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-cuPurple-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-cuPurple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} • {event.location}
                  </p>
                  <p className="text-xs text-cuPurple-600 mt-1">
                    {event.participants} people going
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-cuPurple-600">
                Join
              </Button>
            </div>
          </div>
        ))}
        <Link to="/events">
          <Button variant="ghost" size="sm" className="w-full text-cuPurple-600 hover:text-cuPurple-700">
            View All Events
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventsHighlights;
