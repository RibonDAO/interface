import { ComponentStory, ComponentMeta } from "@storybook/react";
import icon from "assets/images/ticket.svg";
import ModalForm, { Props } from ".";

export default {
  title: "ModalForm",
  component: ModalForm,
} as ComponentMeta<typeof ModalForm>;

const Template: ComponentStory<typeof ModalForm> = function (args: Props) {
  return <ModalForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Title",
  primaryButton: {
    text: "first",
    onClick: () => "first",
  },
  secondaryButton: {
    text: "second",
    onClick: () => "second",
  },
  visible: true,
  icon,
  formFields: [
    {
      name: "email",
      id: "email",
      type: "email",
      placeholder: "E-mail",
      required: true,
    },
  ],
  onFormSubmit: () => {},
};
