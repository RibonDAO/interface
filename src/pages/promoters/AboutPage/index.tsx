// import { useEffect } from "react";
// import useAboutPageActivity from "hooks/useAboutPageActivity";
import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  // const { setHasSeenToday } = useAboutPageActivity();

  // useEffect(() => {
  //   setHasSeenToday();
  // }, []);

  const { currentLang } = useLanguage();

  const pageSlug = currentLang === "pt-BR" ? "beneficios" : "benefits";

  return (
    <S.Container
      src={`https://projetos.ribon.io/${pageSlug}`}
      title="Dia de doar"
      data-testid="about-page"
    />
  );
}

export default AboutPage;
