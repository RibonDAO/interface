import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import CommunityAddCycle from "./assets/community-add-cycle.png";

type LocationState = {
  donationAmount: string;
};

function CommunityAddPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { state } = useLocation<LocationState>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportWithCommunityPage.communityAddPage",
  });

  return (
    <S.DesktopContainer>
      <S.Container>
        <S.BackArrowButton src={ArrowLeft} onClick={navigateBack} />
        <S.Title>{t("title", { value: state?.donationAmount })}</S.Title>
        <S.Image src={CommunityAddCycle} />
        <S.DonateButton
          text={t("button", { value: state?.donationAmount })}
          onClick={navigateBack}
        />
      </S.Container>
    </S.DesktopContainer>
  );
}

export default CommunityAddPage;
