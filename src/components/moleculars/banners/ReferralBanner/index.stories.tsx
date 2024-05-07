import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReferralBanner from ".";

export default {
  title: "ReferralBanner",
  component: ReferralBanner,
} as ComponentMeta<typeof ReferralBanner>;

const Template: ComponentStory<typeof ReferralBanner> = function () {
  return <ReferralBanner />;
};

export const Default = Template.bind({});
