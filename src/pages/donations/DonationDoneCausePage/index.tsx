import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import useCauses from "hooks/apiHooks/useCauses";
import useOffers from "hooks/apiHooks/useOffers";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import Cause from "types/entities/Cause";
import Offer from "types/entities/Offer";
import { Currencies } from "types/enums/Currencies";
import * as S from "./styles";

function DonationDoneCausePage(): JSX.Element {
  const { orange20 } = theme.colors;
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneCausePage",
  });
  type LocationState = {
    offerId: number;
    causeId: number;
  };
  const currency = Currencies.USD;
  const {
    state: { offerId, causeId },
  } = useLocation<LocationState>();
  const { getCause } = useCauses();
  const { getOffer } = useOffers(currency);
  const [cause, setCause] = useState<Cause>();
  const [offer, setOffer] = useState<Offer>();

  const donationInfos = useCallback(
    async (idCause: number, idOffer: number) => {
      try {
        const name = await getCause(idCause);
        const price = await getOffer(idOffer);
        setCause(name);
        setOffer(price);
      } catch (e) {
        logError(e);
      }
    },
    [],
  );

  useEffect(() => {
    donationInfos(causeId, offerId);
  }, []);

  return (
    <S.Container>
      <S.ImageContainer>
        <IconsAroundImage imageSrc={cause?.mainImage} />
      </S.ImageContainer>

      <S.DonationValue>{offer?.price}</S.DonationValue>
      <S.PostDonationText>{t("title")}</S.PostDonationText>
      <S.PostDonationText>
        {t("titleSecondLine")}
        <S.CauseName> {cause?.name} </S.CauseName>
      </S.PostDonationText>

      <S.FinishButton
        text={t("button")}
        onClick={() => {
          console.log("disparou");
        }}
        backgroundColor={orange20}
      />
    </S.Container>
  );
}

export default DonationDoneCausePage;
