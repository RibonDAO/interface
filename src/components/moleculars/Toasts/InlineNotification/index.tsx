import Icon from "components/atomics/Icon";
import { Dispatch, useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

export type Props = {
  title: string;
  description: string;
  firstLink?: string;
  onFirstLinkClick?: (setVisible: Dispatch<boolean>) => void;
  secondLink?: string;
  onSecondLinkClick?: (setVisible: Dispatch<boolean>) => void;
  type: "success" | "warning" | "error" | "informational";
  onCloseClick?: () => void;
};
function InlineNotification({
  title,
  description,
  firstLink,
  onFirstLinkClick,
  secondLink,
  onSecondLinkClick,
  type,
  onCloseClick,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(true);
  const { isMobile } = useBreakpoint();

  const handleCloseIconClick = () => {
    setVisible(false);
    if (onCloseClick) onCloseClick();
  };

  const handleFirstLinkClick = () => {
    if (onFirstLinkClick) onFirstLinkClick(setVisible);
  };

  const handleSecondLinkClick = () => {
    if (onSecondLinkClick) onSecondLinkClick(setVisible);
  };

  const iconByType = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "warning":
        return "warning";
      case "error":
        return "dangerous";
      case "informational":
        return "info";
      default:
        return "info";
    }
  };

  const colorByType = () => {
    switch (type) {
      case "success":
        return theme.colors.feedback.success[800];
      case "warning":
        return theme.colors.feedback.warning[600];
      case "error":
        return theme.colors.feedback.error[600];
      case "informational":
        return theme.colors.feedback.informational[600];
      default:
        return "info";
    }
  };

  if (!visible) return <div />;

  return (
    <S.Container type={type}>
      <S.LeftContainer>
        <Icon name={iconByType()} color={colorByType()} />
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>

          {isMobile && (
            <S.Links>
              {firstLink && (
                <S.Link onClick={handleFirstLinkClick}>{firstLink}</S.Link>
              )}
              {secondLink && (
                <S.Link onClick={handleSecondLinkClick}>{secondLink}</S.Link>
              )}
            </S.Links>
          )}
        </S.TextContainer>
      </S.LeftContainer>
      <S.RightContainer>
        {!isMobile && (
          <S.Links>
            {firstLink && (
              <S.Link onClick={handleFirstLinkClick}>{firstLink}</S.Link>
            )}
            {secondLink && (
              <S.Link onClick={handleSecondLinkClick}>{secondLink}</S.Link>
            )}
          </S.Links>
        )}
        <S.CloseIconContainer onClick={handleCloseIconClick}>
          <Icon name="close" size="24px" />
        </S.CloseIconContainer>
      </S.RightContainer>
    </S.Container>
  );
}

export default InlineNotification;
