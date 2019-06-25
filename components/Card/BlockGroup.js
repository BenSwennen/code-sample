import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.css";

const BlockGroup = props => (
  <div className={styles.blockgroup}>
    { props.children }
  </div>
);

BlockGroup.propTypes = {
  children: PropTypes.node,
};

export default BlockGroup;
