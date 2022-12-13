import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardCroppedImage, { Props } from ".";

export default {
  title: "CardCroppedImage",
  component: CardCroppedImage,
} as ComponentMeta<typeof CardCroppedImage>;

const Template: ComponentStory<typeof CardCroppedImage> = function (args: Props) {
  return <CardCroppedImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  mainText: "9999",
  secondaryText: "CardCroppedImage",
  image: "https://s2.glbimg.com/2UBMGRs01DSMHsfaFz-7aIMOYVQ=/e.glbimg.com/og/ed/f/original/2019/02/25/oscar_wilde_sarony.jpg",
};
