import { Story } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";

export type Props = {
  story: Story;
  hasProfileData: boolean;
};

function StoryWithDescription({ story, hasProfileData }: Props): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = story.image;
    image.onload = () => setImageLoaded(true);
  }, []);

  const renderStory = () => {
    if (!imageLoaded)
      return (
        <S.LoaderContainer>
          <Spinner size="40" />
        </S.LoaderContainer>
      );

    return (
      <S.Container image={story.image}>
        <S.Content hasProfileData={hasProfileData}>
          <S.DescriptionWrapper>
            <S.Title>{story.title}</S.Title>
            <S.Description>{story.description}</S.Description>
          </S.DescriptionWrapper>
        </S.Content>
      </S.Container>
    );
  };

  return <>{renderStory()}</>;
}

export default StoryWithDescription;
