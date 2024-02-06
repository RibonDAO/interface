import { ComponentStory, ComponentMeta } from "@storybook/react";
import TicketIconText, { Props } from ".";

export default {
  title: "TicketIconText",
  component: TicketIconText,
} as ComponentMeta<typeof TicketIconText>;

const Template: ComponentStory<typeof TicketIconText> = function (args: Props) {
  return <TicketIconText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  quantity: 10,
  onClick: () => {},
  buttonDisabled: false,
};
