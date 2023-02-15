import { AxiosResponse } from "axios";
import { Story } from "@ribon.io/shared/types";
import { apiGet } from "..";

const storiesApi = {
  getNonProfitStories: (id: number | string): Promise<AxiosResponse<Story[]>> =>
    apiGet(`non_profits/${id}/stories`),
};

export default storiesApi;
