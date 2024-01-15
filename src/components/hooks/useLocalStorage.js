const useLocalStorage = (items) => {
  localStorage.removeItem("items");
  // otherwise you remove the whole storage, it can be used by different components, plugins
  localStorage.setItem("items", JSON.stringify(items));
};

export default useLocalStorage;
