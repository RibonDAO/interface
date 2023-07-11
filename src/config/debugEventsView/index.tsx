import React, { useEffect, useState } from "react";
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
  function updateEventLogs(eventName: string, eventParams: any) {
    setEventLogs((prevEventLogs) => {
      const existingEventLog = prevEventLogs.find(
        (log) => log.eventName === eventName,
      );
      if (existingEventLog) {
        const updatedEventLog = {
          ...existingEventLog,
          count: existingEventLog.count + 1,
          highlight: true,
        };
        return prevEventLogs.map((log) =>
          log.eventName === eventName ? updatedEventLog : log,
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
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEventLogs((prevEventLogs) =>
        prevEventLogs.map((log) => ({
          ...log,
          highlight: false,
        })),
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [eventLogs]);

  return (
    <S.Container>
      <S.DebugViewHeader>Debug View</S.DebugViewHeader>
      <S.EventTable>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Parameters</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {eventLogs.map((log, index) => (
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
