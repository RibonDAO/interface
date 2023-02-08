import { newLogEvent } from "lib/events";
import * as S from "./styles";

export type Props = {
  title?: string;
  subtitle?: string;
  image?: string;
  link?: string;
  eventName?: string;
  eventParams?: Record<string, any>;
};
function TicketWithTextAndImage({
  title,
  subtitle,
  image,
  link,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const onLinkClick = (e: any) => {
    e.preventDefault();
    if (link) {
      window.open(link, "_blank");
    }
    if (eventName) {
      newLogEvent("click", eventName, eventParams);
    }
  };
  return (
    <S.Container>
      <S.LeftContainer>
        <S.Title>{title}</S.Title>
        {link ? (
          <S.Link onClick={onLinkClick}>{subtitle}</S.Link>
        ) : (
          <S.Subtitle>{subtitle}</S.Subtitle>
        )}
      </S.LeftContainer>
      <S.RightContainer>
        <S.Image src={image} alt="logo" />
      </S.RightContainer>
    </S.Container>
  );
}

export default TicketWithTextAndImage;
