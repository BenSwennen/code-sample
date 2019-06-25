import React from "react";
import { storiesOf } from "@storybook/react";
import files from "data/files";

import FileStack from "./FileStack";

const decorator = story => (
  <div style={{ background: "#FFF", width: "260px", height: "200px", padding: "20px" }}>
    {story()}
  </div>
);

storiesOf("FileStack", module)
  .addDecorator(decorator)

  .add("single file", () => (
    <FileStack files={[files[0]]} />
  ))

  .add("multiple files", () => (
    <FileStack files={files} />
  ));
