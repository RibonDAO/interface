import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { logEvent } from "lib/events";
import { useLocation } from "react-router-dom";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useFirstAccessToIntegration } from "@ribon.io/shared/hooks";
import { INTEGRATION_AUTH_ID } from "utils/constants";
import UserAvatar from "../assets/user-avatar.svg";
import * as S from "./styles";

type LocationStateType = {
  email?: string;
};

function SentMagicLinkEmailPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkEmailPage",
  });
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(INTEGRATION_AUTH_ID);

  useEffect(() => {
    logEvent("P28_view", {
      from: "sign_in",
    });
  }, []);

  const {
    state: { email },
  } = useLocation<LocationStateType>();

  useAvoidBackButton();
  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <div>
        <S.ImageContainer>
          <S.MainImage src={UserAvatar} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>
            {isFirstAccessToIntegration ? t("firstAccessTitle") : t("title")}
          </S.Title>
          <S.Text>
            {isFirstAccessToIntegration
              ? t("firstAccessText", { email })
              : t("text", { email })}
          </S.Text>
        </S.ContentContainer>
      </div>
    </S.Container>
  );
}

export default SentMagicLinkEmailPage;
