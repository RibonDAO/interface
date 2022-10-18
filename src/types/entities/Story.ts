import NonProfit from "./NonProfit";

export default interface Story {
  id: number;
  title: string;
  description: string;
  position?: number;
  active?: boolean;
  image: string;
  nonProfit?: NonProfit;
}
