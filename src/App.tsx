import "./App.css";

import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import React from "react";

function App() {
  const calendar = React.useRef<FullCalendar | null>(null);

  return (
    <FullCalendar
      ref={calendar}
      plugins={[resourceTimeGridPlugin]}
      initialView="resourceTimeGridDay"
      schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
    />
  );
}

export default App;
