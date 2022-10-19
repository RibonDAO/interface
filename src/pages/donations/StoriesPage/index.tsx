import CardStories from "components/moleculars/cards/CardStories";
import { useEffect } from "react";
import { useLocation } from "react-router";
import NonProfit from "types/entities/NonProfit";
import Story from "types/entities/Story";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
  stories: Story[];
};

function StoriesPage(): JSX.Element {
  const {
    state: { nonProfit, stories },
  } = useLocation<LocationStateType>();

  const profileData = {
    name: nonProfit.name,
    subtitle: nonProfit.cause.name,
    logo: nonProfit.logo,
  };

  const { navigateBack } = useNavigation();

  useEffect(() => {
    if (!stories.length) navigateBack();
  }, []);

  return (
    <S.Container>
      <CardStories
        stories={stories}
        navigateBack={navigateBack}
        profileData={profileData}
      />
    </S.Container>
  );
}

export default StoriesPage;
