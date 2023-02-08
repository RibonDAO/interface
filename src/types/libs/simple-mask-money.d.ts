declare module "simple-mask-money" {
  export function formatToNumber(value: string): number;
  export function setMask(id: string, args: any): void;
}
