import StoryNonProfit from "components/moleculars/storyLayouts/StoryNonProfit";
import { useCallback } from "react";
import { useLocation } from "react-router";
import NonProfit from "types/entities/NonProfit";
import Story from "types/entities/Story";
import Stories from "react-insta-stories";
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

  const { navigateBack } = useNavigation();

  const renderedStories = stories.map((story) => ({
    content: useCallback(
      () => <StoryNonProfit story={story} nonProfit={nonProfit} />,
      [],
    ),
  }));

  return (
    <S.Container>
      <Stories
        loop
        keyboardNavigation
        stories={renderedStories}
        defaultInterval={3000}
        onAllStoriesEnd={() => navigateBack()}
        storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
      />
    </S.Container>
  );
}

export default StoriesPage;
