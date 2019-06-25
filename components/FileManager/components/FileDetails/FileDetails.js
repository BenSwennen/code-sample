import React from "react";
import PropTypes from "prop-types";
import uniq from "lodash/uniq";
import moment from "moment";
import { spaceShape } from "shapes";
import Translate from "utils/translate";
import { $green } from "_variables";

import Delete from "rialto-icons/Delete";
import Download from "rialto-icons/Download";

import Checkbox from "components/Checkbox";
import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import EditableTitle from "components/EditableTitle";
import FileStack from "components/FileStack";

import styles from "./FileDetails.css";

const { t } = new Translate("FileManager");

const FileDetails = ({ files, spaces, onDeleteFiles, onDownloadFile, onUpdateFiles }) => {
  if (!files.length) return <div className={styles.root} />;

  const fileTypes = uniq(files.map(f => f.type));
  const taggedSpaces = uniq(files.map(f => f.spaceId));
  const isPictures = fileTypes.length === 1 && fileTypes[0].startsWith("image");
  const isSingleFile = files.length === 1;
  const isSinglePicture = isPictures && isSingleFile;
  const taggedSpace = taggedSpaces.length === 1 && !!taggedSpaces[0]
    ? [spaces.find(s => s.id === taggedSpaces[0])]
    : null;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <FileStack files={files} />
          {files.length === 1 && (
            <IconButton
              icon={Download}
              label="Download"
              size="small"
              color={$green}
              onClick={() => onDownloadFile(files[0])}
              isIconRight
            />)}
        </div>
        <div className={styles.middle}>
          <div className={styles.details}>
            <div className={styles.name}>
              {files.length > 1 ?
                t("filesSelected", { value: files.length }) :
                <EditableTitle
                  title={files[0].title}
                  onUpdate={title => onUpdateFiles([{ ...files[0], title }])}
                  isHovered
                />
              }
            </div>
            {fileTypes.length === 1 && <div className={styles.type}>{fileTypes[0]}</div>}
          </div>
        </div>
        <div className={styles.bottom}>
          {isSingleFile && (
            <div className={styles.field}>
              <label>{t("uploaded")}</label>
              <span>{moment(files[0].createdAt).format("L HH:mm")}</span>
            </div>
          )}
          {isPictures && spaces.length > 0 && (
            <div className={styles.field}>
              <label>{t("space")}</label>
              <Dropdown
                isUnselectable
                values={spaces}
                selectedValues={taggedSpace}
                inputValueExtractor={v => v.name}
                valueExtractor={v => ({ label: v.name })}
                onChange={s => onUpdateFiles(files.map(f => ({ ...f, spaceId: s ? s.id : null })))}
              />
            </div>
          )}
          {isSinglePicture && !files[0].isPrivate && (
            <React.Fragment>
              <div className={styles.field}>
                <Checkbox
                  isChecked={files[0].isPrimary}
                  label={t("thumbnail")}
                  onChange={() => onUpdateFiles([{ ...files[0], isPrimary: !files[0].isPrimary }])}
                />
              </div>
              <div className={styles.field}>
                <Checkbox
                  isChecked={files[0].isHeader}
                  label={t("header")}
                  onChange={() => onUpdateFiles([{ ...files[0], isHeader: !files[0].isHeader }])}
                />
              </div>
            </React.Fragment>
          )}

          <div className={styles.field}>
            <Checkbox
              isChecked={files[0].isPrivate}
              label={t("private", files.length)}
              onChange={() => onUpdateFiles(files.map(f => ({ ...f, isPrivate: !f.isPrivate })))}
            />
          </div>
          <IconButton label={t("delete")} icon={Delete} onClick={() => onDeleteFiles(files)} />
        </div>
      </div>
    </div>
  );
};

FileDetails.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHeader: PropTypes.bool,
    isPrimary: PropTypes.bool,
    private: PropTypes.bool,
  })),
  spaces: PropTypes.arrayOf(PropTypes.shape(spaceShape)),
  onDeleteFiles: PropTypes.func.isRequired,
  onUpdateFiles: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func.isRequired,
};

export default FileDetails;
