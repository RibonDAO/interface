import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardRoundDoubleImage, { Props } from ".";

export default {
  title: "CardRoundDoubleImage",
  component: CardRoundDoubleImage,
} as ComponentMeta<typeof CardRoundDoubleImage>;

const Template: ComponentStory<typeof CardRoundDoubleImage> = function (
  args: Props,
) {
  return <CardRoundDoubleImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  leftImage: "https://picsum.photos/200/300",
  rightImage: "https://picsum.photos/200/300",
  leftImageAlt: "leftImage",
  rightImageAlt: "rightImage",
};
