import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Card, TextField } from "@mui/material";
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

  // For handling the input field button
  const handleClick = (event) => {
    setWord(textFieldWord);
  };

  useEffect(() => {
    setConfetti(true);
    setCount(countWords(data, word));
  }, [data]);

  // For handling confetti
  useEffect(() => {
    let timeout;
    if (confetti) {
      timeout = setTimeout(() => setConfetti(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [confetti]);

  // For handling the API call
  useEffect(() => {
    wikiCount
      .get(word)
      .then((res) => {
        if (res.data.error) {
          setErr(true);
          setData("");
        } else {
          setErr(false);
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
        <Card>
          <TextField
            label="Enter a word"
            onChange={(e) => setTextFieldWord(e.target.value)}
          />
        </Card>
        <Button onClick={(e) => handleClick(e)}>Search</Button>
        {word ? (
          <>
            {confetti ? (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            ) : null}
            <h3>The word you are searching for: {word}</h3>
          </>
        ) : null}
        {err ? <p>No match found</p> : <p>Word count: {count}</p>}
        {data ? (
          <div className="data">
            <Card padding={1}>
              <p>{getHighlightedText(data, word)}</p>
            </Card>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
