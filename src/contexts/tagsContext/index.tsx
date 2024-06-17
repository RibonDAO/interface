import { useTags } from "@ribon.io/shared/hooks";
import { createContext, useContext, useMemo } from "react";
import { Tag } from "@ribon.io/shared/types";

export interface ITagsContext {
  tags: Tag[];
  refetch: () => void;
  isLoading: boolean;
}

export const TagsContext = createContext<ITagsContext>({} as ITagsContext);
TagsContext.displayName = "TagsContext";

function TagsProvider({ children }: any) {
  const { tags, refetch, isLoading } = useTags();

  const tagsObject: ITagsContext = useMemo(
    () => ({
      tags,
      refetch,
      isLoading,
    }),
    [tags, refetch, isLoading],
  );

  return (
    <TagsContext.Provider value={tagsObject}>{children}</TagsContext.Provider>
  );
}

export default TagsProvider;

export function useTagsContext() {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error("useTagsContext must be used within a TagsProvider");
  }

  return context;
}
