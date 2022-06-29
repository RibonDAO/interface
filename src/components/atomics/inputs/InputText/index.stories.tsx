import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputText, { Props } from ".";

export default {
  title: "InputText",
  component: InputText,
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = function (args: Props) {
  return <InputText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: "InputText",
  value: "value",
  placeholder: "placeholder",
  onChange: (value) => {
    console.log(value);
  },
};
