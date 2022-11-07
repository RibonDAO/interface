import { screen } from "@testing-library/react";
import {
  mockLogErrorFunction,
  mockLogEventFunction,
  mockNavigateBackFunction,
  mockNavigationFunction,
} from "../../setupTests";

export function expectTextToBeInTheDocument(text: string) {
  return expect(screen.getByText(text)).toBeInTheDocument();
}

export function expectTextNotToBeInTheDocument(text: string) {
  return expect(screen.queryByText(text)).not.toBeInTheDocument();
}

export function expectImageToBeInTheDocument(alt: string) {
  return expect(screen.getByAltText(alt)).toBeInTheDocument();
}

export function expectImageNotToBeInTheDocument(alt: string) {
  return expect(screen.queryByAltText(alt)).not.toBeInTheDocument();
}

export function expectDisplayValueToBeInTheDocument(value: string) {
  return expect(screen.getByDisplayValue(value)).toBeInTheDocument();
}
export function expectInputToHaveValue(label: string, value: any) {
  return expect(screen.getByLabelText(label)).toHaveValue(value);
}

export function expectLogErrorToHaveBeenCalled(error?: any) {
  if (error) return expect(mockLogErrorFunction).toHaveBeenCalledWith(error);

  return expect(mockLogErrorFunction).toHaveBeenCalled();
}

export function expectLogEventToHaveBeenCalledWith(
  event: string,
  params?: Record<any, any>,
) {
  if (params)
    return expect(mockLogEventFunction).toHaveBeenCalledWith(event, params);

  return expect(mockLogEventFunction).toHaveBeenCalledWith(event);
}

type expectPageToNavigateToType = {
  state?: Record<any, any>;
};

export function expectPageToNavigateTo(
  pathname: string,
  { state }: expectPageToNavigateToType = {},
) {
  if (!state)
    return expect(mockNavigationFunction).toHaveBeenCalledWith(pathname);

  return expect(mockNavigationFunction).toHaveBeenCalledWith({
    pathname,
    state,
  });
}

export function expectPageToNavigateBack() {
  return expect(mockNavigateBackFunction).toHaveBeenCalled();
}
