import { Chip, Typography } from "@mui/material";

export const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <Typography>
      {" "}
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return (
            <Chip
              key={i}
              className="highlight"
              label={part}
            />
          );
        } else {
          return part;
        }
      })}
    </Typography>
  );
};
