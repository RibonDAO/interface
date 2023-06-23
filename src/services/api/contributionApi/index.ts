import { AxiosResponse } from "axios";
import { apiGet } from "..";

const contributionsApi = {
  getContributions: (userId: number): Promise<AxiosResponse<any>> => apiGet(`users/${userId}/contributions`),
  getContributionStats: (
    userId: number,
    contributionId: number,
  ): Promise<AxiosResponse<any>> =>
    apiGet(`users/${userId}/contributions/${contributionId}`),
};

export default contributionsApi;