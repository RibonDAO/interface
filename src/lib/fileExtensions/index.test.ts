import { getFileExtension, isVideo } from ".";

describe("getFileExtension", () => {
  it("should return the correct extension", () => {
    expect(getFileExtension("file.png")).toEqual("png");
    expect(getFileExtension(".gitignore")).toEqual("gitignore");
    expect(getFileExtension("file.mp4")).toEqual("mp4");
    expect(getFileExtension("file.webm")).toEqual("webm");
  });
});

describe("isVideo", () => {
  it("should return the correct extension", () => {
    expect(isVideo("file.png")).toEqual(false);
    expect(isVideo("file")).toEqual(false);
    expect(isVideo("file.mp4")).toEqual(true);
    expect(isVideo("file.webm")).toEqual(true);
  });
});
