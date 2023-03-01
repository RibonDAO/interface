import { useState } from "react";
import * as S from "./styles";

export type Props = {
  name: string;
  suggestions: any[];
  placeholder: string;
  onOptionChanged?: (value: any) => void;
  required?: boolean;
  borderColor?: Record<string, any>;
  textColor?: string;
};

function InputAutoComplete({
  name,
  suggestions,
  placeholder,
  onOptionChanged,
  required,
  borderColor,
  textColor,
  ...props
}: Props): JSX.Element {
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const maxInputsShowing = 4;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const relatedSuggestions = suggestions.length
      ? suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(userInput.toLowerCase()),
        )
      : [];

    setInput(e.target.value);
    setFilteredSuggestions(relatedSuggestions);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleOptionClick = (value: string) => {
    setInput(value);
    setShowSuggestions(false);
    if (onOptionChanged) onOptionChanged(value);
  };

  return (
    <>
      <S.InputAutoComplete
        id={name}
        onChange={onChange}
        onClick={onClick}
        value={input}
        placeholder={placeholder}
        aria-label={placeholder}
        name={name}
        required={required}
        autoComplete="off"
        textColor={textColor}
        borderColor={borderColor}
        {...props}
      />
      {showSuggestions && input && (
        <S.Container>
          {filteredSuggestions.map(
            (value, index) =>
              index < maxInputsShowing && (
                <S.OptionContainer
                  onClick={() => handleOptionClick(value)}
                  key={value}
                >
                  <h5>{value}</h5>
                </S.OptionContainer>
              ),
          )}
        </S.Container>
      )}
    </>
  );
}

export default InputAutoComplete;
