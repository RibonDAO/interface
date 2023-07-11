import React from "react";
import { EventLog } from "config/debugEventsView/index";
import * as S from "../styles";

interface EventLogProps {
  log: EventLog;
}

function EventLogItem({ log }: EventLogProps) {
  return (
    <S.HighlightRow highlight={log.highlight}>
      <td>{log.eventName}</td>
      <td>
        <S.HorizontalScrollDiv>
          {JSON.stringify(log.eventParams)}
        </S.HorizontalScrollDiv>
      </td>
      <td>{log.count}</td>
    </S.HighlightRow>
  );
}

export default EventLogItem;
