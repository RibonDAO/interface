import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import { useEffect } from "react";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

function DailyTasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask } = useTasksContext();

  useEffect(() => {
    setHasCompletedATask(false);
  }, []);

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
                text={t(`tasks.${task?.title}`)}
                sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
                lineThroughOnChecked
                navigationCallback={
                  !tasksState.find((obj) => obj.id === task.id)?.done
                    ? task?.navigationCallback
                    : undefined
                }
                disabled
                checked={tasksState.find((obj) => obj.id === task.id)?.done}
              />
            </S.CheckboxContainer>
          ) : null,
        )}
    </S.Container>
  );
}

export default DailyTasksSection;
