import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "lib/events";
import useContributions from "hooks/apiHooks/useContributions";
import Banner from "components/moleculars/banners/Banner";
import YoutubeEmbed from "components/moleculars/YoutubeEmbed";
import Spinner from "components/atomics/Spinner";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { theme } from "@ribon.io/shared/styles";
import BannerBackground from "components/moleculars/banners/UserSupportBanner/assets/background.svg";
import GiftCycleSection from "pages/users/ContributionStatsPage/GiftCycleSection";
import { useLanguage } from "hooks/useLanguage";
import { Languages } from "@ribon.io/shared/types";
import EngagementSection from "./EngagementSection";
import BoostSection from "./BoostSection";
import * as S from "./styles";

function ContributionStatsPage(): JSX.Element {
  const { contributionId } = useParams<{ contributionId: string }>();
  const { useContributionStats } = useContributions();
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage",
  });
  const { currentLang } = useLanguage();
  const ptEmbedId = "tJ9lY9npcNU";
  const enEmbedId = "7hgatm9cq40";

  useEffect(() => {
    logEvent("P24_view ", {
      id: contributionId,
    });
  }, []);

  const { data } = useContributionStats(Number(contributionId));

  if (!data) return <Spinner />;

  const amount = data.stats.initialAmount;
  const cause = data.receiver?.name;
  return (
    <S.Container>
      <S.Title>{parse(t("title", { amount, cause }))}</S.Title>
      <S.ContentContainer>
        <S.ContainerItem>
          <GiftCycleSection />
          <EngagementSection
            totalDonors={(
              data.stats.totalDonors + data.stats.totalContributors
            ).toString()}
            totalContributors={data.stats.totalContributors.toString()}
          />
          <BoostSection totalAmountToCause={data.stats.totalAmountToCause} />
        </S.ContainerItem>
        <S.ContainerItem>
          <YoutubeEmbed
            embedId={currentLang === Languages.PT ? ptEmbedId : enEmbedId}
            title={parse(t("video.title"))}
          />
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
            cardBackground={BannerBackground}
            text={t("supportSection.text")}
            textColor={theme.colors.neutral[800]}
            arrowLinkColor={theme.colors.brand.secondary[800]}
            onArrowClick={() => {
              logEvent("P24_opinionCardBtn_click", {
                id: contributionId,
              });
              window.open(
                "https://api.whatsapp.com/send/?phone=554896605461&text=Oi%2C+quero+compartilhar+minha+opini%C3%A3o+:)&type=phone_number&app_absent=0",
              );
            }}
          />
        </S.ContainerItem>
      </S.ContentContainer>
    </S.Container>
  );
}

export default ContributionStatsPage;
