import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const CardTitle = ({ title }) => (
  <div className={styles.title}>{title}</div>
);

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardTitle;
