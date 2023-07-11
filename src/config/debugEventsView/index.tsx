import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DebugView from "./DebugView";

export interface EventLog {
  eventName: string;
  eventParams: any;
  count: number;
  highlight: boolean;
}

// eslint-disable-next-line import/no-mutable-exports
export let logDebugEvent: any = () => {};

function DebugEventsView() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [minimized, setMinimized] = useState(false);
  const [resetOnNavigation, setResetOnNavigation] = useState(false);
  const [monitoredEvents, setMonitoredEvents] = useState<string[]>([]);
  const [newMonitoredEvent, setNewMonitoredEvent] = useState("");
  const history = useHistory();

  function updateEventLogs(eventName: string, eventParams: any) {
    if (monitoredEvents.length > 0 && !monitoredEvents.includes(eventName)) {
      return;
    }

    setEventLogs((prevEventLogs) => {
      const existingEventLog = prevEventLogs.find(
        (log) =>
          log.eventName === eventName &&
          JSON.stringify(log.eventParams) === JSON.stringify(eventParams),
      );
      if (existingEventLog) {
        const updatedEventLog = {
          ...existingEventLog,
          count: existingEventLog.count + 1,
          highlight: true,
        };
        return prevEventLogs.map((log) =>
          log.eventName === eventName &&
          JSON.stringify(log.eventParams) === JSON.stringify(eventParams)
            ? updatedEventLog
            : log,
        );
      } else {
        const newEventLog: EventLog = {
          eventName,
          eventParams,
          count: 1,
          highlight: false,
        };
        return [...prevEventLogs, newEventLog];
      }
    });
  }

  useEffect(() => {
    /* Assign update to outside variable */
    logDebugEvent = updateEventLogs;

    /* Unassign when component unmounts */
    return () => {
      logDebugEvent = null;
    };
  }, [monitoredEvents]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEventLogs((prevEventLogs) =>
        prevEventLogs.map((log) => ({
          ...log,
          highlight: false,
        })),
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [eventLogs]);

  const resetEventLogs = () => {
    setEventLogs([]);
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (resetOnNavigation) resetEventLogs();
    });

    return () => {
      unlisten();
    };
  }, [resetOnNavigation, history]);

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleResetOnNavigation = () => {
    setResetOnNavigation(!resetOnNavigation);
  };

  const handleMonitoredEventsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setNewMonitoredEvent(value);
  };

  const handleAddMonitoredEvent = () => {
    if (newMonitoredEvent.trim() !== "") {
      setMonitoredEvents((prevMonitoredEvents) => [
        ...prevMonitoredEvents,
        newMonitoredEvent,
      ]);
      setNewMonitoredEvent("");
    }
  };

  const handleRemoveMonitoredEvent = (eventName: string) => {
    setMonitoredEvents((prevMonitoredEvents) =>
      prevMonitoredEvents.filter((event) => event !== eventName),
    );
  };

  return (
    <DebugView
      minimized={minimized}
      eventLogs={eventLogs}
      monitoredEvents={monitoredEvents}
      resetOnNavigation={resetOnNavigation}
      newMonitoredEvent={newMonitoredEvent}
      handleMinimize={handleMinimize}
      handleResetOnNavigation={handleResetOnNavigation}
      handleMonitoredEventsChange={handleMonitoredEventsChange}
      handleAddMonitoredEvent={handleAddMonitoredEvent}
      handleRemoveMonitoredEvent={handleRemoveMonitoredEvent}
      resetEventLogs={resetEventLogs}
    />
  );
}

export default DebugEventsView;
