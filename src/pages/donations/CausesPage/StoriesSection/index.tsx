import CardStories from "components/moleculars/cards/CardStories";
import { useCallback, useEffect } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export type Props = {
  nonProfit: NonProfit;
  canDonateAndHasVoucher: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onButtonClick?: () => void;
};

function StoriesSection({
  nonProfit,
  canDonateAndHasVoucher,
  visible,
  setVisible,
  onButtonClick,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.storiesPage",
  });

  const profileData = {
    name: nonProfit.name,
    subtitle: nonProfit.cause.name,
    logo: nonProfit.logo,
  };

  const onClickButton = useCallback(() => {
    if (onButtonClick) onButtonClick();
  }, [onButtonClick]);

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
          <CardStories
            stories={nonProfit.stories || []}
            onAllStoriesEnd={() => setVisible(false)}
            onCloseButtonClick={() => setVisible(false)}
            profileData={profileData}
            ctaData={{
              text: t("ctaText"),
              onClick: onClickButton,
              visible: canDonateAndHasVoucher,
            }}
          />
        </S.Container>
      );
    }

    return null;
  };

  return <>{renderStories()}</>;
}

export default StoriesSection;
