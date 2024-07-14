"use client";

import * as React from "react";

import { Calendar } from "~/components/ui/calendar";

const BookingsPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [startTime, setStartTime] = React.useState<Date | undefined>(
    new Date(new Date().setHours(9, 0, 0, 0)),
  );
  const [endTime, setEndTime] = React.useState<Date | undefined>(
    new Date(new Date().setHours(18, 0, 0, 0)),
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto rounded-md border"
      />

      {/* time slots from start time to end time of 30 mins each */}

      <div className="mt-4 grid grid-cols-3 gap-2">
        {Array.from({ length: 20 }).map((_, index) => {
          const time = new Date(startTime!);
          time.setMinutes(time.getMinutes() + index * 30);

          return (
            <div
              key={index}
              className="cursor-pointer rounded-md border p-2 text-center"
            >
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
