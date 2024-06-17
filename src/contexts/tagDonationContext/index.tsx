import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Tag } from "@ribon.io/shared/types";
import { useTagsContext } from "contexts/tagsContext";

export interface ITagDonationContext {
  chosenTag: Tag | undefined;
  chosenTagIndex: number | undefined;
  setChosenTag: (tag: SetStateAction<Tag | undefined>) => void;
  setChosenTagId: (id: SetStateAction<number | undefined>) => void;
  setChosenTagIndex: (id: SetStateAction<number | undefined>) => void;
}

export const TagDonationContext = createContext<ITagDonationContext>(
  {} as ITagDonationContext,
);
TagDonationContext.displayName = "TagDonationContext";

function TagDonationProvider({ children }: any) {
  const { tags } = useTagsContext();

  const [chosenTag, setChosenTag] = useState<Tag | undefined>();
  const [chosenTagId, setChosenTagId] = useState<number | undefined>();
  const [chosenTagIndex, setChosenTagIndex] = useState<number | undefined>(0);

  useEffect(() => {
    if (chosenTagId) {
      setChosenTag(tags.find((tag) => tag.id === chosenTagId));
    }
  }, [chosenTagId]);

  const TagDonationObject: ITagDonationContext = useMemo(
    () => ({
      chosenTag,
      setChosenTag,

      setChosenTagId,
      chosenTagIndex,
      setChosenTagIndex,
    }),
    [
      chosenTag,
      setChosenTag,
      setChosenTagId,
      chosenTagIndex,
      setChosenTagIndex,
    ],
  );

  return (
    <TagDonationContext.Provider value={TagDonationObject}>
      {children}
    </TagDonationContext.Provider>
  );
}

export default TagDonationProvider;

export function useTagDonationContext() {
  const context = useContext(TagDonationContext);

  if (!context) {
    throw new Error(
      "useTagDonationContext must be used within a TagDonationProvider",
    );
  }

  return context;
}
