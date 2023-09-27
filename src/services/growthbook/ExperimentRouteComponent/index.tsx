import { useFeatureIsOn } from "@growthbook/growthbook-react";
import MainLayout from "layouts/MainLayout";
import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";

type Props = {
  featureFlagId: string;
  children: any;
  source: string;
};
function ExperimentRouteComponent({ featureFlagId, children, source }: Props) {
  const showAlternativePage = useFeatureIsOn(featureFlagId);
  const { currentLang } = useLanguage();
  const pageSlug = currentLang === "en" ? "/en" : "";

  return showAlternativePage ? (
    <MainLayout hideHeader fullSize>
      <S.Iframe
        src={`${source}${pageSlug}`}
        title="alternative-page"
        data-testid="alternative-page"
      />
    </MainLayout>
  ) : (
    children
  );
}

export default ExperimentRouteComponent;
