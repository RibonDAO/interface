import styled from "styled-components";
import {
  defaultBodyLgMedium,
  defaultBodySmRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 75px;
  margin-top: -100px;
`;

export const Title = styled.h1`
  ${defaultBodyLgMedium}

  max-width: 300px;
  margin-top: 16px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Description = styled.p`
  ${defaultBodySmRegular}

  max-width: 300px;
  margin-bottom: ${({ theme }) => theme.spacing(24)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

export const DownloadButton = styled(Button)`
  height: 48px;
`;
