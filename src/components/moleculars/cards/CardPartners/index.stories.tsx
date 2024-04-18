import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardPartners from ".";

export default {
  title: "CardPartners",
  component: CardPartners,
} as ComponentMeta<typeof CardPartners>;

const Template: ComponentStory<typeof CardPartners> = function () {
  return <CardPartners />;
};

export const Default = Template.bind({});
