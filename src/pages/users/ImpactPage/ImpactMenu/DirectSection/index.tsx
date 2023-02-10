import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import Spinner from "components/atomics/Spinner";
import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import { useEffect, useState } from "react";
import directIllustration from "../../assets/direct-illustration.svg";
import * as S from "../styles";
import DirectImpactCard from "./DirectImpactCard.tsx";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-non-profit");
  };

  const { isMobile } = useBreakpoint();

  const [page, setPage] = useState(1);
  const per = isMobile ? 6 : 8;

  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const [impactCards, setImpactCards] = useState<any>([]);
  const { userPersonDirectPayments: directPayments } = usePersonPayments(
    1,
    per * page,
  );

  const hasPayments = impactCards?.length > 0;

  useEffect(() => {
    if (!directPayments || directPayments.length === 0) return;
    if (directPayments.length < page * per) setShowMoreVisible(false);

    setImpactCards(directPayments);
    setShowMoreDisabled(false);
  }, [directPayments]);

  const handleShowMoreClick = () => {
    setPage(page + 1);
    setShowMoreDisabled(true);
  };

  return (
    <S.Container>
      {hasPayments ? (
        <S.CardsContainer>
          {impactCards.map((item: any) => (
            <DirectImpactCard key={item.id} personPayment={item} />
          ))}

          {showMoreVisible && (
            <S.ShowMoreButtonContainer>
              <S.ShowMoreButton
                text={showMoreDisabled ? <Spinner size="14" /> : t("showMore")}
                size="medium"
                onClick={handleShowMoreClick}
                disabled={showMoreDisabled}
              />
            </S.ShowMoreButtonContainer>
          )}
        </S.CardsContainer>
      ) : (
        <S.EmptySectionContainer>
          <S.EmptyImage src={directIllustration} />
          <S.EmptyTitle>{t("emptyTitle")}</S.EmptyTitle>
          <S.EmptyText>{t("emptyText")}</S.EmptyText>
          <S.EmptyButton
            text={t("emptyButton")}
            size="medium"
            onClick={handleEmptyButtonClick}
          />
        </S.EmptySectionContainer>
      )}
    </S.Container>
  );
}

export default DirectSection;
