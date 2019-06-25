import { connect } from "react-redux";
import {
  createPicture,
  getPictures,
  deletePicture,
  updatePicture,
  reorderPicture,
} from "actions/assetPicture";
import {
  createAttachment,
  deleteAttachment,
  getAttachments,
  updateAttachment,
  reorderAttachment,
} from "actions/assetAttachment";
import { getAssetSpaces } from "actions/space";
import { getSpacesByAsset } from "selectors/space";

import AssetFiles from "./AssetFiles";

const pictures = files => (
  files.filter(f => f.type.startsWith("image/"))
);

const attachments = files => (
  files.filter(f => !f.type.startsWith("image/"))
);

const mapStateToProps = state => ({
  files: state.assetAttachments,
  pictures: state.assetPictures,
  spaces: getSpacesByAsset(state),
});

const mapDispatchToProps = (dispatch, { match: { params: { assetID } } }) => ({
  getFiles: () => Promise.all([
    dispatch(getPictures(assetID)),
    dispatch(getAttachments(assetID)),
  ]),
  getSpaces: () => dispatch(getAssetSpaces(assetID)),
  onDeleteFiles: files => Promise.all([
    ...files.filter(f => !!f.photo).map(p => dispatch(deletePicture(p.id))),
    ...files.filter(f => !f.photo).map(f => dispatch(deleteAttachment(f.id))),
  ]),
  onDownloadFile: file => window.open(file.url),
  onTagPictures: (files, space) => Promise.all(
    files.map(picture => dispatch(updatePicture({ id: picture.id, spaceId: space.id })))
  ),
  onUploadFiles: files => Promise.all([
    ...pictures(files).map(f => dispatch(createPicture(assetID, f))),
    ...attachments(files).map(f => dispatch(createAttachment(assetID, f))),
  ]),
  onUpdateFiles: files => Promise.all([
    ...files.filter(f => !!f.photo).map(p => dispatch(updatePicture(p))),
    ...files.filter(f => !f.photo).map(f => dispatch(updateAttachment(f))),
  ]),
  onReorderFiles: (isPicture, oldIndex, newIndex) => (isPicture ?
    dispatch(reorderPicture(oldIndex, newIndex)) :
    dispatch(reorderAttachment(oldIndex, newIndex))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetFiles);
