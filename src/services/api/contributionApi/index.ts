import { AxiosResponse } from "axios";
import { apiGet } from "..";

const contributionsApi = {
  getContributions: (userId: number): Promise<AxiosResponse<any>> =>
    apiGet(`users/${userId}/contributions`),
  getLabelableContributions: (userId: number): Promise<AxiosResponse<any>> =>
    apiGet(`users/${userId}/labelable_contributions`),
  getContributionStats: (
    userId: number,
    contributionId: number,
  ): Promise<AxiosResponse<any>> =>
    apiGet(`users/${userId}/contributions/${contributionId}`),
};

export default contributionsApi;
