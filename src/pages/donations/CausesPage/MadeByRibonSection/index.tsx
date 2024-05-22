import MadeByRibonPill from "components/atomics/MadeByRibonPill";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export default function MadeByRibonSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.madeByRibonSection",
  });

  return (
    <S.Container>
      <MadeByRibonPill text={t("title")} />
    </S.Container>
  );
}
