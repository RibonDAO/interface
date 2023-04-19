import Icon from "components/atomics/Icon";
import { Dispatch, useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";

export type Props = {
  title: string;
  description: string;
  link1?: string;
  onLink1Click?: (setVisible: Dispatch<boolean>) => void;
  link2?: string;
  onLink2Click?: (setVisible: Dispatch<boolean>) => void;
  type: "success" | "warning" | "error" | "informational";
  onCloseClick?: () => void;
};
function InlineNotification({
  title,
  description,
  link1,
  onLink1Click,
  link2,
  onLink2Click,
  type,
  onCloseClick,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(true);
  const { isMobile } = useBreakpoint();

  const handleCloseIconClick = () => {
    setVisible(false);
    if (onCloseClick) onCloseClick();
  };

  const handleLink1Click = () => {
    if (onLink1Click) onLink1Click(setVisible);
  };

  const handleLink2Click = () => {
    if (onLink2Click) onLink2Click(setVisible);
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

  if (!visible) return <div />;

  return (
    <S.Container type={type}>
      <S.LeftContainer>
        <Icon name={iconByType()} />
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
          {isMobile && (
            <S.Links>
              {link1 && <S.Link onClick={handleLink1Click}>{link1}</S.Link>}
              {link2 && <S.Link onClick={handleLink2Click}>{link2}</S.Link>}
            </S.Links>
          )}
        </S.TextContainer>
      </S.LeftContainer>
      <S.RightContainer>
        {!isMobile && (
          <S.Links>
            {link1 && <S.Link onClick={handleLink1Click}>{link1}</S.Link>}
            {link2 && <S.Link onClick={handleLink2Click}>{link2}</S.Link>}
          </S.Links>
        )}
        <S.CloseIconContainer onClick={handleCloseIconClick}>
          <Icon name="close" />
        </S.CloseIconContainer>
      </S.RightContainer>
    </S.Container>
  );
}

export default InlineNotification;
