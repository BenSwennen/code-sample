import React from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { fileShape, pictureShape, spaceShape } from "shapes";

import { DroppableFileManager } from "components/FileManager";

class AssetFiles extends React.Component {
  componentDidMount() {
    this.props.getFiles();
    this.props.getSpaces();
  }

  render() {
    return (
      <DroppableFileManager {...this.props} />
    );
  }
}

AssetFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape(fileShape)).isRequired,
  pictures: PropTypes.arrayOf(PropTypes.shape(pictureShape)).isRequired,
  spaces: PropTypes.arrayOf(PropTypes.shape(spaceShape)),
  getFiles: PropTypes.func.isRequired,
  getSpaces: PropTypes.func.isRequired,
  onDeleteFiles: PropTypes.func.isRequired,
  onTagPictures: PropTypes.func.isRequired,
  onUpdateFiles: PropTypes.func.isRequired,
  onUploadFiles: PropTypes.func.isRequired,
  onReorderFiles: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(AssetFiles);
