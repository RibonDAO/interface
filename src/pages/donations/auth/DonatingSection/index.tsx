import TransferAnimation from "components/moleculars/TransferAnimation";
import UserIcon from "assets/icons/user-mono-icon.svg";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import { useUserProfile } from "@ribon.io/shared/hooks";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
};

function DonatingSection({ nonProfit, onAnimationEnd }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  return (
    <S.Container>
      <TransferAnimation
        text={t("donateAnimationModalTitle")}
        iconOrigin={profile?.photo ?? UserIcon}
        textOrigin={t("donateAnimationModalOrigin")}
        iconDestiny={nonProfit.logo}
        textDestiny={t("donateAnimationModalDestiny")}
        icon={Ticket}
        isIconDestinyFullSize
        onAnimationEnd={onAnimationEnd}
        isIconOriginFullSize={!!profile?.photo}
      />
    </S.Container>
  );
}

export default DonatingSection;
