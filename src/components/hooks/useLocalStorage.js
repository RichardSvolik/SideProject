const useLocalStorage = (items) => {
  localStorage.clear();
  localStorage.setItem("items", JSON.stringify(items));
};

export default useLocalStorage;
