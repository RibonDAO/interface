import Pool from "./Pool";

export default interface Cause {
  id: number;
  name: string;
  mainImage?: string;
  coverImage?: string;
  active: boolean;
  pools: Pool[];
}
