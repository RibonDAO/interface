import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModalDoubleImage, { Props } from ".";

export default {
  title: "ModalDoubleImage",
  component: ModalDoubleImage,
} as ComponentMeta<typeof ModalDoubleImage>;

const Template: ComponentStory<typeof ModalDoubleImage> = function (
  args: Props,
) {
  return <ModalDoubleImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Title",
  primaryButton: {
    text: "first",
    onClick: () => "first",
  },
  visible: true,
  leftImage: "https://picsum.photos/200/300",
  rightImage: "https://picsum.photos/200/300",
  leftImageAlt: "leftImage",
  rightImageAlt: "rightImage",
  body: "A disciplina é a chama refinadora por meio da qual o talento se transforma em capacidade",
};
