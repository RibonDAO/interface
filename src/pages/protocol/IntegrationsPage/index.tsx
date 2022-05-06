import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_INTEGRATIONS } from "services/graphQL/Queries";
import { ethers } from "ethers";

interface Integration {
  id: string;
  balance: number;
}

function Integrations(): JSX.Element {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const { data } = useQuery(LOAD_INTEGRATIONS);

  useEffect(() => {
    if (data) {
      setIntegrations(data.integrations);
    }
  }, [data]);

  return (
    <div>
      {integrations.map((integration) => (
        <div key={integration?.id}>
          <h3>Integration address: {integration?.id}</h3>
          <h4>Balance: {ethers.utils.formatEther(integration?.balance)}</h4>
        </div>
      ))}
    </div>
  );
}

export default Integrations;
