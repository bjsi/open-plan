import FullCalendar from "@fullcalendar/react";
import React from "react";
import { trpcHooks } from "../trpc";
import { gcalItemToRawEventDef } from "../lib/gcalToFullCalendar";
import timeGridPlugin from "@fullcalendar/timegrid";

export function PlanView() {
  const calendar = React.useRef<FullCalendar | null>(null);
  const events = trpcHooks.listTodaysEvents.useQuery({});
  const gCalData = events.data || [];
  const fcEvents = gCalData.map((x) => gcalItemToRawEventDef(x));
  console.log(fcEvents);
  return (
    <FullCalendar
      ref={calendar}
      events={fcEvents}
      plugins={[timeGridPlugin]}
      initialView="timeGridDay"
    />
  );
}
