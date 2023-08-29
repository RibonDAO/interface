import { useTranslation } from "react-i18next";
import Illustration from "assets/images/cancel-subscription-illustration.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import LogoRibon from "assets/images/logo-ribon.svg";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useQueryParams from "hooks/useQueryParams";
import { useCallback, useEffect, useState } from "react";
import Icon from "components/atomics/Icon";
import * as S from "./styles";
import Loader from "../CheckoutPage/FiatSection/loader";

function ContributionCanceledPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.contributionCanceledPage",
  });

  const queryParams = useQueryParams();
  const token = queryParams.get("token");

  const [subscription, setSubscription] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { cancelSubscription } = useSubscriptions();
  const { isLoading } = cancelSubscription(token);

  const callTheApi = useCallback(() => {
    if (!token) return;

    cancelSubscription(token)
      .then((currentSubscription) => {
        setLoading(false);
        setSubscription(currentSubscription);
        if (!subscription) setError(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [token, cancelSubscription]);

  useEffect(() => {
    if (loading) callTheApi();
  }, [callTheApi, loading]);

  const renderLoader = () => (
    <S.Container>
      <S.Loader />
      <p>{t("loading")}</p>
    </S.Container>
  );

  const renderInvalidLink = () => (
    <S.Container>
      <Icon name="error" size="50px" />
      <p>{t("invalidLink")}</p>
    </S.Container>
  );

  if (!token) return renderInvalidLink();
  if (error && !loading) return renderInvalidLink();
  if (loading) return renderLoader();

  return isLoading ? (
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
            <S.Title>{t("title")}</S.Title>
            <S.Description>
              {
                (t("description"),
                {
                  value: subscription.offer.price,
                  receiver: subscription.receiver.name,
                })
              }
            </S.Description>
          </S.TextContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ContributionCanceledPage;
