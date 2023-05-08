import { useStatistics } from "@ribon.io/shared/hooks"
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";
import { setLocalStorageItem } from "lib/localStorage";
import { theme } from "@ribon.io/shared/styles";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import ImpactIcon from "./assets/impact-value.svg";
import TicketIcon from "./assets/ticket-value.svg";
import PinkBg from "./assets/pink-bg.svg";
import GreenBg from "./assets/green-bg.svg";
import * as S from "./styles";

function DonationLegacyMigrationPage(): JSX.Element {
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationLegacyMigrationPage",
  });

  const { currentUser } = useCurrentUser();
  const {
    userStatistics,
    refetch: refetchStatistics,
  } = useStatistics({
    userId: currentUser?.id,
  });

  useEffect(() => {
    refetchStatistics();
  }, [currentUser]);

  useEffect(() => {
    setLocalStorageItem("HAS_DONATED", "true");
  }, [currentUser, userStatistics]);

  return (
    <S.Container>
      <S.ContentSection>
        <S.PinkBackground src={PinkBg} />
        <S.GreenBackground src={GreenBg} />

        <S.SquaredIcon>
          <S.InnerIcon src={VolunteerActivismGreen} />
        </S.SquaredIcon>

        <S.Title>{t("title")}</S.Title>

        <S.Description>
          {t("description")}

          <S.BoldDescription>{t("descriptionBold")}</S.BoldDescription>
        </S.Description>

        <S.IconsSection>
          <S.Icon src={TicketIcon} />
          <S.Equals>=</S.Equals>
          <S.Icon src={ImpactIcon} />
        </S.IconsSection>
      </S.ContentSection>

      <S.FinishButton
        text={t("buttonText")}
        onClick={() => navigateTo("/donations")}
        borderColor={theme.colors.brand.primary[600]}
        textColor={theme.colors.brand.primary[600]}
        backgroundColor={theme.colors.neutral10}
      />
    </S.Container>
  );
}

export default DonationLegacyMigrationPage;
