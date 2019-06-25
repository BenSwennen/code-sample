import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Card.css";

const CardBlock = ({ className, children }) => (
  <div className={cx(styles.block, className)}>
    {children }
  </div>
);

CardBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardBlock;
