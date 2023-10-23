import { useTranslation } from "react-i18next";
import ArrowLeftGreen from "assets/icons/arrow-left-dark-green.svg";
import { usePixPaymentInformation } from "contexts/pixPaymentInformationContext";
import Icon from "components/atomics/Icon";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useEffect, useState } from "react";
import usePaymentParams from "hooks/usePaymentParams";
import usePayable from "hooks/usePayable";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer } from "@ribon.io/shared";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";
import TrustSeal from "../TrustSeal";
import PriceSelection from "../PriceSelection";
import { PriceSelectionLoader } from "../PriceSelection/loader";

function PixInstructionsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage.paymentMethodSection.pixInstructions",
  });

  const { pixInstructions, verifyPayment } = usePixPaymentInformation();
  const { currency, target, targetId, offer: offerId } = usePaymentParams();

  const currentPayable = usePayable(target, targetId);
  const [isCopy, setIsCopy] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const { offers } = useOffers(currency as Currencies);

  const { navigateTo } = useNavigation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      pixInstructions?.next_action?.pix_display_qr_code?.data ?? "",
    );
    setIsCopy(true);
  };

  useEffect(() => {
    const totalTime = 5 * 60 * 1000;
    const interval = 30 * 1000;
    let elapsedTime = 0;

    const intervalId = setInterval(async () => {
      await verifyPayment();

      elapsedTime += interval;
      if (elapsedTime >= totalTime) {
        clearInterval(intervalId);
      }
    }, interval);
  }, []);

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
              navigateTo("promoters/support-non-profit");
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
          <S.ExpiresAt>
            {t("expiresAt")}{" "}
            <b>
              {new Date(
                pixInstructions?.next_action?.pix_display_qr_code?.expires_at ??
                  "",
              ).toLocaleString()}
            </b>
          </S.ExpiresAt>
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
          leftIcon="content-copy"
          onClick={() => copyToClipboard}
        />

        <S.SmallTextInfoContainer>
          <Icon name="error" size="20px" />
          <S.SmallTextInfo>{t("pixReceiverText")}</S.SmallTextInfo>
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
