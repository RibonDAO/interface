import { useTasksContext } from "contexts/tasksContext";
import { useTasks } from "utils/constants/Tasks";
import { useCallback, useEffect } from "react";
import ProgressBar from "components/atomics/ProgressBar";
import useBreakpoint from "hooks/useBreakpoint";
import { logEvent } from "lib/events";
import { useTasksStatistics } from "@ribon.io/shared/hooks";
import * as S from "./styles";
import DailyTasksSection from "./DailyTasksSection";
import MonthlyTasksSection from "./MonthlyTasksSection";
import StatisticsCardsSection from "./StatisticsCardsSection";
import CountdownSection from "./CountdownSection";

function TasksSection() {
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
  const { isMobile } = useBreakpoint();

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

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar
          value={progressBarValue().length}
          min={0}
          max={tasksCount() || dailyTasks.length}
        />
      </S.ProgressBar>

      <CountdownSection />

      {!isMobile && (
        <S.TasksContainer>
          <DailyTasksSection />
          {showMonthlyTasks() && <MonthlyTasksSection />}
        </S.TasksContainer>
      )}

      {isMobile && (
        <>
          <DailyTasksSection />
          {showMonthlyTasks() && <MonthlyTasksSection />}
        </>
      )}

      <StatisticsCardsSection />
    </S.Container>
  );
}

export default TasksSection;
