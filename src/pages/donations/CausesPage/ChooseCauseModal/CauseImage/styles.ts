import styled from "styled-components";
import { defaultBodySmBold } from "styles/typography/default";

export const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(40, 36, 28, 0.25);

  cursor: pointer;

  &:first-child {
    margin-top: ${({ theme }) => theme.spacing(16)};
  }
`;

export const ImageContainer = styled.img`
  width: 100%;
  width: 296px;
  height: 136px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;

export const CauseName = styled.span`
  ${defaultBodySmBold}

  position: absolute;
  z-index: 2;
  color: ${({ theme }) => theme.colors.brand.secondary[700]};
  transform: translate(30%, -100%);
`;

export const Intersection = styled.img`
  position: absolute;
  z-index: 1;
  transform: translate(0, -100%);
`;
