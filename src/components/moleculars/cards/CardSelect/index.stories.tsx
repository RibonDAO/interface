import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardSelect, { Props } from ".";

export default {
  title: "CardSelect",
  component: CardSelect,
} as ComponentMeta<typeof CardSelect>;

const Template: ComponentStory<typeof CardSelect> = function (args: Props) {
  return <CardSelect {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  dropdownProps: {
    values: ["Non Profit 1", "Non Profit 2"],
    name: "non profits",
    label: "Non Profits",
  },
  children: <div>children</div>,
};
