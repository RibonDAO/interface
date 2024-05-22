import MadeByRibonPill from "components/atomics/MadeByRibonPill";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import * as S from "./styles";

export default function MadeByRibonSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.madeByRibonSection",
  });

  const handleClick = () => {
    logEvent("madebyribon_click");
    window.open(t("link"), "_blank");
  };

  return (
    <S.Container>
      <MadeByRibonPill text={t("title")} onClick={handleClick} />
    </S.Container>
  );
}
