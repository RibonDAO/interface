import styled, { css } from "styled-components";

export type ThumbProps = {
  color?: string;
};
const thumb = css<ThumbProps>`
  width: 20px;
  height: 20px;
  margin: -7px 0 0;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: none;
  cursor: pointer;
  border: 0 !important;
`;

export type TrackProps = {
  value: number;
  min: number;
  max: number;
  color?: string;
};

const track = css<TrackProps>`
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: ${({ value, min, max, theme, color }) => {
    const mainColor = color;
    const secondaryColor = theme.colors.neutral[200];

    const percent =
      ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;
    return `linear-gradient(to right, ${mainColor} 0%, ${mainColor} ${percent}%, ${secondaryColor} ${percent}%, ${secondaryColor} 100%)`;
  }};

  border-radius: 3px;
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
  position: absolute;
  top: 2px;
  height: 0;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumb}
  }

  &::-moz-range-thumb {
    ${thumb}
  }

  &::-ms-thumb {
    ${thumb}
  }

  // Track
  &::-webkit-slider-runnable-track {
    ${track}
  }

  &::-moz-range-track {
    ${track}
  }

  &::-ms-track {
    ${track}
  }

  &:focus {
    background: none;
    outline: none;
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;
