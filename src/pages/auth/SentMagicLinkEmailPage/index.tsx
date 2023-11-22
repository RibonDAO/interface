import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { logEvent } from "lib/events";
import { useLocation } from "react-router-dom";
import UserAvatar from "../assets/user-avatar.svg";
import * as S from "./styles";

type LocationStateType = {
  email?: string;
};

function SentMagicLinkEmailPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkEmailPage",
  });

  useEffect(() => {
    logEvent("P28_view", {
      from: "sign_in",
    });
  }, []);

  const {
    state: { email },
  } = useLocation<LocationStateType>();

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <div>
        <S.ImageContainer>
          <S.MainImage src={UserAvatar} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Text>{t("text", { email })}</S.Text>
        </S.ContentContainer>
      </div>
    </S.Container>
  );
}

export default SentMagicLinkEmailPage;
