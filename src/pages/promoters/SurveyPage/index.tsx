import { useEffect } from "react";
import { useLanguage } from "hooks/useLanguage";
import { useTasksContext } from "contexts/tasksContext";
import Spinner from "components/atomics/Spinner";

function SurveyPage(): JSX.Element {
  const { currentLang } = useLanguage();
  const { registerAction } = useTasksContext();

  const formURLs = {
    "pt-BR": "https://forms.gle/kPEgCDSZXpMVxWCYA",
    en: "https://forms.gle/ARYKViNGJBchSrQg6",
  };

  const currentUrl = currentLang === "pt-BR" ? formURLs["pt-BR"] : formURLs.en;

  useEffect(() => {
    registerAction("survey_form_view");
    window.location.replace(currentUrl);
  }, []);

  return (
    <div data-testid="survey-page">
      <Spinner />
    </div>
  );
}

export default SurveyPage;
