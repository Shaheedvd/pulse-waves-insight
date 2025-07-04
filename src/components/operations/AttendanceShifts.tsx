
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, MapPin } from 'lucide-react';

const AttendanceShifts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Attendance, Shift & Resource Scheduling</h2>
        <p className="text-muted-foreground">Manage schedules for front-line teams and rotating operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Shift Now</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Check-ins</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                <h3 className="text-2xl font-bold">1</h3>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Locations</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shift Management System</CardTitle>
          <CardDescription>Track attendance with mobile check-in/out and location tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="mx-auto h-16 w-16 mb-4" />
            <p className="text-lg font-medium mb-2">Shift Scheduling Coming Soon</p>
            <p>Complete attendance tracking with geolocation and automated alerts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceShifts;
