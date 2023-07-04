import { useCauses, useNonProfits } from "@ribon.io/shared/hooks";
import { Cause, NonProfit } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";

const usePayable = (type: string | null, id: string | null) => {
  const [currentPayable, setCurrentPayable] = useState<
    NonProfit | Cause | undefined
  >();

  const { nonProfits } = useNonProfits();
  const { causes } = useCauses();

  useEffect(() => {
    if (!nonProfits || !causes) return;

    if (type === "cause") {
      setCurrentPayable(causes.find((cause) => cause.id === Number(id)));
    } else if (type === "non_profit") {
      setCurrentPayable(
        (nonProfits || []).find((nonProfit) => nonProfit.id === Number(id)),
      );
    }
  }, [type, id, causes, nonProfits]);

  return currentPayable as NonProfit | Cause | undefined;
};

export default usePayable;
