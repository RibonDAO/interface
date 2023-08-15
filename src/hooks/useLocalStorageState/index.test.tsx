import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { clickOn } from "config/testUtils";
import * as Storage from "lib/localStorage";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import useLocalStorageState from ".";

jest.mock("lib/localStorage");
const setLocalStorageSpy = jest.spyOn(Storage, "setLocalStorageItem");
const getLocalStorageSpy = jest.spyOn(Storage, "getLocalStorageItem");

describe("useLocalStorageState", () => {
  it("should initialize state from local storage", () => {
    const key = "testKey";
    const initialValue = "initialValue";

    getLocalStorageSpy.mockReturnValue(initialValue);

    function TestComponent() {
      const [state] = useLocalStorageState(key, "defaultValue");

      return <div>{state}</div>;
    }

    render(<TestComponent />);

    expectTextToBeInTheDocument(initialValue);
  });

  it("should update state and local storage when the value changes", () => {
    const key = "testKey";
    const initialValue = "initialValue";
    const updatedValue = "updatedValue";

    getLocalStorageSpy.mockReturnValue(initialValue);

    function TestComponent() {
      const [state, setState] = useLocalStorageState(key, initialValue);

      return (
        <div>
          <button type="button" onClick={() => setState(updatedValue)}>
            Update Value
          </button>
          <div>{state}</div>
        </div>
      );
    }

    render(<TestComponent />);

    clickOn("Update Value");

    expect(setLocalStorageSpy).toHaveBeenCalledWith(key, updatedValue);

    expectTextToBeInTheDocument(updatedValue);
  });

  it("should not update local storage when the value does not change", () => {
    const key = "testKey";
    const value = "initialValue";

    getLocalStorageSpy.mockReturnValue(value);

    function TestComponent() {
      const [state, setState] = useLocalStorageState(key, value);

      return (
        <div>
          <button type="button" onClick={() => setState(value)}>
            Update Value
          </button>
          <div>{state}</div>
        </div>
      );
    }

    render(<TestComponent />);

    clickOn("Update Value");

    expect(setLocalStorageSpy).not.toHaveBeenCalled();

    expectTextToBeInTheDocument(value);
  });
});
