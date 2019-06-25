import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Dropzone from "react-dropzone";
import ScreenWidth from "components/hoc";

import styles from "./Button.css";

const Button = (props) => {
  const {
    className,
    icon,
    hasFile,
    isFilePicker,
    isMobile,
    isMultiple,
    label,
    onClick,
    onFilePicked,
  } = props;
  const Wrapper = ({ children }) => (isFilePicker ? ( // eslint-disable-line
    <Dropzone
      className={cx(styles.root, { [styles.active]: isMobile && hasFile })}
      multiple={isMultiple}
      onClick={onClick}
      onDrop={res => onFilePicked(isMultiple ? res : res[0])}
    >
      {children}
    </Dropzone>
  ) : (
    <button className={cx(styles.root, className)} onClick={onClick} type="button">
      {children}
    </button>
  ));
  return (
    <Wrapper>
      {icon}
      {(!isFilePicker || !isMobile) && <span>{label}</span> }
    </Wrapper>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  hasFile: PropTypes.bool,
  isFilePicker: PropTypes.bool,
  isMobile: PropTypes.bool,
  isMultiple: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onFilePicked: PropTypes.func,
};

Button.defaultProps = {
  isMultiple: false,
};

export default ScreenWidth(Button);
