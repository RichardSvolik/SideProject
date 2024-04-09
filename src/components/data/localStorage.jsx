export const setLocalStorageData = (items) =>
  localStorage.setItem("items", JSON.stringify(items));

export const getLocalStorageData = () =>
  JSON.parse(localStorage.getItem("items"));
