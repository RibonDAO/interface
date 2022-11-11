import Pool from "./Pool";

export default interface Cause {
  id: number;
  name: string;
  active: boolean;
  pools: Pool[];
}
