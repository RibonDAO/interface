import React, { ComponentType } from "react";
import { Contribution } from "types/entities/Contribution";

export function shouldRenderVariation(
  variation: string,
  contribution: Contribution,
) {
  const isControl = () => variation === "Control";

  return !isControl() && contribution;
}

export function handleVariation<Props>(
  variation: string,
  contribution: Contribution,
  ControlComponent: ComponentType | null,
  VariationComponent: ComponentType<Props>,
  props: Props & JSX.IntrinsicAttributes,
) {
  if (shouldRenderVariation(variation, contribution))
    return <VariationComponent {...props} />;
  else return ControlComponent && <ControlComponent />;
}
