import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NonProfit, Tag } from "@ribon.io/shared/types";
import { useNonProfitsContext } from "contexts/nonProfitsContext";

export interface ITagDonationContext {
  chosenTag: Tag | undefined;
  chosenTagIndex: number | undefined;
  setChosenTag: (tag: SetStateAction<Tag | undefined>) => void;
  setChosenTagIndex: (id: SetStateAction<number | undefined>) => void;
  nonProfitsTag: NonProfit[] | undefined;
}

export const TagDonationContext = createContext<ITagDonationContext>(
  {} as ITagDonationContext,
);
TagDonationContext.displayName = "TagDonationContext";

function TagDonationProvider({ children }: any) {
  const [chosenTag, setChosenTag] = useState<Tag | undefined>();
  const [chosenTagIndex, setChosenTagIndex] = useState<number | undefined>(0);
  const { filteredNonProfits } = useNonProfitsContext();
  const [nonProfits, setNonProfits] = useState<NonProfit[] | undefined>(
    filteredNonProfits,
  );

  useEffect(() => {
    if (chosenTag) {
      setNonProfits(chosenTag?.nonProfits);
    } else {
      setNonProfits(filteredNonProfits);
    }
  }, [chosenTag, filteredNonProfits]);

  const TagDonationObject: ITagDonationContext = useMemo(
    () => ({
      chosenTag,
      setChosenTag,
      chosenTagIndex,
      setChosenTagIndex,
      nonProfitsTag: nonProfits,
    }),
    [chosenTag, setChosenTag, chosenTagIndex, setChosenTagIndex, nonProfits],
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
