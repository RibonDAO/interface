import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import Carousel from "components/moleculars/sliders/Carousel";
import { logEvent } from "services/analytics";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg";
import * as S from "./styles";
import UserSupportSection from "../SupportTreasurePage/CardSection/UserSupportSection";
import SupportImage from "./assets/support-image.png";

function SupportTreasurePage(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { isMobile } = useBreakpoint();
  const [, setCurrentCause] = useState<Cause>();

  const { causes, refetch: refetchCauses } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    refetchCauses();
  }, []);

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  useEffect(() => {
    setCurrentCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (cause: Cause, index: number) => {
    logEvent("treasureCauseSelection_click", {
      id: cause?.id,
    });
    setCurrentCause(cause);
    setSelectedButtonIndex(index);
  };

  function renderCausesButtons() {
    return causes?.map((item, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleCauseClick(item, index)}
        key={item?.id}
      >
        {item.name}
      </S.Button>
    ));
  }

  return (
    <S.Container>
      <S.MainContainer>
        <S.Title>{t("title")}</S.Title>
        <S.ContainerCarousel>
          <Carousel
            sliderPerView={isMobile ? 2 : 2.8}
            mode="snap"
            loop
            spacing={8}
          >
            {renderCausesButtons()}
          </Carousel>
        </S.ContainerCarousel>
        <S.ContentContainer>
          <S.SupportImage src={SupportImage} />
          <S.DonateContainer>
            <S.GivingContainer>
              <S.ContributionContainer>
                <div />
              </S.ContributionContainer>
              <S.CommunityAddContainer>
                <S.CommunityAddText>{t("communityAddText")}</S.CommunityAddText>
                <S.CommunityAddValue>+ R$ 2</S.CommunityAddValue>
                <S.CommunityAddButton
                  text={t("communityAddButtonText")}
                  onClick={() => {}}
                  outline
                />
              </S.CommunityAddContainer>
            </S.GivingContainer>
            <S.DonateButton
              text={t("donateButtonText", { value: "R$ 10" })}
              onClick={() => {}}
            />
          </S.DonateContainer>
          <UserSupportSection />
        </S.ContentContainer>
      </S.MainContainer>
      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportTreasurePage;
