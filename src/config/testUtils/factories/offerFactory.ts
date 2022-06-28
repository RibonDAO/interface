import Offer from "types/entities/Offer";

function offerFactory(params: Partial<Offer> = {}): Offer {
  const defaultValues: Offer = {
    id: 1,
    active: true,
    currency: "usd",
    positionOrder: 0,
    price: "$10.00",
    priceCents: 1000,
    priceValue: 10.0,
    subscription: true,
    title: "",
    createdAt: "2022-06-27 19:31:48 UTC",
    updatedAt: "2022-06-27 19:31:48 UTC",
  };
  return Object.assign(defaultValues, params) as Offer;
}

export default offerFactory;
