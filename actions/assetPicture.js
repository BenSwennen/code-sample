import { create, destroy, getAll, update } from "api/assetPicture";

export const getPictures = assetID => ({
  type: "ASSET_PICTURES_GET",
  payload: getAll(assetID),
});

export const createPicture = (assetID, photo) => ({
  type: "ASSET_PICTURE_CREATE",
  payload: create(assetID, photo),
  meta: { photo },
});

export const updatePicture = picture => ({
  type: "ASSET_PICTURE_UPDATE",
  payload: update(picture),
});

export const deletePicture = id => ({
  type: "ASSET_PICTURE_DELETE",
  payload: destroy(id),
  meta: { pictureID: id },
});

export const reorderPicture = (oldIndex, newIndex) => ({
  type: "ASSET_PICTURE_REORDER",
  meta: { oldIndex, newIndex },
});
