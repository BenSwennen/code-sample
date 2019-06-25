import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Search from ".";

storiesOf("Search", module)

  .add("default", () => (
    <Search placeholder="Search" onSearch={action("Search")} />
  ))

  .add("Border Bottom", () => (
    <Search placeholder="Search" onSearch={action("Search")} isBottomBordered />
  ))

  .add("Full Border", () => (
    <Search placeholder="Search" onSearch={action("Search")} isBordered />
  ))

  .add("Icon Right", () => (
    <Search placeholder="Search" onSearch={action("Search")} isRight />
  ))

  .add("Placeholder Right", () => (
    <Search
      placeholder="Search"
      placeholderRight="(name, kind, tag..)"
      onSearch={action("Search")}
      isBordered
    />
  ));
