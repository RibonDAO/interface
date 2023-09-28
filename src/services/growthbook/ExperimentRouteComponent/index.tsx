import { useFeatureIsOn } from "@growthbook/growthbook-react";
import MainLayout from "layouts/MainLayout";
import { useLanguage } from "hooks/useLanguage";
import { useState } from "react";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";

type Props = {
  featureFlagId: string;
  children: any;
  source: string;
};
function ExperimentRouteComponent({ featureFlagId, children, source }: Props) {
  const [loadingIframe, setLoadingIframe] = useState(true);
  const showAlternativePage = useFeatureIsOn(featureFlagId);
  const { currentLang } = useLanguage();
  const pageSlug = currentLang === "en" ? "/en" : "";

  return showAlternativePage ? (
    <MainLayout hideHeader fullSize>
      <>
        {loadingIframe && (
          <S.LoadingContainer>
            <Spinner size="32px" />
          </S.LoadingContainer>
        )}
        <S.Iframe
          src={`${source}${pageSlug}`}
          title="alternative-page"
          data-testid="alternative-page"
          onLoad={() => {
            setLoadingIframe(false);
          }}
        />
      </>
    </MainLayout>
  ) : (
    children
  );
}

export default ExperimentRouteComponent;
