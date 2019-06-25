import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import File from "rialto-icons/File";

import Button from "./";

storiesOf("Button", module)
  .add("File picker", () => (
    <Button icon={<File />} label="Upload file" isFilePicker onFilePicked={action("Picked!")} />
  ))

  .add("default", () => (
    <Button icon={<File />} label="Upload file" onClick={action("Click!")} />
  ));
