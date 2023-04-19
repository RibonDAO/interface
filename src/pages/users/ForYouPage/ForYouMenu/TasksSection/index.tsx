import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import ProgressBar from "components/atomics/ProgressBar";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import * as S from "./styles";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState, reload } = useTasksContext();

  const progressBarValue = tasksState
    ? tasksState.filter((obj) => obj.done === true).length
    : 0;

  const renderCountdown = () => {
    const countdown = useCountdown(nextDay(), reload);

    const parseCountdown = (count: number[]) =>
      count
        .toString()
        .split(",")
        .map((part) => part.trim().padStart(2, "0"))
        .join(":");

    if (!tasksState) return null;
    if (!tasksState.length) return null;
    if (tasksState.filter((obj) => obj.done === false).length) return null;
    if (countdown.reduce((a, b) => a + b, 0) <= 0) return null;

    return (
      <S.TimerWrapper>
        <S.Countdown>{parseCountdown(countdown)}</S.Countdown>
        <p>{t("countdown")}</p>
      </S.TimerWrapper>
    );
  };

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar value={progressBarValue} min={0} max={dailyTasks.length} />
      </S.ProgressBar>
      {renderCountdown()}

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
