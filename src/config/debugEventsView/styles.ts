import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const DebugViewHeader = styled.h3`
  margin-top: 0;
`;

export const EventTable = styled.table`
  width: 100%;

  th {
    text-align: left;
  }

  td {
    padding: 8px 0;
  }

  tbody tr:nth-child(odd) {
    background-color: #f5f5f5;
  }
`;

const highlightAnimation = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    background-color: #b9e6b3;
  }
`;

interface HighlightRowProps {
  highlight: boolean;
}

export const HighlightRow = styled.tr<HighlightRowProps>`
  ${({ highlight }) =>
    highlight &&
    css`
      animation: ${highlightAnimation} 1s linear;
    `}
`;

export const MinimizedContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const MinimizedText = styled.h3`
  margin: 0;
`;

export const MinusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
`;

export const MinimizeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
`;

export const ResetCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;

export const MonitoredEventsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

export const MonitoredEventItem = styled.li`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const RemoveMonitoredEventButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  margin-left: 5px;
  cursor: pointer;
`;

export const MonitoredEventsInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const MonitoredEventsInput = styled.input`
  padding: 5px 10px;
  margin-right: 10px;
`;

export const MonitoredEventsButton = styled.button`
  padding: 5px 10px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`;

export const MonitoredEventsHeader = styled.h4`
  margin: 0;
`;
