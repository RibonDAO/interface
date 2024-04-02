import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import FileUpload from ".";

const onChange = jest.fn();
describe("FileUpload", () => {
  it("should render without error", () => {
    renderComponent(
      <FileUpload
        onChange={onChange}
        value={undefined}
        labels={{
          main: "Image",
          uploadBox: "Click here to upload your image",
          requirements: "Max size: 5MB",
        }}
      />,
    );

    expectTextToBeInTheDocument("Click here to upload your image");
  });
});
