import { useLanguage } from "hooks/useLanguage";
import {
  getUTMFromLocationSearch,
  utmParamsToString,
} from "lib/getUTMFromLocationSearch";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { currentLang } = useLanguage();
  const { history } = useNavigation();
  const utmParams = getUTMFromLocationSearch(history.location.search);

  const pageUrl = () => {
    const baseUrl = "https://projetos.ribon.io/";
    const pageSlug =
      currentLang === "pt-BR" ? "ganhe-tickets" : "en/ganhe-tickets";
    const queryParams = utmParamsToString(utmParams);

    return `${baseUrl}${pageSlug}?${queryParams}`;
  };

  return (
    <S.Container src={pageUrl()} title="Download" data-testid="about-page" />
  );
}

export default AboutPage;
