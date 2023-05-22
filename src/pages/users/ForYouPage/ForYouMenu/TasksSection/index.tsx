import { useTasksContext } from "contexts/tasksContext";
import { useTasks } from "utils/constants/Tasks";
import { useCallback, useEffect } from "react";
import ProgressBar from "components/atomics/ProgressBar";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration, useTasksStatistics } from "@ribon.io/shared/hooks";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";
import DailyTasksSection from "./DailyTasksSection";
import MonthlyTasksSection from "./MonthlyTasksSection";
import StatisticsCardsSection from "./StatisticsCardsSection";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

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

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  const integrationId = useIntegrationId();

  const { integration } = useIntegration(integrationId);
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

      {integration?.integrationTask &&
        tasksState.find((obj) => obj.id === donateTicketTask?.id)?.done && (
          <S.IntegrationContainer>
            <S.RightContainer>
              <S.Image src={integration?.logo} alt="logo" />
            </S.RightContainer>
            <S.LeftContainer>
              <S.IntegrationTitle>
                {integration?.integrationTask.description}
              </S.IntegrationTitle>
              <S.Link
                href={integration?.integrationTask.linkAddress}
                target="_blank"
                rel="noreferrer"
              >
                {integration?.integrationTask.link}
              </S.Link>
            </S.LeftContainer>
          </S.IntegrationContainer>
        )}
      <StatisticsCardsSection />
    </S.Container>
  );
}

export default TasksSection;
