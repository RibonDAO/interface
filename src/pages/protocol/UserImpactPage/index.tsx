import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USER_IMPACT } from "services/graphQL/Queries";

interface DonationBalance {
  id: string;
  integration: string;
  nonProfit: string;
  totalDonated: number;
  user: string;
}

function UserImpactPage(): JSX.Element {
  const [donationBalances, setDonationBalances] = useState<DonationBalance[]>(
    [],
  );
  const { data } = useQuery(LOAD_USER_IMPACT);

  useEffect(() => {
    if (data) {
      setDonationBalances(data.donationBalances);
      console.log(data);
      console.log(data.donationBalances);
    }
  }, [data]);

  function totalDonatedByNonProfit() {
    let totalDonated = 0;

    donationBalances.forEach((donationBalance) => {
      totalDonated += donationBalance.totalDonated;
    });

    return totalDonated;
  }

  return (
    <div>
      {donationBalances.map((donationBalance) => (
        <div key={donationBalance?.id}>
          <h4>Total donated by Non Profit {donationBalance?.nonProfit}:</h4>
          <h4>{totalDonatedByNonProfit()}</h4>
        </div>
      ))}
    </div>
  );
}

export default UserImpactPage;
