import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import { useCallback, useEffect } from "react";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import ProgressBar from "components/atomics/ProgressBar";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import CardTopImage from "components/moleculars/cards/CardTopImage";
import SunIcon from "./assets/sun-icon.svg";
import BoltIcon from "./assets/bolt-icon.svg";
import EventIcon from "./assets/event-icon.svg";
import * as S from "./styles";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask, reload } = useTasksContext();

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

  const renderCountdown = () => {
    const countdown = useCountdown(nextDay(), reload);

    if (!tasksState) return null;
    if (!tasksState.length) return null;
    if (tasksState.filter((obj) => obj.done === false).length) return null;
    if (countdown.reduce((a, b) => a + b, 0) <= 0) return null;

    return (
      <S.TimerWrapper>
        <S.Countdown>{formatCountdown(countdown)}</S.Countdown>
        <p>{t("countdown")}</p>
      </S.TimerWrapper>
    );
  };

  const totalDailyTasksCompleted = () => {
    if (!tasksState) return 0;
    return tasksState.reduce((total, task) => total + task.timesCompleted, 0);
  };

  const renderStatisticsCards = () => (
    <S.StatisticsCardsContainer>
      {totalDailyTasksCompleted() > 0 && (
        <CardTopImage
          text="daily tasks completed"
          icon={SunIcon}
          title={totalDailyTasksCompleted().toString()}
          size="small"
        />
      )}
      <CardTopImage
        text="super tasks completed"
        icon={BoltIcon}
        title="0"
        size="small"
        textColor={theme.colors.brand.tertiary[900]}
        titleColor={theme.colors.brand.tertiary[900]}
      />
      <CardTopImage
        text="days in a row completing tasks "
        icon={EventIcon}
        title="0"
        size="small"
        textColor={theme.colors.brand.secondary[800]}
        titleColor={theme.colors.brand.secondary[800]}
      />
    </S.StatisticsCardsContainer>
  );

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

      <S.TitleContainer>
        <Icon
          name="light_mode"
          size="25px"
          color={theme.colors.brand.primary[900]}
        />
        <S.Title>{t("title")}</S.Title>
      </S.TitleContainer>
      {tasksState &&
        dailyTasks.map((task: any) => {
          if (!task.isVisible({ state: tasksState })) {
            return null;
          }
          return (
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
          );
        })}
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
      {renderStatisticsCards()}
    </S.Container>
  );
}

export default TasksSection;
