import React, { ComponentType } from "react";

export function handleVariation<Props>(
  variation: string,
  ControlComponent: ComponentType | null,
  VariationComponent: ComponentType<Props>,
  props: Props & JSX.IntrinsicAttributes,
) {
  const isControl = () => variation === "Control";

  return !isControl() ? (
    <VariationComponent {...props} />
  ) : (
    ControlComponent && <ControlComponent />
  );
}
