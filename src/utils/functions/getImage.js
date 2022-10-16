const getImage = (data) => {
  const parts = data.split(new RegExp(`<img([]+?)/>`, "gi"));
  const images = parts.filter((part) => part.includes("src="));
  const image = images[0];
  const src = image.split("src=")[1];
  const srcParts = src.split('"');
  const srcFinal = srcParts[1];
  return srcFinal;
};

export default getImage;
