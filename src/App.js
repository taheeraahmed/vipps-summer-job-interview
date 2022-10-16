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
  const [loading, setLoading] = useState(false);
  const [searchedTerms, setSearchedTerms] = useState([]);

  // For handling the input field button
  const handleClick = (event) => {
    setWord(textFieldWord);
  };

  useEffect(() => {
    setLoading(false);
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
    setLoading(true);

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
    setSearchedTerms([...searchedTerms, textFieldWord]);
    console.log(searchedTerms);
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
          <h1>Loading...</h1>
        ) : word ? (
          <>
            {confetti && !err ? (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            ) : null}
            <h3>The word you are searching for</h3>
            <h2>✨{word} ✨</h2>
            {err ? <p>No match found</p> : <p>Word count: {count}</p>}
            {data ? (
              <div className="data">
                <Card padding={1}>
                  <p>{getHighlightedText(data, word)}</p>
                </Card>
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
