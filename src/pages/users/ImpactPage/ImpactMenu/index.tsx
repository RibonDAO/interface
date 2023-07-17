import { useState } from "react";
import { useTranslation } from "react-i18next";
import useContributionActivity from "hooks/useContributionActivity";
import CommunitySection from "./CommunitySection";
import DirectSection from "./DirectSection";
import TicketSection from "./TicketSection";
import * as S from "./styles";

function ImpactMenu() {
  const [currentTab, setCurrentTab] = useState("ticket");
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactMenu",
  });
  const { newContributionActivity } = useContributionActivity();

  const renderSection = () => {
    switch (currentTab) {
      case "ticket":
        return <TicketSection />;
      case "community":
        return <CommunitySection />;
      case "direct":
        return <DirectSection />;
      default:
        return <TicketSection />;
    }
  };

  return (
    <S.Container>
      <S.Menu>
        <S.MenuItem
          active={currentTab === "ticket"}
          onClick={() => setCurrentTab("ticket")}
        >
          {t("ticketDonations")}
        </S.MenuItem>
        <S.MenuContainer>
          {newContributionActivity && <S.RedBall />}
          <S.MenuItem
            active={currentTab === "community"}
            onClick={() => setCurrentTab("community")}
          >
            {t("communityDonations")}
          </S.MenuItem>
        </S.MenuContainer>
        <S.MenuItem
          active={currentTab === "direct"}
          onClick={() => setCurrentTab("direct")}
        >
          {t("directDonations")}
        </S.MenuItem>
      </S.Menu>
      {renderSection()}
    </S.Container>
  );
}
export default ImpactMenu;
