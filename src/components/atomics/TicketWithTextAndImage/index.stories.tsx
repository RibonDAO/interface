import { ComponentStory, ComponentMeta } from "@storybook/react";
import logo from "assets/icons/logo.svg";
import TicketWithTextAndImage, { Props } from ".";

export default {
  title: "TicketWithTextAndImage",
  component: TicketWithTextAndImage,
} as ComponentMeta<typeof TicketWithTextAndImage>;

const Template: ComponentStory<typeof TicketWithTextAndImage> = function (
  args: Props,
) {
  return <TicketWithTextAndImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "TicketWithTextAndImage",
  subtitle: "Subtitle",
  image: logo,
  link: "https://github.com/RibonDAO/interface",
};
