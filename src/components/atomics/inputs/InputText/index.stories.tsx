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
    // eslint-disable-next-line no-console
    console.log(value);
  },
  icon: {
    name: "bolt",
    class: "left",
  },
  label: {
    text: "Input label",
    icon: {
      name: "g_translate",
      class: "left",
    },
  },
  helper: {
    text: "helper text",
    icon: {
      name: "error",
      class: "left",
    },
  },
  borderColor: { default: "#eb19c3", active: "#eb19c3" },
  textColor: "#eb19c3",
  status: "success",
};
