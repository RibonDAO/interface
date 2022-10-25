import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import Carousel from "components/moleculars/sliders/Carousel";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg"
import * as S from "./styles";

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
    setCurrentCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (cause: Cause, index: number) => {
    setCurrentCause(cause);
    setSelectedButtonIndex(index);
  };

  function renderCausesButtons() {
    return causes?.map((item, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleCauseClick(item, index)}
        key={item?.id}>{item.name}</S.Button>
    ));
  }

  return (
    <S.Container>
      <S.MainContainer>
        <S.Title>{t("title")}</S.Title>
        <S.ContainerCarousel>
          <Carousel sliderPerView={isMobile ? 2 : 2.8} mode="snap" loop spacing={8}>
            {renderCausesButtons()}
          </Carousel>
        </S.ContainerCarousel>
      </S.MainContainer>
      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportTreasurePage;
