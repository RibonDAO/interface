import { useEffect } from "react";
import { useTasksContext } from "contexts/tasksContext";
import { TASKS } from "utils/constants/Tasks";
import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";

function AboutPage(): JSX.Element {
  const { registerAction, tasksState } = useTasksContext();

  useEffect(() => {
    const pageViewTask = TASKS.filter(
      (task) => task.title === "about_page_view",
    )[0];

    const done = tasksState?.find(
      (task) => task?.id === pageViewTask?.id,
    )?.done;

    if (!done) {
      registerAction("about_page_view");
    }
  }, []);

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
