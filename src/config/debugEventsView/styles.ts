import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 550px;
  padding: 20px;
  border: 1px solid #ccc;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  background-color: white;
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
  padding: 10px;
  border: 1px solid #ccc;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  cursor: pointer;
`;

export const MinimizedText = styled.h3`
  margin: 0;
`;

export const MinusButton = styled.button`
  padding: 0;
  border: none;
  font-size: 18px;
  line-height: 1;
  background-color: transparent;
  cursor: pointer;
`;

export const MinimizeButton = styled.button`
  padding: 0;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  line-height: 1;
  background-color: transparent;
  cursor: pointer;
`;

export const ResetCheckbox = styled.label`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;

export const MonitoredEventsList = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

export const MonitoredEventItem = styled.li`
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
`;

export const RemoveMonitoredEventButton = styled.button`
  margin-left: 5px;
  padding: 0;
  border: none;
  font-size: 12px;
  line-height: 1;
  background-color: transparent;
  cursor: pointer;
`;

export const MonitoredEventsInputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const MonitoredEventsInput = styled.input`
  margin-right: 10px;
  padding: 5px 10px;
`;

export const MonitoredEventsButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
`;

export const MonitoredEventsHeader = styled.h4`
  margin: 0;
`;

export const HorizontalScrollDiv = styled.div`
  max-width: 250px;
  overflow-x: auto;
`;

export const ResetButton = styled.button`
  padding: 0;
  border: none;
  position: absolute;
  top: 10px;
  right: 40px;
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  cursor: pointer;
`;
