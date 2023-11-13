import { useCallback, useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { isValidEmail } from "lib/validators";
import { logEvent } from "lib/events";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useDonationFlow from "hooks/useDonationFlow";
import useNavigation from "hooks/useNavigation";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import useQueryParams from "hooks/useQueryParams";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useAuthentication } from "contexts/authenticationContext";
import * as S from "./styles";
import DonatingSection from "../DonatingSection";

function InsertEmailAccountPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.confirmDonationPage.insertEmailAccountPage",
  });

  const [email, setEmail] = useState("");
  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);
  const { formattedImpactText } = useFormattedImpactText();
  const { handleDonate } = useDonationFlow();
  const { navigateTo } = useNavigation();
  const queryParams = useQueryParams();
  const nonProfitId = queryParams.get("nonProfitId");
  const { nonProfits } = useNonProfitsContext();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const { sendAuthenticationEmail } = useAuthentication();

  useEffect(() => {
    if (nonProfits) {
      if (nonProfitId) {
        const currentNonProfit = nonProfits.find(
          (np: NonProfit) => np.id === Number(nonProfitId),
        );
        if (currentNonProfit) {
          setNonProfit(currentNonProfit);
        } else {
          setNonProfit(nonProfits[0]);
        }
      } else {
        setNonProfit(nonProfits[0]);
      }
    }
  }, [nonProfits, nonProfitId]);

  const onContinue = async () => {
    setDonationInProgress(true);

    if (nonProfit) {
      sendAuthenticationEmail({ email });
      await handleDonate({
        nonProfit,
        email,
        onSuccess: () => setDonationSucceeded(true),
        onError: () => {
          setDonationSucceeded(false);
        },
      });
    }
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded && nonProfit) {
      logEvent("ticketDonated_end", {
        nonProfitId: nonProfit.id,
      });
      navigateTo({
        pathname: "/donation-done-cause",
        state: {
          cause: nonProfit.cause,
          nonProfit,
          hasButton: true,
          hasCheckbox: true,
          flow: "magicLink",
        },
      });
    }
  }, [donationSucceeded]);

  useEffect(() => {
    if (nonProfit) {
      logEvent("P28_view", {
        nonProfitId: nonProfit.id,
        from: "donation_flow",
      });
    }
  }, [nonProfit]);

  const handleButtonPress = () => {
    onContinue();
  };

  const oldImpactFormat = () =>
    formattedImpactText(nonProfit, undefined, false, true);

  useAvoidBackButton();

  return (
    <>
      {nonProfit && (
        <S.Container>
          <S.LeftImage src={LeftImage} />
          <S.RightImage src={RightImage} />
          {donationInProgress ? (
            <DonatingSection
              nonProfit={nonProfit}
              onAnimationEnd={onAnimationEnd}
            />
          ) : (
            <div>
              <S.ImageContainer>
                <S.MainImage src={nonProfit.mainImage} />
              </S.ImageContainer>
              <S.ContentContainer>
                <S.Title>{t("title")}</S.Title>
                <S.Description>{oldImpactFormat()}</S.Description>
                <S.InputLabel htmlFor="email">{t("emailLabel")}</S.InputLabel>
                <S.Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <S.Button
                  text={t("confirmText")}
                  onClick={handleButtonPress}
                  backgroundColor={theme.colors.brand.primary[600]}
                  borderColor={theme.colors.brand.primary[600]}
                  textColor={theme.colors.neutral[25]}
                  disabled={!isValidEmail(email)}
                  eventName="authEmailFormBtn_click"
                  eventParams={{ from: "donation_flow" }}
                />
              </S.ContentContainer>
            </div>
          )}
        </S.Container>
      )}
      : <div />
    </>
  );
}

export default InsertEmailAccountPage;
