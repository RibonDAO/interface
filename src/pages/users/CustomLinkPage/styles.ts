import styled from "styled-components";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    margin-top: ${({ theme }) => theme.spacing(64)};
  }
`;

export const Container = styled.div`
  width: 100%;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    width: 100%;
    max-width: 424px;
    padding: ${({ theme }) => theme.spacing(24)};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.neutral10};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.defaultShadow10};
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Title = styled.h1`
  ${stylizedDisplaySm}

  color: ${({ theme }) => theme.colors.brand.primary[700]};
`;

export const Form = styled.div`
  margin-top: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(16)};
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

export const Subtitle = styled.h2`
  ${defaultBodyMdSemibold}
`;

export const FieldSet = styled.fieldset`
  margin-top: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(32)};
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  display: flex;
  gap: ${({ theme }) => theme.spacing(16)};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
