import { useTasksContext } from "contexts/tasksContext";
import { useTasks } from "utils/constants/Tasks";
import { useEffect } from "react";
import ProgressBar from "components/atomics/ProgressBar";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import * as S from "./styles";
import DailyTasksSection from "./DailyTasksSection";

function TasksSection() {
  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask } = useTasksContext();

  useEffect(() => {
    setHasCompletedATask(false);
  }, []);

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  const integrationId = useIntegrationId();

  const { integration } = useIntegration(integrationId);

  const progressBarValue = tasksState
    ? tasksState.filter((obj) => obj.done === true).length
    : 0;

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar value={progressBarValue} min={0} max={dailyTasks.length} />
      </S.ProgressBar>
      <DailyTasksSection />
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
    </S.Container>
  );
}

export default TasksSection;
