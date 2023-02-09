import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div`
  display: flex;
  align-items: left;
`;

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LeftContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const RightContainer = styled.div`
  ${defaultBodySmSemibold}

  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const Symbol = styled.p`
  ${defaultBodySmSemibold}

  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const Text = styled.p`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.neutral[200]};
`;

export const TooltipBox = styled(Tooltip)<{
  tooltipPosition?: string;
}>`
  ${defaultBodyXsRegular}

  max-width: 92%;
  margin-right: ${({ theme }) => theme.spacing(16)};
  z-index: 1;
  background: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.neutral[800]};
  box-shadow: 2px 2px 8px 2px rgba(40, 36, 28, 0.25);
  opacity: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    max-width: 372px;
    margin-left: ${(props) => props.tooltipPosition};
  }
`;

export const IconCircle = styled.div`
  width: 20px;
  height: 20px;
  border: solid 2px ${({ theme }) => theme.colors.neutral[500]};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
