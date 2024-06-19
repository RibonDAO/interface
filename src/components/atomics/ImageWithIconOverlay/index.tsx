import { useState } from "react";
import ProfilePhoto from "assets/icons/user.svg";
import {
  LeftImagePlaceholder,
  RightImagePlaceholder,
} from "./ImagePlaceholders";
import * as S from "./styles";

type Props = {
  leftImage?: string;
  rightImage?: string;
};

function ImageWithIconOverlay({ leftImage, rightImage }: Props): JSX.Element {
  const [isLeftImageLoading, setIsLeftImageLoading] = useState(true);
  const [isRightImageLoading, setIsRightImageLoading] = useState(true);

  return (
    <S.Container>
      <S.LeftContainer>
        <S.LeftImageContainer>
          {leftImage && isLeftImageLoading && <LeftImagePlaceholder />}
          {leftImage ? (
            <S.LeftImage
              src={leftImage}
              data-testid="leftImage"
              onLoad={() => setIsLeftImageLoading(false)}
              onError={() => setIsLeftImageLoading(false)}
            />
          ) : (
            <S.AvatarContainer bg={ProfilePhoto} />
          )}
        </S.LeftImageContainer>
      </S.LeftContainer>
      <S.RightContainer>
        {isRightImageLoading && <RightImagePlaceholder />}
        <S.RightImage
          src={rightImage}
          data-testid="rightImage"
          onLoad={() => setIsRightImageLoading(false)}
          onError={() => setIsRightImageLoading(false)}
        />
      </S.RightContainer>
    </S.Container>
  );
}

export default ImageWithIconOverlay;
