import { useFeatureIsOn } from "@growthbook/growthbook-react";
import MainLayout from "layouts/MainLayout";
import * as S from "./styles";

type Props = {
  featureFlagId: string;
  children: any;
  source: string;
};
function ExperimentRouteComponent({ featureFlagId, children, source }: Props) {
  const showAlternativePage = useFeatureIsOn(featureFlagId);

  return showAlternativePage ? (
    <MainLayout hideHeader fullSize>
      <S.Iframe src={source} title="alternative-page" />
    </MainLayout>
  ) : (
    children
  );
}

export default ExperimentRouteComponent;
