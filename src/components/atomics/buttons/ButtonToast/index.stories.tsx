import { ComponentStory, ComponentMeta } from "@storybook/react";
import MoreTicketsIcon from "assets/icons/more-tickets-icon-orange.svg";
import ButtonToast, { Props } from ".";

export default {
  title: "ButtonToast",
  component: ButtonToast,
} as ComponentMeta<typeof ButtonToast>;

const Template: ComponentStory<typeof ButtonToast> = function (args: Props) {
  return <ButtonToast {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Baixar aplicativo",
  onClick: () => {},
  leftIcon: MoreTicketsIcon,
};
