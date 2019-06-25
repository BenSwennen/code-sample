import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { storiesOf } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import filesData from "data/files";
import spaces from "data/spaces2";

import FileManager from "./FileManager";
import FileCard from "./components/FileCard";
import FileDetails from "./components/FileDetails";

const files = filesData.map(file => ({ ...file, title: file.name }));
const file = files[0];
const paddingDecorator = story => (
  <div style={{ padding: "20px" }}>
    {story()}
  </div>
);

const actionProps = actions({
  onDeleteFiles: "File(s) deleted",
  onDownloadFile: "File downloaded",
  onUploadFiles: "Files(s) selected",
  onTagFiles: "File(s) tagged",
  onUpdateFiles: "File(s) updated",
  onReorderFiles: "File(s) reorder",
});

const DraggableFileManager = DragDropContext(HTML5Backend)(FileManager);

storiesOf("FileManager/FileManager", module)
  .addDecorator(paddingDecorator)

  .add("default", () => (
    <DraggableFileManager
      files={files.filter(f => !f.type.startsWith("image"))}
      pictures={files.filter(f => f.type.startsWith("image"))}
      spaces={spaces}
      {...actionProps}
    />
  ))

  .add("empty", () => (
    <DraggableFileManager
      files={[]}
      pictures={[]}
      spaces={spaces}
      {...actionProps}
    />
  ));

storiesOf("FileManager/FileCard", module)
  .addDecorator(paddingDecorator)

  .add("default", () => (
    <FileCard file={file} />
  ))

  .add("private", () => (
    <FileCard file={{ ...file, isPrivate: true }} />
  ))

  .add("thumb", () => (
    <FileCard file={{ ...file, isPrimary: true }} />
  ))

  .add("selected", () => (
    <FileCard file={file} isSelected />
  ))

  .add("uploading", () => (
    <FileCard file={{ ...file, isUploading: true }} />
  ));

const widthDecorator = story => (
  <div style={{ width: "300px", height: "600px" }}>
    {story()}
  </div>
);

storiesOf("FileManager/FileDetails", module)
  .addDecorator(widthDecorator)

  .add("single file", () => (
    <FileDetails
      files={[files.find(f => !f.type.startsWith("image"))]}
      spaces={spaces}
      {...actionProps}
    />
  ))

  .add("multiple files", () => (
    <FileDetails
      files={files}
      spaces={spaces}
      {...actionProps}
    />
  ))

  .add("single picture", () => (
    <FileDetails
      files={[files.find(f => f.type.startsWith("image"))]}
      spaces={spaces}
      {...actionProps}
    />
  ))

  .add("multiple pictures", () => (
    <FileDetails
      files={files.filter(f => f.type.startsWith("image"))}
      spaces={spaces}
      {...actionProps}
    />
  ));
