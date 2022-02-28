export const regexes = {
  email: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
};

export const validateByRegex = (type, value) => {
  return regexes[type].test(value);
};
