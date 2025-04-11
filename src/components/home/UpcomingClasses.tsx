
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

// Mock timetable data
const upcomingClasses = [
  {
    id: "1",
    subject: "Data Structures",
    time: "10:30 AM - 12:00 PM",
    location: "Block 9, Room 302",
    remainingTime: "Starts in 30 min",
  },
  {
    id: "2",
    subject: "Machine Learning",
    time: "2:00 PM - 3:30 PM",
    location: "Research Lab, Block 6",
    remainingTime: "Starts in 4 hours",
  },
  {
    id: "3",
    subject: "Communication Skills",
    time: "4:00 PM - 5:00 PM",
    location: "Language Lab, Block 3",
    remainingTime: "Starts in 6 hours",
  },
];

const UpcomingClasses = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Today's Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClasses.map((cls) => (
          <div
            key={cls.id}
            className="flex items-start gap-3 border-l-4 border-cuPurple-500 pl-3 py-2"
          >
            <Clock className="h-5 w-5 text-cuPurple-500 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">{cls.subject}</p>
              <p className="text-xs text-muted-foreground">{cls.time}</p>
              <p className="text-xs text-muted-foreground">{cls.location}</p>
              <p className="text-xs text-cuPurple-600 mt-1 font-medium">
                {cls.remainingTime}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
