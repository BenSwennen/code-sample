import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const CardTitle = props => (
  <div className={styles.title}>{props.title}</div>
);

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardTitle;
