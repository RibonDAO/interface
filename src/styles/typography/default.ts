import { css } from "styled-components";

/* Inter */
const inter = css`
  font-family: "Inter", sans-serif;
`;

const defaultDisplay = css`
  font-weight: 700;
  ${inter}
`;

export const defaultDisplayLarge = css`
  ${defaultDisplay}
  font-size: 56px;
  line-height: 88px;
`;

export const defaultDisplayMedium = css`
  ${defaultDisplay}
  font-size: 48px;
  line-height: 88px;
`;

export const defaultDisplaySmall = css`
  ${defaultDisplay}
  font-size: 40px;
  line-height: 68px;
`;

const defaultHeading = css`
  font-weight: 700;
  ${inter}
`;
export const defaultHeadingLarge = css`
  ${defaultHeading}
  font-size: 36px;
  line-height: 60px;
`;

export const defaultHeadingMedium = css`
  ${defaultHeading}
  font-size: 32px;
  line-height: 56px;
`;

export const defaultHeadingSmall = css`
  ${defaultHeading}
  font-size: 28px;
  line-height: 48px;
`;

const defaultTitle = css`
  font-weight: 700;
  ${inter}
`;
export const defaultTitleLarge = css`
  ${defaultTitle}
  font-size: 24px;
  line-height: 40px;
`;

export const defaultTitleMedium = css`
  ${defaultTitle}
  font-size: 20px;
  line-height: 36px;
`;

export const defaultTitleSmall = css`
  ${defaultTitle}
  font-size: 16px;
  line-height: 32px;
`;

const defaultSubtitle = css`
  font-weight: 600;
  ${inter}
`;
export const defaultSubtitleLarge = css`
  ${defaultSubtitle}
  font-size: 16px;
  line-height: 32px;
`;

export const defaultSubtitleMedium = css`
  ${defaultSubtitle}
  font-size: 14px;
  line-height: 28px;
`;

export const defaultSubtitleSmall = css`
  ${defaultSubtitle}
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`;

const defaultParagraph = css`
  font-weight: 400;
  ${inter}
`;
export const defaultParagraphLarge = css`
  ${defaultParagraph}
  font-size: 16px;
  line-height: 32px;
`;

export const defaultParagraphMedium = css`
  ${defaultParagraph}
  font-size: 14px;
  line-height: 28px;
`;

export const defaultParagraphSmall = css`
  ${defaultParagraph}
  font-size: 12px;
  line-height: 24px;
`;

const defaultComponentText = css`
  font-weight: 600;
  ${inter}
`;
export const defaultComponentTextLarge = css`
  ${defaultComponentText}
  font-size: 16px;
  line-height: 24px;
`;

export const defaultComponentTextMedium = css`
  ${defaultComponentText}
  font-size: 14px;
  line-height: 24px;
`;

export const defaultComponentTextSmall = css`
  ${defaultComponentText}
  font-size: 12px;
  line-height: 16px;
`;
