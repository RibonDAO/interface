import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonRound, { Props } from ".";

export default {
  title: "ButtonRound",
  component: ButtonRound,
} as ComponentMeta<typeof ButtonRound>;

const Template: ComponentStory<typeof ButtonRound> = function (args: Props) {
  return <ButtonRound {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "ButtonRound",
};
