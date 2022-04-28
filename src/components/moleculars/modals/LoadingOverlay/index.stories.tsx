import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import LoadingOverlay, { Props } from ".";

export default {
  title: "LoadingOverlay",
  component: LoadingOverlay,
} as Meta;

const Template: Story<Props> = function (args: Props) {
  return <LoadingOverlay {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  visible: true,
  text: "text",
};
