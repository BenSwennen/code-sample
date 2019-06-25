import React from "react";
import PropTypes from "prop-types";
import AddFile from "rialto-icons/AddFileGreen";
import { fileShape, pictureShape, spaceShape } from "shapes";
import Translate from "utils/translate";
import caseInsensitiveSearch from "utils/caseInsensitiveSearch";

import Card from "components/Card";
import Button from "components/Button";
import Search from "components/Search";
import FileDetails from "./components/FileDetails";
import FileGroup from "./components/FileGroup";
import styles from "./FileManager.css";

const { t } = new Translate("FileManager");

export const filesAreEqual = (file1, file2) => (
  file1.id === file2.id && !!file1.photo === !!file2.photo
);

const fileIsSearched = (file, search, spaces = []) => {
  const space = spaces.find(s => s.id === file.spaceId);

  return caseInsensitiveSearch(file.title, search)
    || caseInsensitiveSearch(file.type, search)
    || (space && (caseInsensitiveSearch(space.name, search)));
};

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", selectedFiles: [] };

    this.handleFileDelete = this.handleFileDelete.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpdate = this.handleFileUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleFileDelete(files) {
    this.props.onDeleteFiles(files);
    this.setState({ selectedFiles: [] });
  }

  handleFileSelect(file) {
    if (file.isUploading) return;
    const { selectedFiles } = this.state;

    if (selectedFiles.find(f => filesAreEqual(f, file))) {
      this.setState({ selectedFiles: selectedFiles.filter(f => !filesAreEqual(f, file)) });
    } else {
      this.setState({ selectedFiles: [...selectedFiles, file] });
    }
  }

  handleFileUpdate(files) {
    this.setState({ selectedFiles: files });
    this.props.onUpdateFiles(files);
  }

  handleSearch(search) {
    this.setState({ search });
  }

  render() {
    const {
      files,
      pictures,
      spaces,
      onDownloadFile,
      onUpdateFiles,
      onUploadFiles,
      onReorderFiles,
    } = this.props;
    const { search, selectedFiles } = this.state;
    const isEmpty = !pictures.length && !files.length;

    return (
      <Card className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Button
              className={styles.btnAdd}
              icon={<AddFile />}
              label={t("upload")}
              onFilePicked={f => onUploadFiles(f)}
              isFilePicker
              isMultiple
            />
            <Search
              onSearch={this.handleSearch}
              placeholder={t("search")}
              placeholderRight={t("searchPlaceholder")}
              value={search}
              isBordered
            />
          </div>
          <div className={styles.body}>
            {isEmpty
              ? <div className={styles.empty}>{t("empty")}</div>
              : (
                <div className={styles.files} >
                  <FileGroup
                    files={pictures.filter(picture => fileIsSearched(picture, search, spaces))}
                    selectedFiles={selectedFiles}
                    title={t("pictures")}
                    onDrag={onReorderFiles}
                    onDrop={file => onUpdateFiles([file])}
                    onSelect={this.handleFileSelect}
                  />
                  <FileGroup
                    files={files.filter(file => fileIsSearched(file, search))}
                    selectedFiles={selectedFiles}
                    title={t("files")}
                    onDrag={onReorderFiles}
                    onDrop={file => onUpdateFiles([file])}
                    onSelect={this.handleFileSelect}
                  />
                </div>
              )}
            <FileDetails
              files={selectedFiles}
              selectedFiles={selectedFiles}
              spaces={spaces}
              onDeleteFiles={this.handleFileDelete}
              onDownloadFile={onDownloadFile}
              onUpdateFiles={this.handleFileUpdate}
            />
          </div>

        </div>
      </Card>
    );
  }
}

FileManager.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape(fileShape)).isRequired,
  pictures: PropTypes.arrayOf(PropTypes.shape(pictureShape)).isRequired,
  spaces: PropTypes.arrayOf(PropTypes.shape(spaceShape)),
  onDeleteFiles: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func.isRequired,
  onUpdateFiles: PropTypes.func.isRequired,
  onUploadFiles: PropTypes.func.isRequired,
  onReorderFiles: PropTypes.func.isRequired,
};

export default FileManager;
