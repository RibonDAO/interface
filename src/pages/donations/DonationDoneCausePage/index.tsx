import IconsAroundImage from "components/atomics/sections/IconsAroundImage";
import useCauses from "hooks/apiHooks/useCauses";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import Cause from "types/entities/Cause";
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
  const {
    state: { offerId, causeId },
  } = useLocation<LocationState>();
  const { showCause } = useCauses();
  const [cause, setCause] = useState<Cause>();

  const donationInfos = useCallback(
    async (id: number) => {
      try {
        const name = await showCause(id);
        setCause(name);
      } catch (e) {
        logError(e);
      }
    },
    [showCause],
  );

  useEffect(() => {
    donationInfos(causeId);
  }, []);

  return (
    <S.Container>
      <S.ImageContainer>
        <IconsAroundImage imageSrc="ht  tps://s3-alpha-sig.figma.com/img/c687/d01a/845c6c63d056be82c2a954b18c6f35f1?Expires=1668988800&Signature=hgrsNxOok2bDH0Vp-RX-b1vl6XIjQeQ4wEO2vjTFOoD28Tyl6xPPAD6GGsWTCoNqq5HMXwcQS4GMlVC5jTN882qvvJlp96538GU3r-YfltZ7J2aizTqxkfn5Anlx8SRF9COMnYrAtspy-o~pRLs4b0onKslxpYjpbomQeRSKmyTRKJPbyiUCSNiNVtjbQ7HnIgDIPKLB1jY1HR68ugGd~6YpPb1CeNaLAQ-n2gTLPTURY9FA9XglGt03cIHvJW0XDlCMRDx8Ap46SX8-6ypskkqEEoVp3PtiPyNrQhBB6oQY72xlIpSHttz-wCS8931LDB4G55z-BF4hHAY9CXA2VA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
      </S.ImageContainer>

      <S.DonationValue>{offerId}</S.DonationValue>
      <S.PostDonationText>
        {t("title")} <br />
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
