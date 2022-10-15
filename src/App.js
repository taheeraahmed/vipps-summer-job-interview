import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { wikiCount } from "./utils/api/wikiCount";
import Confetti from "react-confetti";
import { countWords } from "./utils/functions/countWords";
import { getString } from "./utils/functions/getString";
import { getHighlightedText } from "./utils/functions/getHighligthedText";

function App() {
  const [word, setWord] = useState("");
  const [textFieldWord, setTextFieldWord] = useState("");
  const [data, setData] = useState("");
  const [err, setErr] = useState(false);
  const [count, setCount] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const handleClick = (event) => {
    setWord(textFieldWord);
    setConfetti(false);
    setCount(countWords(data, word));
  };

  useEffect(() => {
    wikiCount
      .get(word)
      .then((res) => {
        if (res.data.error) {
          setErr(true);
          setCount(0);
          setData("");
        } else {
          setErr(false);
          setConfetti(true);
          setData(getString(res.data.parse.text["*"]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [word]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Write a word</h1>
        <TextField
          label="Enter a word"
          onChange={(e) => setTextFieldWord(e.target.value)}
        />
        <Button onClick={(e) => handleClick(e)}>Search</Button>
        {word ? (
          <>
            <h3>The word you are searching for: {word}</h3>
          </>
        ) : null}
        {err ? <p>No match found</p> : <p>Word count: {count}</p>}
        {data ? (
          <div className="data">
            <p>{getHighlightedText(data, word)}</p>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
