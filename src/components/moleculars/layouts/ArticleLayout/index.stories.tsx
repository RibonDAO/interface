import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArticleLayout, { Props } from ".";

export default {
  Data: "ArticleLayout",
  component: ArticleLayout,
} as ComponentMeta<typeof ArticleLayout>;

const Template: ComponentStory<typeof ArticleLayout> = function (args: Props) {
  return <ArticleLayout {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  article: {
    id: 1,
    title:
      "Brasil recupera número de baleias jubarte próximo ao total existente há 200 anos",
    link: "https://ribon.io",
    imageUrl: "https://picsum.photos/600/600",
    publishedAt: "2021-01-01",
    publishedAtInWords: "27/01/2023",
    visible: true,
    author: {
      id: 1,
      name: "Ribon",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  readMoreText: "Read now",
};
