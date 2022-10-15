import { capitalize } from "./capitalize";

export const countWords = (str, word) => {
  // Search for the word in the string
  let count = str.match(new RegExp(word, "g"));
  if (count !== null) {
    count = str.match(new RegExp(word, "g")).length;
  } else {
    count = 0;
  }
  return count;
};
