import { api } from "./api";

export const wikiApi = {
  get: async function (word) {
    word = word.toLowerCase();

    const params = {
      action: "parse",
      section: 0,
      prop: "text",
      format: "json",
      page: word,
    };

    const res = await api.get("/api.php", { params: params });
    return res;
  },
};
