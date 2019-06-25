import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ImageTag.css";

const ImageTag = ({ className, children }) => (
  <div className={cx(styles.root, className)}>
    {children}
  </div>
);

ImageTag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
};

export default ImageTag;
