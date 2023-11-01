import { AxiosResponse } from "axios";
import ImpressionCard from "types/entities/ImpressionCard";
import { apiGet } from "..";

const impressionCardsApi = {
  getImpressionCard: (id: any): Promise<AxiosResponse<ImpressionCard>> =>
    apiGet(`impression_cards/${id}`),
};

export default impressionCardsApi;
