const useLocalStorage = (items) => {
  localStorage.clear();
  // you probably do not want to clear the whole storage but only one item
  // there is different method to do that
  localStorage.setItem("items", JSON.stringify(items));
};

export default useLocalStorage;
