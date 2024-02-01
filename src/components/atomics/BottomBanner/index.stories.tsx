import { ComponentStory, ComponentMeta } from "@storybook/react";
import BottomBanner, { Props } from ".";

export default {
  title: "BottomBanner",
  component: BottomBanner,
} as ComponentMeta<typeof BottomBanner>;

const Template: ComponentStory<typeof BottomBanner> = function (args: Props) {
  return <BottomBanner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Baixar",
  ctaText: "Nosso app está disponível em todas as lojas",
  onClick: () => {},
};
