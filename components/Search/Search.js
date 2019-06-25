import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SearchIcon from "rialto-icons/Search";
import styles from "./Search.css";

const Search = (props) => {
  const {
    isBordered,
    isBottomBordered,
    isRight,
    onSearch,
    placeholder,
    placeholderRight,
    value,
  } = props;

  return (
    <div
      className={cx(styles.root, {
        [styles.border]: isBordered,
        [styles.borderBottom]: isBottomBordered,
        [styles.right]: isRight,
      })}
    >
      <SearchIcon />
      <input
        id="search"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={evt => onSearch(evt.target.value)}
      />
      {placeholderRight && !value &&
        <div className={styles.placeholder}>
          <label htmlFor="search">{placeholderRight}</label>
        </div>
      }
    </div>
  );
};

Search.propTypes = {
  isBordered: PropTypes.bool,
  isBottomBordered: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  placeholderRight: PropTypes.string,
  isRight: PropTypes.bool,
  value: PropTypes.string,
};

Search.defaultProps = {
  value: "",
};

export default Search;
