import { useState } from "react";
import { useTranslation } from "react-i18next";
import CommunitySection from "../CommunitySection";
import DirectSection from "../DirectSection";
import * as S from "./styles";

function ImpactMenu() {
  const [currentTab, setCurrentTab] = useState("ticket");
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactMenu",
  });

  const handleChangedTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const renderSection = () => {
    switch (currentTab) {
      case "ticket":
        return "ticket";
      case "community":
        return <CommunitySection />;
      case "direct":
        return <DirectSection />;
      default:
        return "ticket";
    }
  };

  return (
    <S.Container>
      <S.Menu>
        <S.MenuItem
          active={currentTab === "ticket"}
          onClick={() => handleChangedTab("ticket")}
        >
          {t("ticketDonations")}
        </S.MenuItem>
        <S.MenuItem
          active={currentTab === "community"}
          onClick={() => handleChangedTab("community")}
        >
          {t("communityDonations")}
        </S.MenuItem>
        <S.MenuItem
          active={currentTab === "direct"}
          onClick={() => handleChangedTab("direct")}
        >
          {t("directDonations")}
        </S.MenuItem>
      </S.Menu>
      {renderSection()}
    </S.Container>
  );
}
export default ImpactMenu;
