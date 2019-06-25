import reducer from "./assetPicture";

describe("assetPicture reducer", () => {
  it("returns the initial state", () => (
    expect(reducer(undefined, {})).toEqual({})
  ));

  it("clears the list of existing asset pictures on pending", () => {
    const action = { type: "ASSET_PICTURES_GET_PENDING" };
    const state = reducer({ assetPictures: ["a", "b", "c"] }, action);

    return expect(state.assetPictures).toEqual([]);
  });

  it("adds the list of assetpictures to the state after retrieving them", () => {
    const action = { type: "ASSET_PICTURES_GET_FULFILLED", payload: { pictures: ["a", "b", "c"] } };
    const state = reducer({ assetPictures: [] }, action);

    return expect(state.assetPictures).toEqual(["a", "b", "c"]);
  });

  it("adds an uploading picture when starting to upload one", () => {
    const action = { type: "ASSET_PICTURE_CREATE_PENDING", meta: { photo: { name: "Abc" } } };
    const state = reducer({ assetPictures: [] }, action);

    return expect(state.assetPictures).toEqual([{ isUploading: true, name: "Abc" }]);
  });

  it("puts the picture in error state if uploading fails", () => {
    const action = { type: "ASSET_PICTURE_CREATE_REJECTED", meta: { photo: { name: "Test" } } };
    const state = reducer({ assetPictures: [{ id: 2, name: "abc" }, { name: "Test", isUploading: true }] }, action);

    return expect(state.assetPictures).toEqual([
      { id: 2, name: "abc" },
      { name: "Test", isUploading: true, error: true },
    ]);
  });

  it("adds the uploaded picture to the list of asset pictures and removes the temporary one", () => {
    const action = {
      type: "ASSET_PICTURE_CREATE_FULFILLED",
      payload: { picture: { info: "abc" } },
      meta: { photo: { name: "Def" } },
    };
    const state = reducer({ assetPictures: [{ name: "Def", isUploading: true }] }, action);

    return expect(state.assetPictures).toEqual([{ name: "Def", info: "abc", isUploading: false }]);
  });

  it("updates the picture details when updating picture", () => {
    const action = { type: "ASSET_PICTURE_UPDATE_FULFILLED", payload: { picture: { id: 3, name: "New" } } };
    const state = reducer({ assetPictures: [{ id: 1 }, { id: 3 }] }, action);

    return expect(state.assetPictures).toEqual([{ id: 1 }, { id: 3, name: "New" }]);
  });

  it("optimistally removes an asset picture after destroying it", () => {
    const action = { type: "ASSET_PICTURE_DELETE_PENDING", meta: { pictureID: 5 } };
    const state = reducer({ assetPictures: [{ id: 3 }, { id: 5 }] }, action);

    return expect(state.assetPictures).toEqual([{ id: 3 }]);
  });

  it("unsets other thumbnail asset pictures when settings as thumbnail asset picture", () => {
    const action = { type: "ASSET_PICTURE_UPDATE_FULFILLED", payload: { picture: { id: 2, isPrimary: true } } };
    const state = reducer({ assetPictures: [{ id: 2 }, { id: 5, isPrimary: true }] }, action);

    return expect(state.assetPictures).toEqual([
      { id: 2, isPrimary: true }, { id: 5, isPrimary: false },
    ]);
  });

  it("unsets other flyer header asset pictures when settings as flyer header asset picture", () => {
    const action = { type: "ASSET_PICTURE_UPDATE_FULFILLED", payload: { picture: { id: 2, isHeader: true } } };
    const state = reducer({ assetPictures: [{ id: 2 }, { id: 5, isHeader: true }] }, action);

    return expect(state.assetPictures).toEqual([
      { id: 2, isHeader: true }, { id: 5, isHeader: false },
    ]);
  });

  it("reorders pictures", () => {
    const action = { type: "ASSET_PICTURE_REORDER", meta: { oldIndex: 2, newIndex: 0 } };
    const state = reducer({ assetPictures: [{ id: 10 }, { id: 20 }, { id: 30 }] }, action);

    return expect(state.assetPictures).toEqual([{ id: 30 }, { id: 10 }, { id: 20 }]);
  });

  it("reorders pictures back", () => {
    const action = { type: "ASSET_PICTURE_REORDER", meta: { oldIndex: 0, newIndex: 2 } };
    const state = reducer({ assetPictures: [{ id: 10 }, { id: 20 }, { id: 30 }] }, action);

    return expect(state.assetPictures).toEqual([{ id: 20 }, { id: 30 }, { id: 10 }]);
  });

  it("reorders pictures four elements", () => {
    const action = { type: "ASSET_PICTURE_REORDER", meta: { oldIndex: 2, newIndex: 0 } };
    const state = reducer({
      assetPictures: [{ id: 10 }, { id: 20 }, { id: 30 }, { id: 40 }],
    }, action);

    return expect(state.assetPictures).toEqual([{ id: 30 }, { id: 10 }, { id: 20 }, { id: 40 }]);
  });

  it("reorders pictures four elements back", () => {
    const action = { type: "ASSET_PICTURE_REORDER", meta: { oldIndex: 0, newIndex: 2 } };
    const state = reducer({
      assetPictures: [{ id: 10 }, { id: 20 }, { id: 30 }, { id: 40 }],
    }, action);

    return expect(state.assetPictures).toEqual([{ id: 20 }, { id: 30 }, { id: 10 }, { id: 40 }]);
  });
});
