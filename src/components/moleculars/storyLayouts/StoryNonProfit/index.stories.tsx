import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoryNonProfit, { Props } from ".";

export default {
  title: "StoryNonProfit",
  component: StoryNonProfit,
} as ComponentMeta<typeof StoryNonProfit>;

const Template: ComponentStory<typeof StoryNonProfit> = function (args: Props) {
  return <StoryNonProfit {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  story: {
    id: 1,
    title: "Sobre",
    description:
      "O Dara existe a 15 anos e contribui atualmente com a saúde de 50 famílias vulneráveis no estado de São Paulo.",
    image: "https://picsum.photos/1920/300",
    position: 1,
    active: true,
    nonProfit: {
      id: 1,
      name: "Dara",
      walletAddress: "0x0000000000000000000000000000000000000000",
      impactDescription: "dias de alimentação",
      backgroundImage: "https://picsum.photos/200/200",
      coverImage: "https://picsum.photos/200/200",
      mainImage: "https://picsum.photos/200/200",
      logo: "https://picsum.photos/200/200",
      impactByTicket: 1,
      cause: {
        id: 1,
        name: "Saúde",
      },
    },
  },
};
