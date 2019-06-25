import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const CardGroup = props => (
  <div className={styles.group}>
    { props.children }
  </div>
);

CardGroup.propTypes = {
  children: PropTypes.node,
};

export default CardGroup;
