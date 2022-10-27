import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import InputRange, { Props } from ".";

export default {
  title: "InputRange",
  component: InputRange,
} as ComponentMeta<typeof InputRange>;

const Template: ComponentStory<typeof InputRange> = function (args: Props) {
  const [index, setIndex] = React.useState(0);
  return (
    <InputRange
      {...args}
      value={index}
      onChange={(e) => setIndex(e.target.value)}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  min: 0,
  max: 100,
  step: 1,
};
