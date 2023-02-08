import globeIcon from "assets/icons/globe-icon.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { useLanguage } from "hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import * as S from "./styles";

function ChangeLanguageItem(): JSX.Element {
  const { currentLang, handleSwitchLanguage } = useLanguage();
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.changeLanguageItem",
  });

  function handleSwitch() {
    logEvent("configLanguageButton_click");
    handleSwitchLanguage();
  }

  return (
    <S.Container>
      <CardIconText
        text={t("changeLanguageText")}
        icon={globeIcon}
        rightComponent={
          <ButtonSwitch
            leftText="PT"
            rightText="EN"
            onSwitch={() => handleSwitch()}
            initialCheckState={currentLang === "en-US"}
          />
        }
      />
    </S.Container>
  );
}

export default ChangeLanguageItem;
