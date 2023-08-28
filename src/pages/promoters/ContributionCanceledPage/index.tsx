import { useTranslation } from "react-i18next";
import Illustration from "assets/images/cancel-subscription-illustration.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import LogoRibon from "assets/images/logo-ribon.svg";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useQueryParams from "hooks/useQueryParams";
import * as S from "./styles";
import Loader from "../CheckoutPage/FiatSection/loader";

function ContributionCanceledPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.contributionCanceledPage",
  });

  const queryParams = useQueryParams();
  const contributionId = queryParams.get("contributionId");

  console.log(contributionId);

  const { getSubscription } = useSubscriptions();

  const { isLoading, subscription } = getSubscription(contributionId ?? 0);

  console.log(subscription);

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
