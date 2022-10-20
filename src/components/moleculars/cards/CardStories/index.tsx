import React, { useCallback } from "react";
import Stories from "react-insta-stories";
import Story from "types/entities/Story";
import StoryWithDescription from "components/moleculars/storyLayouts/StoryWithDescription";
import closeIcon from "assets/icons/close-icon.svg";
import securityIcon from "assets/icons/security-mark-icon.svg";
import * as S from "./styles";

export type Props = {
  stories: Story[];
  profileData?: {
    name: string;
    subtitle: string;
    logo: string;
  };
  ctaData?: {
    text: string;
    onClick: () => void;
    visible: boolean;
  };
  navigateBack: () => void;
};

function CardStories({
  stories,
  navigateBack,
  profileData,
  ctaData,
}: Props): JSX.Element {
  const hasProfileData = Boolean(profileData);

  const renderedStories = stories.map((story) => ({
    content: useCallback(
      () => (
        <StoryWithDescription story={story} hasProfileData={hasProfileData} />
      ),
      [],
    ),
  }));

  return (
    <S.Container>
      <Stories
        loop
        keyboardNavigation
        stories={renderedStories}
        defaultInterval={10000}
        width="100%"
        height="100%"
        onAllStoriesEnd={() => navigateBack()}
        storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
      />
      {profileData && (
        <S.ProfileDataWrapper>
          <S.AvatarImage src={profileData.logo} />
          <S.ProfileInfo>
            <S.Info>
              {profileData.name}
              <S.Icon src={securityIcon} />
            </S.Info>
            <S.SmallInfo>{profileData.subtitle}</S.SmallInfo>
          </S.ProfileInfo>
        </S.ProfileDataWrapper>
      )}
      {ctaData && ctaData.visible && (
        <S.CtaWrapper>
          <S.CtaButton onClick={ctaData.onClick}>{ctaData.text}</S.CtaButton>
        </S.CtaWrapper>
      )}
      <S.CloseButton onClick={() => navigateBack()} src={closeIcon} />
    </S.Container>
  );
}

export default CardStories;
