import React from "react";
import EventLogItem from "../EventLogItem";
import MonitoredEvent from "../MonitoredEvent";
import * as S from "../styles";
import { EventLog } from "../index";

interface DebugViewProps {
  minimized: boolean;
  eventLogs: EventLog[];
  monitoredEvents: string[];
  resetOnNavigation: boolean;
  newMonitoredEvent: string;
  handleMinimize: () => void;
  handleResetOnNavigation: () => void;
  handleMonitoredEventsChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleAddMonitoredEvent: () => void;
  handleRemoveMonitoredEvent: (eventName: string) => void;
  resetEventLogs: () => void;
}

function DebugView({
  minimized,
  eventLogs,
  monitoredEvents,
  resetOnNavigation,
  newMonitoredEvent,
  handleMinimize,
  handleResetOnNavigation,
  handleMonitoredEventsChange,
  handleAddMonitoredEvent,
  handleRemoveMonitoredEvent,
  resetEventLogs,
}: DebugViewProps) {
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
          <MonitoredEvent
            key={index.toString()}
            eventName={eventName}
            onRemove={handleRemoveMonitoredEvent}
          />
        ))}
      </S.MonitoredEventsList>
      <S.ResetButton onClick={resetEventLogs}>reset</S.ResetButton>
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
              <EventLogItem key={index.toString()} log={log} />
            ))}
        </tbody>
      </S.EventTable>
    </S.Container>
  );
}

export default DebugView;
