import React from "react";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";

import FileCard from "./FileCard";

const fileSource = {
  beginDrag: ({ file, index }) => ({
    id: file.id,
    index,
  }),
};

const fileTarget = {
  drop: ({ file, onDrop }, monitor) => {
    onDrop({ ...file, position: monitor.getItem().index });
  },
  hover: ({ file, index, onDrag }, monitor) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) return null;

    monitor.getItem().index = hoverIndex; // eslint-disable-line
    return onDrag(!!file.photo, dragIndex, hoverIndex);
  },
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class DraggableFileCard extends React.Component {
  constructor(props) {
    super(props);

    this.card = React.createRef();
    this.getNode = this.getNode.bind(this);
  }

  getNode() {
    return this.card.current;
  }

  render() {
    const { connectDropTarget, connectDragSource, isDragging } = this.props;

    return connectDragSource(connectDropTarget(
      <div ref={this.card} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <FileCard {...this.props} />
      </div>
    ));
  }
}

DraggableFileCard.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHeader: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isUploading: PropTypes.bool,
    private: PropTypes.bool,
  }).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

export const DraggablePicture = DropTarget(
  "DraggablePicture",
  fileTarget,
  connect => ({ connectDropTarget: connect.dropTarget() }),
)(DragSource("DraggablePicture", fileSource, collectSource)(DraggableFileCard));

export const DraggableFile = DropTarget(
  "DraggableFile",
  fileTarget,
  connect => ({ connectDropTarget: connect.dropTarget() }),
)(DragSource("DraggableFile", fileSource, collectSource)(DraggableFileCard));
