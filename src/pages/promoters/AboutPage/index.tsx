import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { currentLang } = useLanguage();

  const pageSlug = currentLang === "pt-BR" ? "sobre" : "about";

  return (
    <S.Container
      src={`https://projetos.ribon.io/${pageSlug}`}
      title="Sobre a Ribon"
      data-testid="about-page"
    />
  );
}

export default AboutPage;
