import React from "react";
import * as S from "./styles";

export type Props = {
  color?: string;
};

function RibonIcon({ color = "#00DA93" }: Props): JSX.Element {
  return (
    <S.Container color={color}>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="12"
        aria-label="Ribon Icon"
        role="img"
      >
        <path
          d="M2.54.948a3.242 3.242 0 000 4.578 3.24 3.24 0 010 4.577 3.225 3.225 0 01-2.284.956.252.252 0 00-.18.434.252.252 0 00.1.06 6.454 6.454 0 006.932-1.449 6.485 6.485 0 000-9.156 3.225 3.225 0 00-4.568 0z"
          fill="currentColor"
        />
      </svg>
    </S.Container>
  );
}

export default RibonIcon;
