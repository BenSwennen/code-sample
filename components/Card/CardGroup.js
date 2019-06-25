import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const CardGroup = ({ children }) => (
  <div className={styles.group}>
    {children}
  </div>
);

CardGroup.propTypes = {
  children: PropTypes.node,
};

export default CardGroup;
