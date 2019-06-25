import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { bytesToSize } from "utils";
import fileLabel from "utils/fileLabel";

import Document from "rialto-icons/Document";
import Lock from "rialto-icons/LockRed";
import Image from "rialto-icons/InUseBlack";

import BackgroundImage from "components/BackgroundImage";
import ImageTag from "components/ImageTag";
import Spinner from "components/Spinner";
import Card from "components/Card";
import styles from "./FileCard.css";


const FileCard = ({ file, onClick, isSelected }) => {
  const Label = fileLabel(file);

  return (
    <Card
      className={cx(styles.root, {
        [styles.clickable]: onClick,
        [styles.loading]: file.isUploading,
        [styles.selected]: isSelected,
      })}
    >
      {file.isUploading && (
        <React.Fragment>
          <Spinner />
          <div>Uploading..</div>
        </React.Fragment>
      )}
      {!file.isUploading && (
        <React.Fragment>
          {file.isPrimary && <ImageTag className={styles.thumb}>thumb</ImageTag>}
          {file.spaceId && <ImageTag className={styles.thumb}><Image size="xs" /></ImageTag>}
          {file.type.startsWith("image")
            ? <BackgroundImage src={file.url || file.preview} />
            : <div className={styles.placeholder}><Document size="xlarge" /></div>}
          <div className={styles.details}>
            <div className={styles.top}>
              <span>{file.title}</span>
              {file.isPrivate && <Lock size="xs" />}
            </div>
            <div className={styles.bottom}>
              <Label />
              <span>{bytesToSize(file.size)}</span>
            </div>
          </div>
        </React.Fragment>
      )}
    </Card>
  );
};

FileCard.propTypes = {
  file: PropTypes.shape({
    title: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHeader: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isUploading: PropTypes.bool,
    isPrivate: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default FileCard;
