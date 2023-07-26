import styled from "styled-components";
import {
  stylizedDisplayXs,
  stylizedDisplayXxs,
} from "styles/typography/stylized";
import {
  defaultBodyMdRegular,
  defaultBodySmRegular,
  defaultBodyXsRegular,
} from "styles/typography/default";
import Button from "components/atomics/buttons/Button";

export const OuterContainer = styled.div<{
  backgroundImage?: string;
}>`
  width: 100%;
  max-width: 520px;
  min-height: 128px;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  padding: ${({ theme }) => theme.spacing(24, 32, 24, 32)};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.brand.primary[900]};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  ${stylizedDisplayXxs}

  max-width: 250px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.neutral[25]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${stylizedDisplayXs}

    max-width: 100%;
  }
`;

export const Text = styled.span`
  ${defaultBodySmRegular}

  color: ${({ theme }) => theme.colors.neutral[25]};

  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    ${defaultBodyMdRegular}
  }
`;

export const TextList = styled.li`
  color: ${({ theme }) => theme.colors.neutral[25]};
`;

export const CtaButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(24)};
  border-color: ${({ theme }) => theme.colors.brand.primary[200]};
  background-color: ${({ theme }) => theme.colors.brand.primary[200]};
  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;

export const Label = styled.span`
  ${defaultBodyXsRegular}

  color: ${({ theme }) => theme.colors.brand.primary[900]};
`;
export const LabelContainer = styled.div`
  width: 46px;
  height: 28px;
  border-color: ${({ theme }) => theme.colors.brand.primary[900]};
  border-radius: 30px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.feedback.success[50]};
`;
