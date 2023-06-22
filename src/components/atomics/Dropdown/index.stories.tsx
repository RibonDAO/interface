import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropdown, { Props } from ".";

export default {
  title: "Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = function (args: Props) {
  return <Dropdown {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: "Dropdown",
  values: ["value1", "value2", "value3"],
  label: "dropdown",
  onOptionChanged: (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
};
