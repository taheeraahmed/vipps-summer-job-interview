export const countWords = (str, word) => {
  // Search for the word in the string
  let count = str.match(new RegExp(word, "g"));
  if (count) {
    count = str.match(new RegExp(word, "g")).length;
  } else {
    count = 0;
  }
  console.log(count);
  return count;
};
