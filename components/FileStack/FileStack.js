import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Document from "rialto-icons/Document";
import BackgroundImage from "components/BackgroundImage";
import Lightbox from "components/Flyer/Carousel/Lightbox";

import styles from "./FileStack.css";

export default class FileStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isExpanded: false };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { files, limit, isExpandable, isPictures } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={styles.root}>
        <div
          className={cx(styles.stack, {
            [styles.stacked]: files.length > 1,
            [styles.expandable]: isExpandable,
          })}
          onClick={isExpandable && this.toggleExpand}
        >
          {files.slice(0, limit).map(file => (isPictures || file.type.startsWith("image")
            ? <BackgroundImage key={file.id} src={file.url} />
            : <div className={styles.file} key={file.id}><Document size="xlarge" /></div>
          ))}
        </div>
        {isExpanded && <Lightbox pictures={files} onClose={this.toggleExpand} />}
      </div>
    );
  }
}

FileStack.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHeader: PropTypes.bool,
    isPrimary: PropTypes.bool,
    private: PropTypes.bool,
  })),
  limit: PropTypes.number,
  isExpandable: PropTypes.bool,
  isPictures: PropTypes.bool,
};

FileStack.defaultProps = {
  limit: 6,
};
