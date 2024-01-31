import { ComponentStory, ComponentMeta } from "@storybook/react";
import SliderButton, { Props } from ".";

export default {
  title: "SliderButton",
  component: SliderButton,
} as ComponentMeta<typeof SliderButton>;

const Template: ComponentStory<typeof SliderButton> = function (args: Props) {
  return <SliderButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  rangeSize: 10,
  setValue: (value: number) => console.log(value),
};
