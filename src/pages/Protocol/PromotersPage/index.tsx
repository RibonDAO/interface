import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_PROMOTERS } from "services/graphQL/Queries";

interface Promoter {
  id: string;
  totalDonated: number;
}

function Promoters(): JSX.Element {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const { data } = useQuery(LOAD_PROMOTERS);

  useEffect(() => {
    if (data) {
      setPromoters(data.promoters);
    }
  }, [data]);

  return (
    <div>
      {promoters.map((promoter) => (
        <div key={promoter?.id}>
          <h3>Promoter address: {promoter?.id}</h3>
          <h4>Promoter total donated: {promoter?.totalDonated}</h4>
        </div>
      ))}
    </div>
  );
}

export default Promoters;
