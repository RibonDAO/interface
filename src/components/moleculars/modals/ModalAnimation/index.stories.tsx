import { ComponentStory, ComponentMeta } from "@storybook/react";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/supporters.svg";
import UserIcon from "assets/icons/user.svg";
import theme from "styles/theme";
import ModalAnimation, { Props } from ".";

export default {
  text: "ModalAnimation",
  textOrigin: "supportes",
  textDestiny: "user",
  iconOrigin: UserIcon,
  iconDestiny: SupportersIcon,
  icon: Ticket,
  visible: true,
  component: ModalAnimation,
} as ComponentMeta<typeof ModalAnimation>;

const Template: ComponentStory<typeof ModalAnimation> = function (args: Props) {
  return <ModalAnimation {...args} />;
};

export const Default = Template.bind({});
export const WithFullSizeDiamond = Template.bind({});
export const WithDifferentColor = Template.bind({});

Default.args = {
  text: "ModalAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: UserIcon,
  icon: Ticket,
  visible: true,
};

WithFullSizeDiamond.args = {
  text: "ModalAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: "https://picsum.photos/500/500",
  icon: Ticket,
  visible: true,
  isIconDestinyFullSize: true,
};

WithDifferentColor.args = {
  text: "ModalAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: UserIcon,
  icon: Ticket,
  visible: true,
  color: theme.colors.brand.secondary[400],
};
