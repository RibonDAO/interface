import React from "react";
import * as S from "../styles";

interface MonitoredEventProps {
  eventName: string;
  onRemove: (eventName: string) => void;
}

function MonitoredEvent({ eventName, onRemove }: MonitoredEventProps) {
  const handleRemoveClick = () => {
    onRemove(eventName);
  };

  return (
    <S.MonitoredEventItem>
      {eventName}
      <S.RemoveMonitoredEventButton onClick={handleRemoveClick}>
        X
      </S.RemoveMonitoredEventButton>
    </S.MonitoredEventItem>
  );
}

export default MonitoredEvent;
