import { useTranslation } from "react-i18next";
import ArrowLeftGreen from "assets/icons/arrow-left-dark-green.svg";
import { usePixPaymentInformation } from "contexts/pixPaymentInformationContext";
import Icon from "components/atomics/Icon";
import CopyIcon from "assets/icons/copy-icon.svg";
import CheckIcon from "assets/icons/check-copied-icon.svg";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useEffect, useState } from "react";
import usePaymentParams from "hooks/usePaymentParams";
import usePayable from "hooks/usePayable";
import { useOffers } from "@ribon.io/shared/hooks";
import { Categories, Currencies, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import PaymentIntent from "types/entities/PaymentIntent";
import { PaymentIntent as PaymentIntentResult } from "@stripe/stripe-js";
import * as S from "./styles";
import TrustSeal from "../TrustSeal";
import PriceSelection from "../PriceSelection";
import { PriceSelectionLoader } from "../PriceSelection/loader";

type LocationStateType = {
  pixInstructions: PaymentIntent & PaymentIntentResult;
};

function PixInstructionsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage.paymentMethodSection.pixInstructions",
  });

  const { verifyPixPayment } = usePixPaymentInformation();
  const { currency, target, targetId, offer: offerId } = usePaymentParams();

  const currentPayable = usePayable(target, targetId);
  const [isCopy, setIsCopy] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const {
    state: { pixInstructions },
  } = useLocation<LocationStateType>();

  const { offers } = useOffers(
    currency as Currencies,
    false,
    Categories.DIRECT_CONTRIBUTION,
  );

  const { navigateTo } = useNavigation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      pixInstructions?.next_action?.pix_display_qr_code?.data ?? "",
    );
    setIsCopy(true);
  };

  useEffect(() => {
    if (pixInstructions && pixInstructions.client_secret) {
      const totalTime = 5 * 60 * 1000;
      const interval = 30 * 1000;
      let elapsedTime = 0;

      const intervalId = setInterval(async () => {
        await verifyPixPayment(
          pixInstructions.client_secret ?? "",
          intervalId.toString(),
        );

        elapsedTime += interval;
        if (elapsedTime >= totalTime) {
          clearInterval(intervalId);
        }
      }, interval);
    }
  }, [pixInstructions, offerId]);

  useEffect(() => {
    const offer = offers.find((o) => o.priceCents === Number(offerId));
    setCurrentOffer(offer);
  }, [offerId, offers]);

  return (
    <S.Container>
      <S.PixContainer>
        <S.InformationsContainer>
          <S.BackButton
            onClick={() => {
              navigateTo({ pathname: "/promoters/support-non-profit" });
            }}
          >
            <img src={ArrowLeftGreen} alt={t("back")} />
          </S.BackButton>

          <S.Title>
            {t("donatingTo")}
            <S.PayableName>{currentPayable?.name}</S.PayableName>
          </S.Title>

          {currentOffer ? (
            <PriceSelection currentOffer={currentOffer} canEdit={false} />
          ) : (
            <PriceSelectionLoader />
          )}
        </S.InformationsContainer>
        <S.Wrapper>
          <S.Title>{t("pixCode")}</S.Title>
          <S.QRCode
            src={
              pixInstructions?.next_action?.pix_display_qr_code?.image_url_svg
            }
          />
          <S.ExpiresAt>{parse(t("expiresAt"))}</S.ExpiresAt>
        </S.Wrapper>
        <S.PixCode
          id="pix-code"
          value={pixInstructions?.next_action?.pix_display_qr_code?.data}
          readOnly
        />
        <Button
          text={isCopy ? t("copyCodeSuccess") : t("copyCode")}
          backgroundColor={
            isCopy ? theme.colors.neutral10 : theme.colors.brand.primary[600]
          }
          borderColor={theme.colors.brand.primary[600]}
          textColor={
            isCopy ? theme.colors.brand.primary[600] : theme.colors.neutral10
          }
          leftIcon={isCopy ? CheckIcon : CopyIcon}
          onClick={copyToClipboard}
        />

        <S.SmallTextInfoContainer>
          <Icon name="error" size="20px" />
          <S.SmallTextInfo>{parse(t("pixReceiverText"))}</S.SmallTextInfo>
        </S.SmallTextInfoContainer>

        <S.InstructionsContainer>
          <S.Title>{t("instructions")}</S.Title>
          <S.InstructionsInfo>
            <S.Number>1</S.Number>
            {t("firstInfo")}
          </S.InstructionsInfo>
          <S.InstructionsInfo>
            {" "}
            <S.Number>2</S.Number>
            {t("secondInfo")}
          </S.InstructionsInfo>
          <S.InstructionsInfo>
            {" "}
            <S.Number>3</S.Number>
            {t("thirdInfo")}
          </S.InstructionsInfo>
        </S.InstructionsContainer>

        <TrustSeal />
      </S.PixContainer>
    </S.Container>
  );
}

export default PixInstructionsPage;
