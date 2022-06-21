import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputAutoComplete, { Props } from ".";

export default {
  title: "InputAutoComplete",
  component: InputAutoComplete,
} as ComponentMeta<typeof InputAutoComplete>;

const Template: ComponentStory<typeof InputAutoComplete> = function (
  args: Props,
) {
  return <InputAutoComplete {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: "name",
  suggestions: ["InputAutoComplete"],
  placeholder: "InputAutoComplete",
};
