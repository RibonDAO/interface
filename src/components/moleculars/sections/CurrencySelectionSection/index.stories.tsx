import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Currencies } from "@ribon.io/shared/types";
import CurrencySelectionSection, { Props } from ".";

export default {
  title: "CurrencySelectionSection",
  component: CurrencySelectionSection,
} as ComponentMeta<typeof CurrencySelectionSection>;

const Template: ComponentStory<typeof CurrencySelectionSection> = function (
  args: Props,
) {
  return (
    <div style={{ width: "400px" }}>
      <CurrencySelectionSection {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  amount: 100,
  currentCoin: Currencies.USD,
  onCurrencyChanged: () => {},
  currencyOptions: [Currencies.USD, Currencies.BRL],
};
