import { ComponentStory, ComponentMeta } from "@storybook/react";
import icon from "assets/images/newspaper.svg";
import ModalIcon, { Props } from ".";

export default {
  title: "ModalIcon",
  component: ModalIcon,
} as ComponentMeta<typeof ModalIcon>;

const Template: ComponentStory<typeof ModalIcon> = function (args: Props) {
  return <ModalIcon {...args} />;
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
  body: "A disciplina é a chama refinadora por meio da qual o talento se transforma em capacidade",
};
