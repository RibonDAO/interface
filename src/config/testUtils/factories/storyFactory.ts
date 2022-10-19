import Story from "types/entities/Story";

function storyFactory(params: Partial<Story> = {}): Story {
  const defaultValues: Story = {
    id: 1,
    title: "Story title",
    description: "Story description",
    image: "image.jpeg",
  };
  return Object.assign(defaultValues, params) as Story;
}

export default storyFactory;
