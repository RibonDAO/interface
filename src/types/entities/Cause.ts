import Pool from "./Pool";

export default interface Cause {
  id: number;
  name: string;
  mainImage?: string;
  active: boolean;
  pools: Pool[];
}
