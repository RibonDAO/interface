import { Cause } from "@ribon.io/shared/types";

function causeFactory(params: Partial<Cause> = {}): Cause {
  const defaultValues: Cause = {
    id: 1,
    name: "🐵 Animal",
    status: "active",
    pools: [],
  };
  return Object.assign(defaultValues, params) as Cause;
}

export default causeFactory;
