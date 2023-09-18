import { useEffect } from "react";
import { useTasksContext } from "contexts/tasksContext";
import { TASKS } from "utils/constants/Tasks";
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

  return (
    <S.Container src="https://projetos.ribon.io/sobre" title="Sobre a Ribon" />
  );
}

export default AboutPage;
