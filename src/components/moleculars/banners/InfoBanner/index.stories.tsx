import { ComponentStory, ComponentMeta } from "@storybook/react";
import InfoBanner from ".";

export default {
  title: "InfoBanner",
  component: InfoBanner,
} as ComponentMeta<typeof InfoBanner>;

const Template: ComponentStory<typeof InfoBanner> = function () {
  return <InfoBanner />;
};

export const Default = Template.bind({});

Default.args = {
  text: "InfoBanner",
};
