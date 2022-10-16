import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { wikiApi } from "./utils/api/wikiApi";
import Confetti from "react-confetti";
import { countWords } from "./utils/functions/countWords";
import { getString } from "./utils/functions/getString";
import { getHighlightedText } from "./utils/functions/getHighligthedText";
import getImage from "./utils/functions/getImage";

function App() {
  const [word, setWord] = useState("");
  const [textFieldWord, setTextFieldWord] = useState("");
  const [data, setData] = useState("");
  const [err, setErr] = useState(false);
  const [count, setCount] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  // For handling the input field button
  const handleClick = (event) => {
    setWord(textFieldWord);
  };

  // For handling the data from the API
  useEffect(() => {
    setLoading(false);
    setConfetti(true);
    setCount(countWords(data, word));
  }, [data, word]);

  // For handling confetti
  useEffect(() => {
    let timeout;
    if (confetti) {
      timeout = setTimeout(() => setConfetti(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [confetti]);

  // For handling the API call
  useLayoutEffect(() => {
    setLoading(true);

    wikiApi
      .get(word)
      .then((res) => {
        if (res.data.error) {
          setErr(true);
          setData("");
        } else {
          setErr(false);
          setData(getString(res.data.parse.text["*"]));
          setImage(getImage(res.data.parse.text["*"]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [word]);

  return (
    <div className="App">
      <div className="body">
        <h1>Write a word</h1>
        <TextField
          label="Enter a word"
          onChange={(e) => setTextFieldWord(e.target.value)}
        />
        <Button onClick={(e) => handleClick(e)}>Search</Button>
        {loading ? (
          <Typography variant="h1">Loading...</Typography>
        ) : word ? (
          <>
            {confetti && !err ? (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            ) : null}

            {err ? (
              <Typography>No match found</Typography>
            ) : (
              <Typography variant="h3">Word count: {count}</Typography>
            )}
            {data && count > 0 ? (
              <div className="data">
                <Paper elevation={3} sx={{ padding: 5 }}>
                  <Typography variant="h2">✨ {word} ✨</Typography>
                  {image !== "" ? (
                    <img src={image} alt="wiki" className="image" />
                  ) : null}
                  <Typography>{getHighlightedText(data, word)}</Typography>
                </Paper>
              </div>
            ) : null}
          </>
        ) : null}
        <br />
      </div>
    </div>
  );
}

export default App;
