import Story from "types/entities/Story";
import * as S from "./styles";

export type Props = {
  story: Story;
  hasProfileData: boolean;
};

function StoryWithDescription({ story, hasProfileData }: Props): JSX.Element {
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
}

export default StoryWithDescription;
