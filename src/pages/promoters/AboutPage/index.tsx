import { useEffect } from "react";
import useAboutPageActivity from "hooks/useAboutPageActivity";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { setHasSeenToday } = useAboutPageActivity();

  useEffect(() => {
    setHasSeenToday();
  }, []);

  return (
    <S.Container src="https://projetos.ribon.io/sobre" title="Sobre a Ribon" />
  );
}

export default AboutPage;
