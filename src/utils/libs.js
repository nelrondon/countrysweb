export const normalize = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\s+/g, "-")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .trim();
};

export const titleCase = (name) => {
  return name
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
