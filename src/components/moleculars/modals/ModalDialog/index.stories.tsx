import { ComponentStory, ComponentMeta } from "@storybook/react";

import ModalDialog, { Props } from ".";

export default {
  title: "ModalDialog",
  component: ModalDialog,
} as ComponentMeta<typeof ModalDialog>;

const Template: ComponentStory<typeof ModalDialog> = function (args: Props) {
  return <ModalDialog {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Title",
  type: "info", // "error" | "warning" | "info
  primaryButton: {
    text: "first",
    onClick: () => "first",
  },
  secondaryButton: {
    text: "second",
    onClick: () => "second",
  },
  visible: true,
  description:
    "A disciplina é a chama refinadora por meio da qual o talento se transforma em capacidade",
};
