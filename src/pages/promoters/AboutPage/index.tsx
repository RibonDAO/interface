import { useEffect } from "react";
import useAboutPageActivity from "hooks/useAboutPageActivity";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { setHasSeenToday } = useAboutPageActivity();

  useEffect(() => {
    setHasSeenToday();
  }, []);

  const pageSlug = "dia-de-doar";

  return (
    <S.Container
      src={`https://projetos.ribon.io/${pageSlug}`}
      title="Dia de doar"
      data-testid="about-page"
    />
  );
}

export default AboutPage;
