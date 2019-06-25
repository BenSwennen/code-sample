/* global hostName */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import promiseMiddleware from "redux-promise-middleware";

import {
  getPictures,
  createPicture,
  updatePicture,
  deletePicture,
} from "actions/assetPicture";

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);

describe("Asset picture actions", () => {
  it("fires start and success actions when getting asset pictures", () => {
    nock(hostName)
      .get(`/api/${version}/assets/1/pictures`)
      .reply(200, { pictures: ["here", "are", "some", "pictures"] });

    const expectedActions = [{
      type: "ASSET_PICTURES_GET_PENDING",
    }, {
      type: "ASSET_PICTURES_GET_FULFILLED",
      payload: { pictures: ["here", "are", "some", "pictures"] },
    }];

    const store = mockStore({});
    return store.dispatch(getPictures(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("fires pending and success when creating asset picure", () => {
    nock(hostName)
      .post(`/api/${version}/assets/2/pictures`)
      .reply(200, { picture: { id: 2, name: "New picture" } });

    const expectedActions = [{
      type: "ASSET_PICTURE_CREATE_PENDING",
      meta: { photo: { name: "Test file" } },
    }, {
      type: "ASSET_PICTURE_CREATE_FULFILLED",
      payload: { picture: { id: 2, name: "New picture" } },
      meta: { photo: { name: "Test file" } },
    }];

    const store = mockStore({});
    return store.dispatch(createPicture(2, { name: "Test file" })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("fires pending and success when updating asset picture", () => {
    nock(hostName)
      .patch(`/api/${version}/pictures/3`)
      .reply(200, { picture: { id: 3, name: "Updated picture" } });

    const expectedActions = [{
      type: "ASSET_PICTURE_UPDATE_PENDING",
    }, {
      type: "ASSET_PICTURE_UPDATE_FULFILLED",
      payload: { picture: { id: 3, name: "Updated picture" } },
    }];

    const store = mockStore({});
    return store.dispatch(updatePicture({ id: 3, name: "Updated picutre" })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("fires pending and success when deleting asset picture", () => {
    nock(hostName)
      .delete(`/api/${version}/pictures/4`)
      .reply(200, { info: "success" });

    const expectedActions = [{
      type: "ASSET_PICTURE_DELETE_PENDING",
      meta: { pictureID: 4 },
    }, {
      type: "ASSET_PICTURE_DELETE_FULFILLED",
      payload: { info: "success" },
      meta: { pictureID: 4 },
    }];

    const store = mockStore({});
    return store.dispatch(deletePicture(4)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
