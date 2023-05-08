export default interface Notification {
  id?: number;
  message: string;
  type: "success" | "error" | "warning" | "info" | "custom";
  link?: string;
  timeout?: number;
  linkMessage?: string;
  icon?: string;
  iconColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center"
    | "bottom";
  onClose?: () => void;
  closeButton?: boolean;
  navigate?: string;
}
