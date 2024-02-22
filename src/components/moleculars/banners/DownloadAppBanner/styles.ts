import styled from "styled-components";
import {
  defaultBodyLgBold,
  defaultBodySmRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";
import Shape from "./assets/shape.svg";

export const Container = styled.div`
  padding-block: ${({ theme }) => theme.spacing(16)};
  padding-inline: ${({ theme }) => theme.spacing(24)};
  max-width: 960px;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  border-radius: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(32)};
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.brand.secondary[600]};
  background-image: url(${Shape});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-block: 0;
  }
`;

export const ImageContainer = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    justify-content: center;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 150px;
  height: 100%;
`;

export const StoreImage = styled.img`
  width: 100%;
  max-width: 130px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral10};
  border-radius: ${({ theme }) => theme.spacing(8)};
  cursor: pointer;
`;

export const ButtonsRow = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(16)};
`;

export const TextContainer = styled.div`
  padding-block: ${({ theme }) => theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral10};
`;

export const Title = styled.h2`
  ${defaultBodyLgBold}

  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const Text = styled.h5`
  ${defaultBodySmRegular}
`;

export const MobileButton = styled(Button)`
  width: 100% !important;
  border-color: ${({ theme }) => theme.colors.neutral10};
  background-color: ${({ theme }) => theme.colors.neutral10};
  color: ${({ theme }) => theme.colors.brand.secondary[600]};
`;
