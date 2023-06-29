import React, { ComponentType } from "react";
import { Contribution } from "types/entities/Contribution";

export function handleVariation<Props>(
  variation: string,
  contribution: Contribution,
  ControlComponent: ComponentType | null,
  VariationComponent: ComponentType<Props>,
  props: Props & JSX.IntrinsicAttributes,
) {
  const isControl = () => variation === "Control";

  return !isControl() && contribution ? (
    <VariationComponent {...props} />
  ) : (
    ControlComponent && <ControlComponent />
  );
}
