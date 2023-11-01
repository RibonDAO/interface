import { useEffect } from "react";
import { useTasksContext } from "contexts/tasksContext";

function CampaignPage() {
  const { registerAction } = useTasksContext();
  useEffect(() => {
    window.location.replace(
      "https://projetos.ribon.io/dia-das-criancas?integration_id=f9fe883e-cc90-46d1-be35-69e0f7d5b7c6&offer=1000&target=non_profit&target_id=10&currency=BRL&subscription=false&utm_source=app&utm_medium=task&utm_campaign=dia_das_criancas",
    );

    registerAction("campaign_page_view");
  }, []);

  return <div />;
}

export default CampaignPage;
