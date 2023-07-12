import TransferAnimation from "components/moleculars/TransferAnimation";
import UserIcon from "assets/icons/user-mono-icon.svg";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
};

function DonatingSection({ nonProfit, onAnimationEnd }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  return (
    <S.Container>
      <TransferAnimation
        text={t("donateAnimationModalTitle")}
        iconOrigin={UserIcon}
        textOrigin={t("donateAnimationModalOrigin")}
        iconDestiny={nonProfit.logo}
        textDestiny={t("donateAnimationModalDestiny")}
        icon={Ticket}
        isIconDestinyFullSize
        eventName="P1_donateProgressModal"
        eventParams={{ nonProfitId: nonProfit.id }}
        onAnimationEnd={onAnimationEnd}
      />
    </S.Container>
  );
}

export default DonatingSection;
