export const generateSlug = (name, id) => {
  return `${name.toLowerCase().replace(/ /g, "-")}/${id}`;
};
