import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import Rocket from "assets/icons/rocket.svg";
import { logEvent } from "lib/events";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

function PostDonationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationPage",
  });

  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { navigateTo } = useNavigation();
  const { contribution, offer } = useImpactConversion();

  useEffect(() => {
    if (nonProfit === undefined) {
      navigateTo({
        pathname: "/causes",
      });
    }
  }, []);

  useEffect(() => {
    logEvent("contributeCauseBtn_view", {
      from: "givePostDonation_page",
      platform: "web",
    });
    logEvent("contributeNgoBtn_view", {
      from: "givePostDonation_page",
      platform: "web",
    });
  }, [contribution]);

  const handleClickedDonationButton = (flow: string) => {
    logEvent(flow === "nonProfit" ? "giveNgoBtn_start" : "giveCauseBtn_start", {
      from: "givePostDonation_page",
      value: contribution?.value,
      coin: offer?.currency,
      causeId: nonProfit?.cause?.id,
      platform: "web",
    });

    navigateTo({
      pathname: "promoters/payment",
      state: {
        offer,
        nonProfit,
        flow,
        cause: nonProfit?.cause,
      },
    });
  };

  const handleDonateWithCommunityClick = () => {
    handleClickedDonationButton("cause");
  };

  const handleDonateDirectlyClick = () => {
    handleClickedDonationButton("nonProfit");
  };

  const handleDonateLaterClick = () => {
    navigateTo({
      pathname: "/causes",
    });
  };

  useAvoidBackButton();

  return (
    <S.Container>
      <S.SquaredIcon>
        <S.InnerIcon src={VolunteerActivismGreen} />
      </S.SquaredIcon>
      <S.Title>{t("title")}</S.Title>
      {nonProfit && (
        <>
          <S.Card
            image={nonProfit.cause?.coverImage}
            onClick={handleDonateWithCommunityClick}
          >
            <S.DarkOverlay />
            <S.BoostedDonation>
              <S.Rocket src={Rocket} />
              {t("boostedDonation")}
            </S.BoostedDonation>
            <S.BottomContainer>
              <S.Text hasButton>
                {t("donate", {
                  value: formatPrice(
                    contribution?.value ?? offer?.priceValue ?? 0,
                    "brl",
                  ),
                })}
              </S.Text>
              <S.CardMainText>{nonProfit.cause.name}</S.CardMainText>
            </S.BottomContainer>
            <S.InsideButton onClick={() => {}} text={t("donateNow")} />
          </S.Card>
          <S.Card
            image={nonProfit.mainImage}
            onClick={handleDonateDirectlyClick}
          >
            <S.DarkOverlay />
            <S.BottomContainer>
              <S.Text hasButton>
                {t("donate", {
                  value: formatPrice(
                    contribution?.value ?? offer?.priceValue ?? 0,
                    "brl",
                  ),
                })}
              </S.Text>
              <S.CardMainText>{nonProfit.name}</S.CardMainText>
            </S.BottomContainer>
            <S.InsideButton onClick={() => {}} text={t("donateNow")} />
          </S.Card>
        </>
      )}
      <S.ButtonContainer>
        <S.OutlineButton
          onClick={handleDonateLaterClick}
          text={t("donateLater")}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default PostDonationPage;
