import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ArrowDownIcon from "assets/icons/arrow-down-icon.svg";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import * as S from "./styles";

export type Props = {
  name: string;
  label?: string;
  values: any[];
  defaultValue?: any;
  onOptionChanged?: (value: any) => void;
  valueText?: (value: any) => string;
  customInputStyles?: CSSProperties;
  containerId?: string;
};

function Dropdown({
  name,
  label,
  values,
  onOptionChanged,
  defaultValue,
  valueText,
  containerId = "dropdown-container",
  customInputStyles = {},
}: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueToText = (value: any) => {
    if (valueText && value) return valueText(value);

    return value;
  };

  const [dropdownValue, setDropdownValue] = useState(values[0]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleInputClick = () => {
    setOptionsVisible(!optionsVisible);
  };

  const handleOptionClick = (value: string) => {
    setDropdownValue(value);
    setOptionsVisible(false);
    if (onOptionChanged) onOptionChanged(value);
  };

  const updateDropdownValue = useCallback(() => {
    if (defaultValue) setDropdownValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    updateDropdownValue();
  }, [updateDropdownValue]);

  const parentElement = useMemo(() => {
    if (containerRef?.current != null)
      return containerRef.current as HTMLElement;
    return document.body;
  }, [containerRef.current]);

  return (
    <S.Container id={containerId} ref={containerRef}>
      <ModalBlank
        visible={optionsVisible}
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
        parentSelector={() => parentElement}
      >
        {values.map((value, index) => (
          <S.OptionContainer
            onClick={() => handleOptionClick(value)}
            key={index.toString(10)}
          >
            <S.OptionText>{valueToText(value)}</S.OptionText>
          </S.OptionContainer>
        ))}
      </ModalBlank>
      <S.Input onClick={handleInputClick} style={customInputStyles}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type="text"
          name={name}
          aria-label={name}
          value={valueToText(dropdownValue)}
          readOnly
          style={{ color: customInputStyles.color }}
        />
        <img src={ArrowDownIcon} alt="arrow-down" />
      </S.Input>
    </S.Container>
  );
}

export default Dropdown;
