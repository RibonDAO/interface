import { ComponentStory, ComponentMeta } from "@storybook/react";
import Ticket from "assets/icons/ticket.svg";
import SupportersIcon from "assets/icons/supporters.svg";
import UserIcon from "assets/icons/user.svg";
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

Default.args = {
  text: "ModalAnimation...",
  textOrigin: "Supportes",
  textDestiny: "User",
  iconOrigin: SupportersIcon,
  iconDestiny: UserIcon,
  icon: Ticket,
  visible: true,
};
