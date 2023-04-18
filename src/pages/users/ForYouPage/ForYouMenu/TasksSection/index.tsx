import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import ProgressBar from "components/atomics/ProgressBar";
import * as S from "./styles";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();

  const progressBarValue = tasksState
    ? tasksState.filter((obj) => obj.done === true).length
    : 0;

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar value={progressBarValue} min={0} max={dailyTasks.length} />
      </S.ProgressBar>

      <S.TitleContainer>
        <Icon
          name="light_mode"
          size="25px"
          color={theme.colors.brand.primary[900]}
        />
        <S.Title>{t("title")}</S.Title>
      </S.TitleContainer>
      {tasksState &&
        dailyTasks.map((task) => (
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
        ))}
    </S.Container>
  );
}

export default TasksSection;
