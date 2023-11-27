import { useEffect } from "react";
import useAboutPageActivity from "hooks/useAboutPageActivity";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { setHasSeenToday } = useAboutPageActivity();

  useEffect(() => {
    setHasSeenToday();
  }, []);

  const pageSlug =
    "dia-de-doar?integration_id=6227d432-32ac-4a98-a14f-2f4a05c3ba4a&utm_source=ribon&utm_medium=navbar&utm_campaign=dia_de_doar";

  return (
    <S.Container
      src={`https://projetos.ribon.io/${pageSlug}`}
      title="Dia de doar"
      data-testid="about-page"
    />
  );
}

export default AboutPage;
