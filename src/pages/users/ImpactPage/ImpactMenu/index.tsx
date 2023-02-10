import { useState } from "react";
import { useTranslation } from "react-i18next";
import CommunitySection from "./CommunitySection";
import DirectSection from "./DirectSection";
import TicketSection from "./TicketSection";
import * as S from "./styles";

function ImpactMenu() {
  const [currentTab, setCurrentTab] = useState("ticket");
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactMenu",
  });

  return (
    <S.Container>
      <S.Menu>
        <S.MenuItem
          active={currentTab === "ticket"}
          onClick={() => setCurrentTab("ticket")}
        >
          {t("ticketDonations")}
        </S.MenuItem>
        <S.MenuItem
          active={currentTab === "community"}
          onClick={() => setCurrentTab("community")}
        >
          {t("communityDonations")}
        </S.MenuItem>
        <S.MenuItem
          active={currentTab === "direct"}
          onClick={() => setCurrentTab("direct")}
        >
          {t("directDonations")}
        </S.MenuItem>
      </S.Menu>
      <S.TabSection visible={currentTab === "ticket"}>
        <TicketSection />
      </S.TabSection>
      <S.TabSection visible={currentTab === "community"}>
        <CommunitySection />
      </S.TabSection>
      <S.TabSection visible={currentTab === "direct"}>
        <DirectSection />
      </S.TabSection>
    </S.Container>
  );
}
export default ImpactMenu;
