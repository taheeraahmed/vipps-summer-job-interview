import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import { wikiCount } from "./api/wikiCount";

function App() {
  const [word, setWord] = useState("");

  useEffect(() => {
    wikiCount
      .get(word)
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
          onChange={(e) => setWord(e.target.value)}
          label="Enter a word"
        />
      </header>
    </div>
  );
}

export default App;
