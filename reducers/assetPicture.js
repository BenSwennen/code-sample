import { handleActions } from "redux-actions";
import removeById from "utils/removeById";
import { reorder } from "utils/array";
import sortBy from "lodash/sortBy";

const updatePicture = (pictures, newPicture) => (
  pictures.map((picture) => {
    if (picture.id === newPicture.id) return { ...picture, ...newPicture };
    if (picture.isPrimary && newPicture.isPrimary) return { ...picture, isPrimary: false };
    if (picture.isHeader && newPicture.isHeader) return { ...picture, isHeader: false };

    return { ...picture };
  })
);

export default handleActions({
  ASSET_PICTURES_GET: {
    PENDING: () => ({
      assetPictures: [],
    }),
    FULFILLED: (_, { payload }) => ({
      assetPictures: sortBy(payload.pictures, ["position"]),
    }),
  },

  ASSET_PICTURE_CREATE: {
    PENDING: ({ assetPictures }, { meta: { photo } }) => ({
      assetPictures: [
        ...assetPictures,
        { isUploading: true, name: photo.name, type: photo.type },
      ],
    }),

    REJECTED: ({ assetPictures }, { meta: { photo } }) => ({
      assetPictures: assetPictures.map((picture) => {
        if (picture.name === photo.name && picture.isUploading) return { ...picture, error: true };

        return { ...picture };
      }),
    }),

    FULFILLED: ({ assetPictures }, { payload: { picture }, meta: { photo } }) => ({
      assetPictures: assetPictures.map((p) => {
        if (photo.name === p.name && p.isUploading) {
          return { ...p, ...picture, isUploading: false };
        }
        return { ...p };
      }),
    }),
  },

  ASSET_PICTURE_UPDATE: {
    FULFILLED: ({ assetPictures }, { payload: { picture } }) => ({
      assetPictures: updatePicture(assetPictures, picture),
    }),
  },

  ASSET_PICTURE_DELETE: {
    PENDING: ({ assetPictures }, { meta: { pictureID } }) => ({
      assetPictures: removeById(assetPictures, pictureID),
    }),
  },

  ASSET_PICTURE_REORDER: ({ assetPictures }, { meta: { oldIndex, newIndex } }) => ({
    assetPictures: reorder(assetPictures, oldIndex, newIndex),
  }),
}, {}, { namespace: "_" });
