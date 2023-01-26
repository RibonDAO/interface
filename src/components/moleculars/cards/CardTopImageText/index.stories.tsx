import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTopImageText, { Props } from ".";

export default {
  title: "CardTopImageText",
  component: CardTopImageText,
} as ComponentMeta<typeof CardTopImageText>;

const Template: ComponentStory<typeof CardTopImageText> = function (
  args: Props,
) {
  return <CardTopImageText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  imageUrl: "https://picsum.photos/id/237/200/300",
  imageAlt: "Image",
  text: "Você doou 99 dias de ração para animais resgatados",
};
