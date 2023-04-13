export default interface Notification {
  id?: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  link?: string;
  timeout?: number;
  linkMessage?: string;
  icon?: string;
  iconColor?: string;
  backgroundColor?: string;
  textColor?: string;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  onClose?: () => void;
}
