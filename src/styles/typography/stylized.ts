import { css } from "styled-components";

/* Gambarino */

const gambarino = css`
  font-family: "Gambarino-Regular";
`;

const stylizedDisplay = css`
  ${gambarino}
  font-weight: 400;
`;

export const stylizedDisplayXl = css`
  ${stylizedDisplay}
  font-size: 40px;
  line-height: 48px;
`;

export const stylizedDisplayLg = css`
  ${stylizedDisplay}
  font-size: 36px;
  line-height: 44px;
`;

export const stylizedDisplayMd = css`
  ${stylizedDisplay}
  font-size: 32px;
  line-height: 40px;
`;

export const stylizedDisplaySm = css`
  ${stylizedDisplay}
  font-size: 28px;
  line-height: 36px;
`;

export const stylizedDisplayXs = css`
  ${stylizedDisplay}
  font-size: 24px;
  line-height: 32px;
`;

export const stylizedDisplayXxs = css`
  ${stylizedDisplay}
  font-size: 20px;
  line-height: 28px;
`;
