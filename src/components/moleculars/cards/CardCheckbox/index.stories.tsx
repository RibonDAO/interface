import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardCheckbox, { Props } from ".";

export default {
  title: "CardCheckbox",
  component: CardCheckbox,
} as ComponentMeta<typeof CardCheckbox>;

const Template: ComponentStory<typeof CardCheckbox> = function (args: Props) {
  return <CardCheckbox {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  tagText: "More popular",
  firstDescription: "firstDescription",
  firstIconName: "confirmation_number",
  secondDescription: "secondDescription",
  secondIconName: "box",
  value: "R$12,45",
  recurrence: "month",
};
