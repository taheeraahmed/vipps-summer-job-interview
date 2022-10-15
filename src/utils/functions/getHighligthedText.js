export const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? {
                  fontWeight: "bold",
                  color: "#1976d2",
                }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};
