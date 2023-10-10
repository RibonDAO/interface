import { isFirstAccess } from "lib/onboardingFirstAccess";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import { useCausesContext } from "contexts/causesContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";

function CausesSelectSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseDonationContext();
  const { causesWithPoolBalance } = useCausesContext();
  const { signedIn } = useCurrentUser();

  const handleCauseChanged = (_element: any, index: number, event: any) => {
    if (_element && event?.type === "click") {
      const cause = _element;
      setChosenCauseIndex(index);
      if (cause.id !== 0) {
        setChosenCause(cause);
      } else {
        setChosenCause(undefined);
      }
    }
  };

  const causesWithAllFilter = [
    {
      id: 0,
      name: t("allCauses"),
    },
    ...(causesWithPoolBalance || []),
  ];

  if (isFirstAccess(signedIn)) return <div />;

  return (
    <GroupButtons
      elements={causesWithAllFilter}
      indexSelected={chosenCauseIndex}
      onChange={handleCauseChanged}
      nameExtractor={(cause) => cause.name}
    />
  );
}

export default CausesSelectSection;
