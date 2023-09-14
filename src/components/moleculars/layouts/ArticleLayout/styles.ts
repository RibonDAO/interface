import styled from "styled-components";
import {
  defaultBodyMdMedium,
  defaultBodyXsBold,
  defaultBodyXsMedium,
  defaultBodyXsSemibold,
  defaultHeadingXs,
} from "styles/typography/default";

export const Container = styled.div`
  width: 293px;
  height: 100%;
`;

export const authorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.h1`
  ${defaultBodyMdMedium}

  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const imageContainer = styled.div`
  width: 100%;
  height: 216px;
  border-radius: 4;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.neutral10};
  box-shadow: 0px 12px 20px 0px rgba(40, 36, 28, 0.15),
    0px 1px 8px 0px rgba(40, 36, 28, 0.05);
`;

export const Image = styled.img`
  width: 100%;
  height: 156px;
  flex-grow: 1;
`;

export const singleImage = styled.img``;

export const containerFooter = styled.div`
  width: 100%;
  height: 44px;
  margin-top: -3px;
  padding: ${({ theme }) => theme.spacing(0, 16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff1e5;
  cursor: pointer;
`;

export const footerText = styled.p`
  ${defaultBodyXsMedium}

  color: ${({ theme }) => theme.colors.brand.secondary[900]};
`;

export const greenText = styled.p`
  ${defaultBodyXsBold}

  margin-left: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.primary[800]};
`;
export const orangeText = styled.p`
  ${defaultBodyXsBold}

  margin-left: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.brand.secondary[800]};
`;

export const textSecondary = styled.p`
  ${defaultBodyXsSemibold}

  color: ${({ theme }) => theme.colors.neutral[400]};
`;

export const textDivider = styled.p`
  ${defaultHeadingXs}

  margin: ${({ theme }) => theme.spacing(0, 8)};
  color: ${({ theme }) => theme.colors.neutral[100]};
`;
