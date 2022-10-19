import { AxiosResponse } from "axios";
import Story from "types/entities/Story";
import { apiGet } from "..";

const storiesApi = {
  getNonProfitStories: (id: number | string): Promise<AxiosResponse<Story[]>> =>
    apiGet(`non_profits/${id}/stories`),
};

export default storiesApi;
