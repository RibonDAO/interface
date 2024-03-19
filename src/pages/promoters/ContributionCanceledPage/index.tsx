import { useTranslation } from "react-i18next";
import Illustration from "assets/images/cancel-subscription-illustration.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import LogoRibon from "assets/images/logo-ribon.svg";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useQueryParams from "hooks/useQueryParams";
import { useCallback, useEffect, useState } from "react";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import * as S from "./styles";
import Loader from "../CheckoutPage/FiatSection/loader";

function ContributionCanceledPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.contributionCanceledPage",
  });

  const queryParams = useQueryParams();
  const token = queryParams.get("token");

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { cancelSubscription } = useSubscriptions();

  const handleCancelSubscription = useCallback(() => {
    if (!token) return;

    cancelSubscription(token)
      .then((currentSubscription) => {
        if (!currentSubscription) setError(true);
        setSubscription(currentSubscription);
        logEvent("subsCanceledPage_view");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (loading) handleCancelSubscription();
  }, []);

  const renderLoader = () => (
    <S.Container>
      <S.Loader />
      <p style={{ paddingLeft: theme.spacing(8) }}>{t("loading")}</p>
    </S.Container>
  );

  const renderInvalidLink = () => (
    <S.Container>
      <Icon name="error" size="50px" color={theme.colors.feedback.error[600]} />
      <p style={{ paddingLeft: theme.spacing(8) }}>{t("invalidLink")}</p>
    </S.Container>
  );

  if (!token) return renderInvalidLink();
  if (error && !loading) return renderInvalidLink();
  if (loading) return renderLoader();

  const value = subscription?.offer.price;
  const receiver = subscription?.receiver.name;

  const isClub = subscription?.offer?.category === "club";

  return loading && !!subscription ? (
    <Loader />
  ) : (
    <S.Container>
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.LogoImage src={LogoRibon} />
          <S.DefaultImage src={Illustration} />

          <S.TextContainer>
            <S.Title>{isClub ? t("titleClub") : t("title")}</S.Title>
            <S.Description>
              {isClub
                ? t("descriptionClub", { value })
                : t("description", { value, receiver })}
            </S.Description>
          </S.TextContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ContributionCanceledPage;
