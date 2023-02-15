import React, { useCallback } from "react";
import Stories from "react-insta-stories";
import { Story } from "@ribon.io/shared/types";
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
  onAllStoriesEnd: () => void;
  onCloseButtonClick: () => void;
};

function CardStories({
  stories,
  profileData,
  ctaData,
  onAllStoriesEnd,
  onCloseButtonClick,
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
        keyboardNavigation
        stories={renderedStories}
        defaultInterval={15000}
        width="100%"
        height="100%"
        onAllStoriesEnd={onAllStoriesEnd}
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
          <S.CtaButton
            size="small"
            onClick={ctaData.onClick}
            text={ctaData.text}
          />
        </S.CtaWrapper>
      )}
      <S.CloseButton onClick={() => onCloseButtonClick()} src={closeIcon} />
    </S.Container>
  );
}

export default CardStories;
