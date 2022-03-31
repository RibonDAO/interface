import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTopImage, { Props } from ".";

export default {
  title: "CardTopImage",
  component: CardTopImage,
} as ComponentMeta<typeof CardTopImage>;

const Template: ComponentStory<typeof CardTopImage> = function (args: Props) {
  return <CardTopImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  imageUrl: "https://picsum.photos/id/237/200/300",
  imageAlt: "Image",
  text: "Você doou 99 dias de ração para animais resgatados",
};
