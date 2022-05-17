import React, { useState } from "react";
import ArrowDownIcon from "assets/icons/arrow-down-icon.svg";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import * as S from "./styles";

export type Props = {
  name: string;
  label: string;
  values: any[];
  defaultValue?: any;
  onOptionChanged?: (value: any) => void;
};

function Dropdown({
  name,
  label,
  values,
  onOptionChanged,
  defaultValue,
}: Props): JSX.Element {
  const [dropdownValue, setDropdownValue] = useState(defaultValue || values[0]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleInputClick = () => {
    setOptionsVisible(!optionsVisible);
  };

  const handleOptionClick = (value: string) => {
    setDropdownValue(value);
    setOptionsVisible(false);
    if (onOptionChanged) onOptionChanged(value);
  };

  return (
    <S.Container id="dropdown-container">
      <ModalBlank
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        customStyles={{
          overlay: {
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            position: "relative",
          },
          content: {
            paddingTop: 8,
            paddingBottom: 8,
            position: "absolute",
            boxShadow: "0px 4px 12px 0px rgba(24, 86, 105, 0.15)",
            zIndex: 1,
            margin: 0,
            width: "100%",
            maxWidth: "472px",
          },
        }}
        parentSelector={() =>
          document.querySelector("#dropdown-container") || document.body
        }
      >
        {values.map((value, index) => (
          <S.OptionContainer
            onClick={() => handleOptionClick(value)}
            key={index.toString(10)}
          >
            <S.OptionText>{value}</S.OptionText>
          </S.OptionContainer>
        ))}
      </ModalBlank>
      <S.Input onClick={handleInputClick}>
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
    </S.Container>
  );
}

export default Dropdown;
