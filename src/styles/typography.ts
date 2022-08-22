import { css } from "styled-components";

const typography = css`
  ${({ theme }) => css`
    body {
      font-family: "Lato", sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    span {
      color: ${theme.colors.black};
    }

    h1 {
      font-size: 24px;
      line-height: 1.6;
    }

    h2 {
      font-size: 20px;
      line-height: 1.6;
    }

    h3 {
      font-size: 16px;
      line-height: 1.6;
    }

    h4 {
      font-size: 14px;
      line-height: 1;
    }

    h5 {
      font-size: 12px;
      line-height: 1.6;
    }

    p {
      font-size: 16px;
      line-height: 1.7;
    }

    span {
      font-size: 12px;
      line-height: 1;
    }
  `}
`;

export default typography;
