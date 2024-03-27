import styled from "styled-components";
import {
  defaultBodySmMedium,
  defaultBodyXsRegular,
} from "styles/typography/default";

export const Container = styled.div``;

export const Box = styled.div`
  width: 160px;
  height: 160px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px dashed ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  :hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    cursor: pointer;
  }
`;

export const LabelContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.p`
  ${defaultBodySmMedium}

  color: ${({ theme }) => theme.colors.neutral[700]};

  span {
    ${defaultBodySmMedium}

    color: ${({ theme }) => theme.colors.feedback.error[600]};
  }
`;

export const Description = styled.p`
  ${defaultBodyXsRegular}

  margin: ${({ theme }) => theme.spacing(4, 0)};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[800]};

  span {
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const Hint = styled.p`
  ${defaultBodyXsRegular}

  margin-top: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const UploadOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};

    img {
      display: block;
    }
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: 0;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 100px;
`;
