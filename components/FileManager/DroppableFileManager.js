import React, { useMemo } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import Upload from "rialto-icons/UploadCloud";

import FileManager from "components/FileManager";
import styles from "./FileManager.css";

const { FILE } = NativeTypes;

const FileManagerDropTarget = (props) => {
  const { connectDropTarget, isOver } = props;

  return connectDropTarget(
    <div className={styles.dropzone}>
      <FileManager {...props} />
      {isOver && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <Upload dimensions={{ height: "33px", width: "46px" }} />
            <div>Drag and drop files to upload</div>
          </div>
        </div>
      )}
    </div>
  );
};

const DropTargetComponent = DropTarget(
  props => props.accepts, {
    drop: (props, monitor) => { if (props.onDrop) props.onDrop(props, monitor); },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(FileManagerDropTarget);


const DroppableFileManager = (props) => {
  const accepts = useMemo(() => [FILE], []);
  const handleFileDrop = (_, monitor) => monitor && props.onUploadFiles(monitor.getItem().files);

  return <DropTargetComponent {...props} accepts={accepts} onDrop={handleFileDrop} />;
};

DroppableFileManager.propTypes = {
  onUploadFiles: PropTypes.func.isRequired,
};

export default DroppableFileManager;
