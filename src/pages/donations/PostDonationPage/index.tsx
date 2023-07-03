import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import Rocket from "assets/icons/rocket.svg";
import { newLogEvent } from "lib/events";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { shouldRenderVariation } from "lib/handleVariation";
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
  const { contribution, variation, offer, description } = useImpactConversion();

  const isVariation = useCallback(
    () => shouldRenderVariation(variation) && !!contribution,
    [contribution, variation],
  );

  useEffect(() => {
    if (nonProfit === undefined) {
      navigateTo({
        pathname: "/causes",
      });
    }
  }, []);

  useEffect(() => {
    if (isVariation()) {
      newLogEvent("view", "contributeCauseBtn", {
        from: "givePostDonation_page",
      });
      newLogEvent("view", "contributeNgoBtn", {
        from: "givePostDonation_page",
      });
    }
  }, [variation]);

  const handleClickedDonationButton = (flow: string) => {
    newLogEvent("start", flow === "nonProfit" ? "giveNgoBtn" : "giveCauseBtn", {
      from: "givePostDonation_page",
      value: contribution?.value,
      coin: offer?.currency,
      causeId: nonProfit?.cause?.id,
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
    if (isVariation()) {
      handleClickedDonationButton("cause");
    } else {
      newLogEvent("click", "P8_causeCard", { causeId: nonProfit.cause.id });
      navigateTo({
        pathname: "/promoters/support-cause",
        state: {
          causeDonated: nonProfit.cause,
        },
      });
    }
  };

  const handleDonateDirectlyClick = () => {
    if (isVariation()) {
      handleClickedDonationButton("nonProfit");
    } else {
      newLogEvent("click", "P8_nonProfitCard", { nonProfitId: nonProfit.id });
      navigateTo({
        pathname: "/promoters/support-non-profit",
        state: {
          causeDonated: nonProfit.cause,
        },
      });
    }
  };

  const handleDonateLaterClick = () => {
    navigateTo({
      pathname: "/causes",
    });
  };

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
              <S.Text hasButton={isVariation()}>
                {isVariation()
                  ? t("donate", {
                      value: formatPrice(contribution?.value ?? 0, "brl"),
                    })
                  : t("donateAsCommunity")}
              </S.Text>
              <S.CardMainText>{nonProfit.cause.name}</S.CardMainText>
            </S.BottomContainer>
            {isVariation() && (
              <S.InsideButton onClick={() => {}} text={t("donateNow")} />
            )}
          </S.Card>
          <S.Card
            image={nonProfit.mainImage}
            onClick={handleDonateDirectlyClick}
          >
            <S.DarkOverlay />
            <S.BottomContainer>
              <S.Text hasButton={isVariation()}>
                {isVariation()
                  ? description ??
                    `${contribution?.impact && <b>{contribution?.impact}</b>}`
                  : t("donateDirectly")}
              </S.Text>
              <S.CardMainText>
                {isVariation() ? <b>{contribution?.impact}</b> : nonProfit.name}
              </S.CardMainText>
            </S.BottomContainer>
            {isVariation() && (
              <S.InsideButton
                onClick={() => {}}
                text={t("donateButton", {
                  value: formatPrice(contribution?.value ?? 0, "brl"),
                })}
              />
            )}
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
