import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const CardActions = ({ children }) => (
  <div className={styles.actions}>
    {children}
  </div>
);

CardActions.propTypes = {
  children: PropTypes.node,
};

export default CardActions;
