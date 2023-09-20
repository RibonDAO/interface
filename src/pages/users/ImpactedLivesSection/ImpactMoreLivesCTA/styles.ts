import styled from "styled-components";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const Container = styled.div``;

export const Title = styled.h1`
  ${defaultBodyMdSemibold}

  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Subtitle = styled.h2`
  ${defaultBodySmRegular}

  margin-bottom: ${({ theme }) => theme.spacing(16)};
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => theme.spacing(4)};
`;
