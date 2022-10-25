import styled, { css } from "styled-components";

const thumb = css`
  width: 20px;
  height: 20px;
  margin: -6px 0 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.green30};
  cursor: pointer;
  border: 0 !important;
`;

export type TrackProps = {
  value: number;
  min: number;
  max: number;
};

const track = css<TrackProps>`
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: ${({ value, min, max, theme }) => {
    const mainColor = theme.colors.green30;
    const secondaryColor = theme.colors.gray20;

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
  margin-bottom: 12px;
  width: 100%;
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
