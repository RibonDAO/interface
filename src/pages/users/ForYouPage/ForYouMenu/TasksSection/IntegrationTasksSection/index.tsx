import { useIntegration } from "@ribon.io/shared/hooks";
import { useTasksContext } from "contexts/tasksContext";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useTasks } from "utils/constants/Tasks";
import * as S from "./styles";

function IntegrationTasksSection() {
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();
  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  return (
    <S.Container>
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

export default IntegrationTasksSection;
