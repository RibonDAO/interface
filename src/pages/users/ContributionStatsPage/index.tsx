import useContributions from "hooks/apiHooks/useContributions";
import useQueryParams from "hooks/useQueryParams";
import Banner from "components/moleculars/cards/Banner";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { theme } from "@ribon.io/shared/styles";
import EngagementSection from "./EngagementSection";
import BoostSection from "./BoostSection";
import YoutubeEmbed from "./YoutubeEmbed";
import bannerBackground from "assets/images/banner-logo-background.svg";
import * as S from "./styles";



function ContributionStatsPage(): JSX.Element {
  const queryParams = useQueryParams();
  const contributionId = queryParams.get("contribution_id");
  const { useContributionStats } = useContributions();
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage",
  });
  
  const { data } = useContributionStats(Number(contributionId));
  
  if(!data) return <>carregando</>;
  return (
    <S.Container>
      <S.Title>Você doou <span>{data.stats.initialAmount}</span> para <span>{data.label}</span></S.Title>
      <S.ContentContainer>
        <S.ContainerItem>
          <EngagementSection 
            totalDonors={data.stats.totalDonors.toString()} 
            totalContributors={data.stats.totalContributors.toString()}
          />
          <BoostSection totalAmountToCause={data.stats.totalAmountToCause} />
        </S.ContainerItem>
        <S.ContainerItem>
          <YoutubeEmbed embedId="tJ9lY9npcNU" title={parse(t("video.title"))}/>
          <Banner
              icon={{
                name: "support_agent",
                color: theme.colors.neutral[900],
                withCircle: true,
              }}
              title={{
                text: t("supportSection.title"),
                color: theme.colors.neutral[900],
                size: "medium",
              }}
              cardBackground={bannerBackground}
              text={t("supportSection.title")}
              textColor={theme.colors.neutral[800]}
              arrowLinkColor={theme.colors.brand.secondary[800]}
              onArrowClick={() => {
                console.log("Contact Us");
              }}
            />
          </S.ContainerItem>
      </S.ContentContainer>
    </S.Container>
  );
}

export default ContributionStatsPage;