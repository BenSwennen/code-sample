import React from "react";
import PropTypes from "prop-types";

import { DraggableFile, DraggablePicture } from "../FileCard";
import styles from "./FileGroup.css";
import { filesAreEqual } from "../../FileManager";

const FileGroup = ({
  files,
  selectedFiles,
  title,
  onDrag,
  onDrop,
  onSelect,
}) => {
  if (!files || !files.length) return null;

  return (
    <div className={styles.root}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.files}>
        {files.map((file, index) => (
          <div key={file.id} onClick={() => onSelect(file)} >
            {file.photo ?
              <DraggablePicture
                index={index}
                file={file}
                onDrag={onDrag}
                onDrop={onDrop}
                isSelected={!!selectedFiles.find(selected => filesAreEqual(selected, file))}
              /> :
              <DraggableFile
                index={index}
                file={file}
                onDrag={onDrag}
                onDrop={onDrop}
                isSelected={!!selectedFiles.find(selected => filesAreEqual(selected, file))}
              />
            }
          </div>
        ))}
        {[...Array(10).keys()].map(key => (<div className={styles.filler} key={`filler${key}`} />))}
      </div>
    </div>
  );
};

FileGroup.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHeader: PropTypes.bool,
    isPrimary: PropTypes.bool,
    private: PropTypes.bool,
  })).isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  onDrag: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FileGroup;
