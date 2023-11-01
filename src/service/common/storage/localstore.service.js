const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getItem = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
};

const remove = (key) => {
  localStorage.removeItem(key);
};

export { setItem, getItem, remove };
