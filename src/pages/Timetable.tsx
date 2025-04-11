
import AppLayout from "@/components/layout/AppLayout";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";

type ClassSchedule = {
  id: string;
  day: string;
  subject: string;
  time: string;
  location: string;
  professor: string;
};

const initialSchedule: ClassSchedule[] = [
  {
    id: "1",
    day: "Monday",
    subject: "Data Structures",
    time: "10:30 AM - 12:00 PM",
    location: "Block 9, Room 302",
    professor: "Dr. Sharma",
  },
  {
    id: "2",
    day: "Monday",
    subject: "Machine Learning",
    time: "2:00 PM - 3:30 PM",
    location: "Research Lab, Block 6",
    professor: "Dr. Gupta",
  },
  {
    id: "3",
    day: "Tuesday",
    subject: "Communication Skills",
    time: "4:00 PM - 5:00 PM",
    location: "Language Lab, Block 3",
    professor: "Prof. Verma",
  },
  {
    id: "4",
    day: "Wednesday",
    subject: "Database Systems",
    time: "11:00 AM - 12:30 PM",
    location: "Block 8, Room 104",
    professor: "Dr. Kumar",
  },
  {
    id: "5",
    day: "Thursday",
    subject: "Web Development",
    time: "9:00 AM - 10:30 AM",
    location: "Computer Lab 2, Block 5",
    professor: "Dr. Singh",
  },
  {
    id: "6",
    day: "Friday",
    subject: "Artificial Intelligence",
    time: "1:00 PM - 2:30 PM",
    location: "Block 9, Room 201",
    professor: "Dr. Patel",
  },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [schedule, setSchedule] = useState<ClassSchedule[]>(initialSchedule);

  const filteredSchedule = schedule.filter(
    (classItem) => classItem.day === selectedDay
  );

  return (
    <AppLayout>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6 overflow-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Class Timetable</h1>
            <Button className="bg-cuPurple-600 hover:bg-cuPurple-700">
              <Calendar className="mr-2 h-4 w-4" />
              Share Schedule
            </Button>
          </div>

          {/* Day selector */}
          <div className="flex mb-6 overflow-x-auto pb-2">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className={`mr-2 ${
                  selectedDay === day ? "bg-cuPurple-600" : ""
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Schedule display */}
          {filteredSchedule.length > 0 ? (
            <div className="grid gap-4">
              {filteredSchedule.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-cuPurple-100 dark:bg-cuPurple-900 p-4 flex items-center justify-center md:w-1/4">
                        <Clock className="h-8 w-8 text-cuPurple-600" />
                        <div className="ml-3">
                          <p className="font-medium">{classItem.time}</p>
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {classItem.subject}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {classItem.location} • {classItem.professor}
                        </p>
                        <div className="flex mt-2">
                          <Button variant="outline" size="sm" className="mr-2">
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertTitle>No classes scheduled</AlertTitle>
              <AlertDescription>
                You have no classes scheduled for {selectedDay}.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </AppLayout>
  );
};

export default Timetable;
