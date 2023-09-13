import { ComponentStory, ComponentMeta } from "@storybook/react";
import IntegrationBanner, { Props } from ".";

export default {
  title: "IntegrationBanner",
  component: IntegrationBanner,
} as ComponentMeta<typeof IntegrationBanner>;

const Template: ComponentStory<typeof IntegrationBanner> = function (args: Props) {
  return <IntegrationBanner {...args} />;
};

export const Default = Template.bind({});
const integration = {
  name: "Qulture Rocks",
  image: "other",
};

Default.args = {
  integration
};
