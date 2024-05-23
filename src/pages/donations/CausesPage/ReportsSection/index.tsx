import { useReports } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import ReportImage from "./assets/report.svg";
import ArrowImage from "./assets/arrow-right-dark-green.svg";
import * as S from "./styles";

export default function ReportsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.reportsSection",
  });

  const { reports, isLoading } = useReports();

  const handleReportClick = (link: string) => {
    logEvent("reportCard_click", { link });
    window.open(link, "_blank");
  };

  if (isLoading) return null;

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      <S.SideScroll>
        {reports.map((report) => (
          <S.Card
            key={report.id}
            onClick={() => handleReportClick(report.link)}
          >
            <S.Icon src={ReportImage} />
            <S.Link>
              {report.name}
              <S.Arrow src={ArrowImage} />
            </S.Link>
          </S.Card>
        ))}
      </S.SideScroll>
    </S.Container>
  );
}
