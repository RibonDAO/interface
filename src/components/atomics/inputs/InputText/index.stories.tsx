import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlobeIcon from "assets/icons/globe-icon.svg";
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
  icon: {
    url: GlobeIcon,
    class: "left",
  },
  label: {
    text: "Input label",
    icon: {
      url: GlobeIcon,
      class: "left",
    },
  },
  helper: {
    text: "helper text",
    icon: {
      url: GlobeIcon,
      class: "left",
    },
  },
  borderColor: { default: "#eb19c3", active: "#eb19c3" },
  textColor: "#eb19c3",
};
