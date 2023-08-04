import React, { useState } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as Storage from "lib/localStorage";
import { clickOn } from "config/testUtils";
import useLocalStorageEffect from ".";

jest.mock("lib/localStorage");
const setLocalStorageSpy = jest.spyOn(Storage, "setLocalStorageItem");
const getLocalStorageSpy = jest.spyOn(Storage, "getLocalStorageItem");

describe("useLocalStorageEffect", () => {
  it("should update local storage when the value changes", () => {
    const key = "testKey";
    const initialValue = "initialValue";
    const updatedValue = "updatedValue";

    getLocalStorageSpy.mockReturnValue(initialValue);

    function TestComponent() {
      const [value, setValue] = useState(initialValue);
      useLocalStorageEffect(key, value);

      return (
        <div>
          <button type="button" onClick={() => setValue(updatedValue)}>
            Update Value
          </button>
        </div>
      );
    }

    render(<TestComponent />);

    clickOn("Update Value");

    expect(setLocalStorageSpy).toHaveBeenCalledWith(key, updatedValue);
  });

  it("should not update local storage when the value does not change", () => {
    const key = "testKey";
    const value = "initialValue";

    getLocalStorageSpy.mockReturnValue(value);

    function TestComponent() {
      useLocalStorageEffect(key, value);
      return <div />;
    }

    render(<TestComponent />);

    expect(setLocalStorageSpy).not.toHaveBeenCalled();
  });
});
