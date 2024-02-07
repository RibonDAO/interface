import CardStories from "components/moleculars/cards/CardStories";
import { useEffect } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import * as S from "./styles";

export type Props = {
  nonProfit: NonProfit;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onButtonClick?: () => void;
};

function StoriesSection({
  nonProfit,
  visible,
  setVisible,
}: Props): JSX.Element {
  const profileData = {
    name: nonProfit.name,
    subtitle: nonProfit.cause.name,
    logo: nonProfit.logo,
  };

  const sortStories = nonProfit?.stories?.sort(
    (a, b) => (a.position || a.id) - (b.position || b.id),
  );

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "initial";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [visible]);

  const renderStories = () => {
    if (visible) {
      return (
        <S.Container visible={visible}>
          {sortStories && (
            <CardStories
              stories={sortStories}
              onAllStoriesEnd={() => setVisible(false)}
              onCloseButtonClick={() => setVisible(false)}
              profileData={profileData}
            />
          )}
        </S.Container>
      );
    }

    return null;
  };

  return <>{renderStories()}</>;
}

export default StoriesSection;
