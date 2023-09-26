import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import { useEffect } from "react";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import { logEvent } from "lib/events";
import * as S from "./styles";
import IntegrationTasksSection from "../IntegrationTasksSection";

function DailyTasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask } = useTasksContext();

  useEffect(() => {
    setHasCompletedATask(false);
  }, []);

  function downloadAppClick(taskId: string) {
    if (taskId === "9177df10-8e93-4938-b2fb-e04b138127f7") {
      logEvent("downloadCTA_click", { from: "tasks" });
    }
  }

  return (
    <S.Container>
      <S.TitleContainer>
        <Icon
          name="light_mode"
          size="25px"
          color={theme.colors.brand.primary[900]}
        />
        <S.Title>{t("title")}</S.Title>
      </S.TitleContainer>
      {tasksState &&
        dailyTasks.map((task) =>
          task.isVisible({ state: tasksState }) ? (
            <S.CheckboxContainer key={task.id}>
              <CheckBox
                key={task.id}
                onClick={() => downloadAppClick(task.id)}
                text={t(`tasks.${task?.title}`)}
                sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
                lineThroughOnChecked
                navigationCallback={
                  !tasksState.find((obj) => obj.id === task.id)?.done
                    ? task?.navigationCallback
                    : undefined
                }
                state={
                  !tasksState.find((obj) => obj.id === task.id)?.done
                    ? task?.state
                    : undefined
                }
                disabled
                checked={tasksState.find((obj) => obj.id === task.id)?.done}
              />
            </S.CheckboxContainer>
          ) : null,
        )}
      <IntegrationTasksSection />
    </S.Container>
  );
}

export default DailyTasksSection;
