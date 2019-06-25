import React from "react";
import renderer from "react-test-renderer";
import Search from "../";

describe("<Search />", () => {
  it("renders correctly", () => {
    const mockFn = jest.fn();
    const component = renderer.create(
      <Search placeholder="Search" onSearch={mockFn} isBorder isRight />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
