export const cleanTags = (tags) => {
  if (!tags) return "";

  // If it's an array, clean and join
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  }

  // If it's a string, split then clean
  return tags
    .split(", ")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};
