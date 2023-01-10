import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardStories, { Props } from ".";

export default {
  title: "CardStories",
  component: CardStories,
} as ComponentMeta<typeof CardStories>;

const Template: ComponentStory<typeof CardStories> = function (args: Props) {
  return (
    <div style={{ width: 375, height: 812 }}>
      <CardStories {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  stories: [
    {
      id: 1,
      title: "Sobre",
      description:
        "O Dara existe a 15 anos e contribui atualmente com a saúde de 50 famílias vulneráveis no estado de São Paulo.",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 1,
      title: "Sobre",
      description:
        "O Dara existe a 15 anos e contribui atualmente com a saúde de 50 famílias vulneráveis no estado de São Paulo.",
      image: "https://picsum.photos/200/300?random=3",
    },
  ],
  profileData: {
    name: "Dara",
    logo: "https://picsum.photos/200/300",
    subtitle: "Saúde",
  },
  ctaData: {
    text: "Doar ticket",
    onClick: () => {},
    visible: true,
  },
  onAllStoriesEnd: () => {},
  onCloseButtonClick: () => {},
};
