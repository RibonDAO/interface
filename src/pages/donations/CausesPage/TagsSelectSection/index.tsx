import GroupButtons from "components/moleculars/sections/GroupButtons";
import { useTagDonationContext } from "contexts/tagDonationContext";
import { useTagsContext } from "contexts/tagsContext";
import { useTranslation } from "react-i18next";

function TagsSelectSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { setChosenTag, chosenTagIndex, setChosenTagIndex } =
    useTagDonationContext();
  const { tags } = useTagsContext();

  const handleTagChanged = (_element: any, index: number, event: any) => {
    if (_element && event?.type === "click") {
      const tag = _element;
      setChosenTagIndex(index);
      if (tag.id !== 0) {
        setChosenTag(tag);
      } else {
        setChosenTag(undefined);
      }
    }
  };

  const tagsWithAllFilter = [
    {
      id: 0,
      name: t("allTags"),
    },
    ...(tags || []),
  ];

  return (
    <GroupButtons
      elements={tagsWithAllFilter}
      indexSelected={chosenTagIndex}
      onChange={handleTagChanged}
      nameExtractor={(tag) => tag.name}
    />
  );
}

export default TagsSelectSection;
