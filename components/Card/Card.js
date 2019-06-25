import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Card.css";

const Card = ({ children, className, onMouseEnter, onMouseLeave }) => (
  <div
    className={cx(styles.card, className)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Card;
