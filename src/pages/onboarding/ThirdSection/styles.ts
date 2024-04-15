import styled from "styled-components";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: ${({theme}) => theme.spacing(48)};
  padding: ${({theme}) => theme.spacing(16)};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(16)};
  align-items: center;
`;

export const Title = styled.p`
  ${stylizedDisplayXs}
  
  margin-bottom: ${({theme}) => theme.spacing(8)};
  text-align: center;
  color: ${({theme}) => theme.colors.brand.primary[800]};
`;

export const Description = styled.p`
  ${defaultBodySmSemibold}

  color: ${({theme}) => theme.colors.neutral10};
`;
