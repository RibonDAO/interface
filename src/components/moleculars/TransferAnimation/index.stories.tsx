import { ComponentStory, ComponentMeta } from "@storybook/react";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/supporters.svg";
import UserIcon from "assets/icons/user.svg";
import theme from "styles/theme";
import TransferAnimation, { Props } from ".";

export default {
  text: "TransferAnimation",
  textOrigin: "supportes",
  textDestiny: "user",
  iconOrigin: UserIcon,
  iconDestiny: SupportersIcon,
  icon: Ticket,
  visible: true,
  component: TransferAnimation,
} as ComponentMeta<typeof TransferAnimation>;

const Template: ComponentStory<typeof TransferAnimation> = function (
  args: Props,
) {
  return <TransferAnimation {...args} />;
};

export const Default = Template.bind({});
export const WithFullSizeDiamond = Template.bind({});
export const WithDifferentColor = Template.bind({});

Default.args = {
  text: "TransferAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: UserIcon,
  icon: Ticket,
};

WithFullSizeDiamond.args = {
  text: "TransferAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: "https://picsum.photos/500/500",
  icon: Ticket,
  isIconDestinyFullSize: true,
};

WithDifferentColor.args = {
  text: "TransferAnimation...",
  textOrigin: "Supporters",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: UserIcon,
  icon: Ticket,
  color: theme.colors.brand.secondary[400],
};
