import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import ticketIllustration from "../../assets/ticket-illustration.svg";
import * as S from "../styles";

function TicketSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.ticketSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/");
  };
  return (
    <S.EmptySectionContainer>
      <S.EmptyImage src={ticketIllustration} />
      <S.EmptyTitle>{t("emptyTitle")}</S.EmptyTitle>
      <S.EmptyText>{t("emptyText")}</S.EmptyText>
      <S.EmptyButton
        text={t("emptyButton")}
        size="medium"
        onClick={handleEmptyButtonClick}
      />
    </S.EmptySectionContainer>
  );
}

export default TicketSection;
