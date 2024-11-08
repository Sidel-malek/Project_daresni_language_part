"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CalendarComponent({ events }) {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      date={date}
      view={view}
      views={["month", "week", "day"]}
      onView={(view) => setView(view)}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      style={{ height: 400, width: 600 }}
    />
  );
}
