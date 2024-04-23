import { useTasksContext } from "contexts/tasksContext";
import { useTasks } from "utils/constants/Tasks";
import { useCallback, useEffect } from "react";
import ProgressBar from "components/atomics/ProgressBar";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import CardPartners from "components/moleculars/cards/CardPartners";
import { useTasksStatistics } from "@ribon.io/shared/hooks";
import * as S from "./styles";
import DailyTasksSection from "./DailyTasksSection";
import MonthlyTasksSection from "./MonthlyTasksSection";
import StatisticsCardsSection from "./StatisticsCardsSection";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });
  useEffect(() => {
    logEvent("P21_view");
  }, []);

  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask, reload, tasksStatistics } =
    useTasksContext();

  const tasksCount = useCallback(() => {
    if (!tasksState) return 0;
    if (!tasksState.length) return 0;

    const count = dailyTasks.filter((task: any) => {
      const tasks = task.isVisible({ state: tasksState });
      return tasks;
    });

    return count.length;
  }, [tasksState]);

  useEffect(() => {
    setHasCompletedATask(false);
  }, []);

  const { refetchTasksStatistics } = useTasksStatistics();

  const progressBarValue = () => {
    const tasks = dailyTasks.map((visibleTask: any) => {
      const completedTasks = tasksState.find(
        (completedTask: any) => completedTask.id === visibleTask.id,
      );
      return { ...visibleTask, ...completedTasks };
    });
    return tasks.filter(
      (task: any) => task.done && task.isVisible({ state: tasksState }),
    );
  };

  const showMonthlyTasks = useCallback(() => {
    if (!tasksStatistics) return false;
    if (tasksStatistics.contributor) return true;
    if (tasksStatistics.firstCompletedAllTasksAt) return true;

    return false;
  }, [tasksState, tasksStatistics]);

  useEffect(() => {
    refetchTasksStatistics();
  }, [tasksStatistics, refetchTasksStatistics]);

  useEffect(() => {
    reload();
  }, []);

  const renderCountdown = () => {
    const countdown = useCountdown(nextDay(), reload);

    if (!tasksState) return null;
    if (!tasksState.length) return null;
    if (
      tasksState.filter((obj) => obj.done === false && obj.type === "daily")
        .length
    )
      return null;
    if (countdown.reduce((a, b) => a + b, 0) <= 0) return null;

    return (
      <S.TimerWrapper>
        <S.Countdown>{formatCountdown(countdown)}</S.Countdown>
        <p>{t("countdown")}</p>
      </S.TimerWrapper>
    );
  };

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar
          value={progressBarValue().length}
          min={0}
          max={tasksCount() || dailyTasks.length}
        />
      </S.ProgressBar>
      {renderCountdown()}

      <S.TasksContainer>
        <S.TaskColumn>
          <DailyTasksSection />
          <CardPartners />
        </S.TaskColumn>
        <S.TaskColumn>
          {showMonthlyTasks() && <MonthlyTasksSection />}
        </S.TaskColumn>
      </S.TasksContainer>

      <StatisticsCardsSection />
    </S.Container>
  );
}

export default TasksSection;
