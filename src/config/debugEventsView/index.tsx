import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

interface EventLog {
  eventName: string;
  eventParams: any;
  count: number;
  highlight: boolean;
}

// eslint-disable-next-line import/no-mutable-exports
export let logDebugEvent:
  | ((eventName: string, eventParams: any) => void)
  | null;

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

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (resetOnNavigation) {
        setEventLogs([]);
      }
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

  if (minimized) {
    return (
      <S.MinimizedContainer onClick={handleMinimize}>
        <S.MinimizedText>Debug View</S.MinimizedText>
        <S.MinusButton>+</S.MinusButton>
      </S.MinimizedContainer>
    );
  }

  return (
    <S.Container>
      <S.MonitoredEventsList>
        {monitoredEvents.map((eventName, index) => (
          <S.MonitoredEventItem key={index.toString()}>
            {eventName}
            <S.RemoveMonitoredEventButton
              onClick={() => handleRemoveMonitoredEvent(eventName)}
            >
              X
            </S.RemoveMonitoredEventButton>
          </S.MonitoredEventItem>
        ))}
      </S.MonitoredEventsList>
      <S.MinimizeButton onClick={handleMinimize}>−</S.MinimizeButton>
      <S.ResetCheckbox>
        <input
          type="checkbox"
          checked={resetOnNavigation}
          onChange={handleResetOnNavigation}
        />
        Reset on Navigation
      </S.ResetCheckbox>
      <S.DebugViewHeader>Debug View</S.DebugViewHeader>
      <S.MonitoredEventsInputContainer>
        <S.MonitoredEventsInput
          type="text"
          placeholder="Enter Event Name"
          value={newMonitoredEvent}
          onChange={handleMonitoredEventsChange}
        />
        <S.MonitoredEventsButton onClick={handleAddMonitoredEvent}>
          Add
        </S.MonitoredEventsButton>
      </S.MonitoredEventsInputContainer>
      <S.EventTable>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Parameters</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {eventLogs
            .filter(
              (log) =>
                monitoredEvents.length === 0 ||
                monitoredEvents.includes(log.eventName),
            )
            .sort((a, b) => a.eventName.localeCompare(b.eventName))
            .map((log, index) => (
              <S.HighlightRow key={index.toString()} highlight={log.highlight}>
                <td>{log.eventName}</td>
                <td>{JSON.stringify(log.eventParams)}</td>
                <td>{log.count}</td>
              </S.HighlightRow>
            ))}
        </tbody>
      </S.EventTable>
    </S.Container>
  );
}

export default DebugEventsView;
