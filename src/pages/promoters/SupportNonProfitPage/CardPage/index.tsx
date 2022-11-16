import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import Offer from "types/entities/Offer";
import offerFactory from "config/testUtils/factories/offerFactory";
import { removeInsignificantZeros } from "lib/formatters/currencyFormatter";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import SelectOfferSection from "./SelectOfferSection";

function CardPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId, nonProfit } =
    useCardPaymentInformation();
  const { nonProfits } = useNonProfits();

  const { causes } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    logEvent("nonProfitSupportScreen_view");
  }, []);

  useEffect(() => {
    setCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("nonProfitCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const handleDonateClick = () => {
    logEvent("nonProfitComCicleBtn_click");
    navigateTo({
      pathname: "/promoters/support-cause/payment",
      state: {
        offer: currentOffer,
        cause,
        nonProfit,
      },
    });
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  const filteredNonProfits = useCallback(
    () => nonProfits || [],
    [cause, nonProfits],
  );

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <GroupButtons
        elements={causes}
        onChange={handleCauseClick}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.orange40}
        textColorOutline={theme.colors.orange40}
        borderColor={theme.colors.orange40}
        borderColorOutline={theme.colors.orange20}
      />
      {filteredNonProfits().map((np) => (
        <S.ContentContainer>
          <S.SupportImage src={np.mainImage} />
          <S.DonateContainer>
            <S.GivingContainer>
              <S.ContributionContainer>
                <SelectOfferSection
                  nonProfit={np}
                  onOfferChange={handleOfferChange}
                />
              </S.ContributionContainer>
            </S.GivingContainer>
            <S.DonateButton
              text={t("donateButtonText", {
                value: removeInsignificantZeros(currentOffer.price),
              })}
              onClick={handleDonateClick}
            />
          </S.DonateContainer>
        </S.ContentContainer>
      ))}

      <UserSupportSection />
      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default CardPage;
