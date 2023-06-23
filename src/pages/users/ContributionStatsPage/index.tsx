import useContributions from "hooks/apiHooks/useContributions";
import useQueryParams from "hooks/useQueryParams";
import * as S from "./styles";



function ContributionStatsPage(): JSX.Element {
  const queryParams = useQueryParams();
  const contributionId = queryParams.get("contribution_id");
  const { useContributionStats } = useContributions();
  
  const { data } = useContributionStats(Number(contributionId));
  console.log(data)
  return (
    <S.Container>
      {data && data.stats.initialAmount}
    </S.Container>
  );
}

export default ContributionStatsPage;