import { authFetch, authBinaryFetch, createForm, convertToJson } from "utils";

export const getAll = assetID => (
  authFetch(`${apiUrl}${version}/assets/${assetID}/pictures`, {
    method: "GET",
  })
);

export const create = (assetID, photo) => (
  authBinaryFetch(`${apiUrl}${version}/assets/${assetID}/pictures`, {
    method: "POST",
    body: createForm({ picture: { photo } }),
  }).then(res => convertToJson(res))
);

export const update = picture => (
  authFetch(`${apiUrl}${version}/pictures/${picture.id}`, {
    method: "PATCH",
    json: { picture },
  })
);

export const destroy = id => (
  authFetch(`${apiUrl}${version}/pictures/${id}`, {
    method: "DELETE",
  })
);
