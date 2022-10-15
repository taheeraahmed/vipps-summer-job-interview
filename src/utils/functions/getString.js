export const getString = (data) => {
  let str = data.toString();
  str = str.toLowerCase();
  // Remove styling
  str = str.replace(/(<style[\w\W]+style>)/g, "");
  // Remove HTML tags
  str = str.replace(/<\/?[^>]+(>|$)/g, "");
  return str;
};
