import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_NON_PROFITS } from "services/graphQL/Queries";

interface NonProfit {
  id: string;
  isNonProfitOnWhitelist: boolean;
}

function NonProfits(): JSX.Element {
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([]);
  const { data } = useQuery(LOAD_NON_PROFITS);

  useEffect(() => {
    if (data) {
      setNonProfits(data.nonProfits);
    }
  }, [data]);

  return (
    <div>
      {nonProfits.map((nonProfit) => (
        <div key={nonProfit?.id}>
          <h3>NonProfit address: {nonProfit?.id}</h3>
          <h4>
            NonProfit is on whitelist: {nonProfit?.isNonProfitOnWhitelist}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default NonProfits;
