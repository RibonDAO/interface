import { ComponentStory, ComponentMeta } from "@storybook/react";
import offerFactory from "config/testUtils/factories/offerFactory";
import OfferSelectionSection, { Props } from ".";

export default {
  title: "OfferSelectionSection",
  component: OfferSelectionSection,
} as ComponentMeta<typeof OfferSelectionSection>;

const Template: ComponentStory<typeof OfferSelectionSection> = function (
  args: Props,
) {
  return (
    <div style={{ width: "400px" }}>
      <OfferSelectionSection {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  offers: [
    offerFactory({ price: "$5,00", id: 1 }),
    offerFactory({ price: "$10,00", id: 2 }),
    offerFactory({ price: "$15,00", id: 3 }),
  ],
  currentOffer: offerFactory({ price: "$10,00", id: 2 }),
  onOfferChange: () => {},
};
