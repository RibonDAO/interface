import React, { useState } from "react";
import ArrowDownIcon from "assets/icons/arrow-down-icon.svg";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import * as S from "./styles";

export type Props = {
  name: string;
  label: string;
  values: string[];
  onOptionChanged?: (value: string) => void;
};

function Dropdown({
  name,
  label,
  values,
  onOptionChanged,
}: Props): JSX.Element {
  const [dropdownValue, setDropdownValue] = useState(values[0]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleInputClick = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <S.Input onClick={handleInputClick}>
      <ModalBlank
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        customStyles={{
          overlay: {
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            width: "calc(100% - 32px)",
          },
          content: {
            paddingTop: 8,
            position: "absolute",
            top: "50px",
            left: "0",
            boxShadow: "0px 4px 12px 0px rgba(24, 86, 105, 0.15)",
          },
        }}
      >
        {values.map((value, index) => (
          <S.OptionContainer
            onClick={() => {
              setDropdownValue(value);
              if (onOptionChanged) onOptionChanged(value);
            }}
            key={index.toString(10)}
          >
            <S.OptionText>{value}</S.OptionText>
          </S.OptionContainer>
        ))}
      </ModalBlank>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        name={name}
        aria-label={name}
        value={dropdownValue}
        readOnly
      />
      <img src={ArrowDownIcon} alt="arrow-down" />
    </S.Input>
  );
}

export default Dropdown;
