export default (arr, id) => (
  arr.filter(el => el.id !== parseInt(id, 10))
);
