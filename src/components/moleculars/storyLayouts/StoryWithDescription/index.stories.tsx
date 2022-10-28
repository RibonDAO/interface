import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryWithDescription, { Props } from ".";

export default {
  title: "StoryWithDescription",
  component: StoryWithDescription,
} as ComponentMeta<typeof StoryWithDescription>;

const Template: ComponentStory<typeof StoryWithDescription> = function (
  args: Props,
) {
  return <StoryWithDescription {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  story: {
    id: 1,
    title: "Sobre",
    description:
      "O Dara existe a 15 anos e contribui atualmente com a saúde de 50 famílias vulneráveis no estado de São Paulo.",
    image: "https://picsum.photos/200/300",
  },
  hasProfileData: true,
};
