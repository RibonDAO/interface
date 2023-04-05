import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();

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
        tasksState.map((task) => {
          const currentTask = dailyTasks.find(
            (taskObj) => taskObj.id === task.id,
          );

          return (
            <S.CheckboxContainer key={task.id}>
              <CheckBox
                key={task.id}
                text={t(`tasks.${currentTask?.title}`)}
                sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
                lineThroughOnChecked
                navigationCallback={
                  !task.done ? currentTask?.navigationCallback : undefined
                }
                disabled
                checked={task.done}
              />
            </S.CheckboxContainer>
          );
        })}

      {(!tasksState || !tasksState.length) &&
        dailyTasks.map((task) => (
          <S.CheckboxContainer key={task.id}>
            <CheckBox
              key={task.id}
              text={t(`tasks.${task?.title}`)}
              sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
              lineThroughOnChecked
              navigationCallback={task?.navigationCallback}
              disabled
              checked={false}
            />
          </S.CheckboxContainer>
        ))}
    </S.Container>
  );
}

export default TasksSection;
