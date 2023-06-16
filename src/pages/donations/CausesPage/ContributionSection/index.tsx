import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUsers } from "@ribon.io/shared";
import NewImpact from "./testA.json";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });
  const { currentUser } = useCurrentUser();
  const { findUser } = useUsers();

  const { isMobile } = useBreakpoint();

  console.log(currentUser);
  const nonProfit = findUser(currentUser?.email ?? "");

  console.log(nonProfit);

  const contribution = NewImpact.Lwala;

  return (
    <S.Container isMobile={isMobile}>
      <S.ImageContainer>
        <S.Title>{t("title")}</S.Title>
        <S.NonProfitImage src={contribution.image} />
      </S.ImageContainer>
      <ContributionCard
        description={contribution.description}
        value={contribution.value}
        offerId={contribution.offerId}
        nonProfitId={1}
      />
    </S.Container>
  );
}

export default ContributionSection;
