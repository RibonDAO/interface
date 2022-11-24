import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import useOffers from "hooks/apiHooks/useOffers";
import VolunteerActivismPink from "assets/icons/volunteer-activism-pink.svg";
import VolunteerActivismYellow from "assets/icons/volunteer-activism-yellow.svg";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import ConfirmationNumberPink from "assets/icons/confirmation-number-pink.svg";
import ConfirmationNumberYellow from "assets/icons/confirmation-number-yellow.svg";
import ConfirmationNumberGreen from "assets/icons/confirmation-number-green.svg";
import useNavigation from "hooks/useNavigation";
import { setLocalStorageItem } from "lib/localStorage";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logError } from "services/crashReport";
import Cause from "types/entities/Cause";
import NonProfit from "types/entities/NonProfit";
import Offer from "types/entities/Offer";
import { Currencies } from "types/enums/Currencies";
import * as S from "./styles";

function DonationDoneCausePage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneCausePage",
  });
  type LocationState = {
    offerId?: number;
    cause: Cause;
    hasButton?: boolean;
    nonProfit?: NonProfit;
  };
  const currency = Currencies.USD;
  const {
    state: { nonProfit, offerId, cause, hasButton },
  } = useLocation<LocationState>();
  const { getOffer } = useOffers(currency);
  const [offer, setOffer] = useState<Offer>();

  const donationInfos = useCallback(
    async (idOffer: number) => {
      try {
        if (idOffer !== 0) {
          const price = await getOffer(idOffer);
          setOffer(price);
        }
      } catch (e) {
        logError(e);
      }
    },
    [offerId],
  );

  function navigate() {
    navigateTo({
      pathname: "/promoters/support-cause",
      state: { causeDonated: cause },
    });
  }

  useEffect(() => {
    if (offerId) {
      donationInfos(offerId);
    }
    setLocalStorageItem("HAS_DONATED", "true");
    setTimeout(() => {
      navigate();
    }, 5000);
  }, []);

  return (
    <S.Container>
      <S.ImageContainer>
        <IconsAroundImage
          imageSrc={cause?.mainImage}
          iconAnimationYellow={
            hasButton ? VolunteerActivismYellow : ConfirmationNumberYellow
          }
          iconAnimationPink={
            hasButton ? VolunteerActivismPink : ConfirmationNumberPink
          }
          iconAnimationGreen={
            hasButton ? VolunteerActivismGreen : ConfirmationNumberGreen
          }
        />
      </S.ImageContainer>
      <S.DonationValue>{hasButton ? offer?.price : t("title")}</S.DonationValue>
      {hasButton && <S.PostDonationText>{t("title")}</S.PostDonationText>}
      <S.PostDonationText>
        {hasButton ? t("titleSecondLine") : t("youDonatedText")}
        <S.CauseName isGreen={!!nonProfit}>
          {" "}
          {hasButton
            ? cause?.name
            : `${nonProfit?.impactByTicket} ${nonProfit?.impactDescription}`}{" "}
        </S.CauseName>
      </S.PostDonationText>

      {hasButton && (
        <S.FinishButton
          text={t("button")}
          onClick={() => {
            navigate();
          }}
        />
      )}
    </S.Container>
  );
}

export default DonationDoneCausePage;
