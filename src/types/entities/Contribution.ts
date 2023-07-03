export type Contribution =
  | {
      name: string;
      description?: string;
      communityValue?: number;
      impact?: string;
      image: string;
      value: number;
      offerId: number;
      nonProfitId: number;
    }
  | undefined;
