import { api } from "./api";

const stripResponse = (response) => {
  const { data } = response.parse;
  const text = data.text;
  const { "*": textString } = text;
  return textString;
};

export const wikiCount = {
  get: async function (word) {
    word = word.toLowerCase();
    
    const params = {
      action: "parse",
      section: 0,
      prop: "text",
      format: "json",
      page: word,
    };

    const res = api.get("/api.php", { params: params });
    return res;
  },
};
