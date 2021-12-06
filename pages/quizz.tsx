import React, { useState } from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react"; //Monaco Editor
import { Liquid } from "liquidjs"; //Liquid Javascript module

const engine = new Liquid({
  extname: ".html",
  cache: false,
});

const DEFAULT_VALUE = `
  {% assign favorite_food = "pizza" %}
  {% assign age = 35 %}

  {% capture about_me %}
  I am {{ age }} and my favorite food is {{ favorite_food }}.
  {% endcapture %}

  {{ about_me }}

`;

const INSTRUCTION_VALUE = `
  Write some code!
  The code in the editor panel is written in a programming language known as JavaScript, but that detail isn’t too important right now—it’s time to start writing your own code!

  When you run your code in this exercise, we’ll run some tests to make sure that you’ve added or changed the code correctly. If something’s not right, you’ll see an error message at the bottom of the code editor. If everything is good, you’ll be able to move on!
`;

export default function QuizzEnv() {
  const [liquidTxt, setLiquidTxt] = useState(DEFAULT_VALUE);
  const [liquidHtml, setLiquidHtml] = useState();



  function handleEditorChange(value: any, event: any) {
    console.log(liquidTxt);
    console.log(value,event);
    setLiquidTxt(value);
  }
  
  function runCode() {
    console.log('hello from the button')
    let ctx = {
      extname: '.liquid',
      globals: { title: 'Code runner' }
    };

    engine
      .parseAndRender(liquidTxt, ctx)
      .then(function (html) {
        setLiquidHtml(html);
      });
  }

  return (
    <Grid container sx={{ my: 1}}>
      <Grid item xs={3} >
        {INSTRUCTION_VALUE}
      </Grid>
      <Grid item xs={6} sx={{ border: "1px solid grey" }}>
        <Editor
          height="90vh"
          defaultLanguage="liquid"
          defaultValue={DEFAULT_VALUE}
          onChange={handleEditorChange}
        />
      </Grid>
      <Grid item xs={3}>
        <p id="run_results">{liquidHtml}</p>
        <Button variant="contained" onClick={runCode}>
          Run
        </Button>
      </Grid>
    </Grid>
  );
}
