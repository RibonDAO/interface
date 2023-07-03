import React, { ComponentType } from "react";

export function shouldRenderVariation(variation: string) {
  const isControl = () => variation === "Control";

  return !isControl();
}

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
