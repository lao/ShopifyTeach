import React, { useState } from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//Code prettier component


import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react"; //Monaco Editor
import { Liquid } from "liquidjs"; //Liquid Javascript module

const engine = new Liquid({
  extname: ".html",
  cache: false,
});

const DEFAULT_VALUE = `
  {% assign products = 'Tenis,T-shirt,Jeans,Dress,Suite,' | split: ',' %}

  {% for item in products %}
    <p> {{ item }} </p>
  {% endfor %}
`;

const INSTRUCTION_VALUE = {
  text: `
    There are some different ways to create a list of cards with product information. At the right side, you see an example using a FOR iteration declaration. Modify this code to show 10 cards using a different iteration declaration.
  `, 
  code: `
    {% assign products = 'Tenis,T-shirt,Jeans,Dress,Suite,' | split: ',' %}

    {% for item in products %}
      <p> {{ item }} </p>
    {% endfor %}

  `
};

export default function QuizzEnv() {
  const [liquidTxt, setLiquidTxt] = useState(DEFAULT_VALUE);
  const [liquidHtml, setLiquidHtml] = useState();



  function handleEditorChange(value: any, event: any) {
    console.log(liquidTxt);
    console.log(value,event);
    setLiquidTxt(value);
  }
  
  function runCode() {
    
    // let ctx = {
    //   extname: '.html',
    //   globals: { title: 'Code runner' }
    // };

    engine
      .parseAndRender(liquidTxt)
      .then(function (html) {
        setLiquidHtml(html);
      });
  }
  const options={
    miniMap:'false',
    wordWrap: 'on'
  };
  return (
    <Grid container sx={{ minHeight: '100%'}} rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4} >
        <Box sx={{ typography: 'h6',p: 1, margin: 0, width: 1, bgcolor: '.main',boxShadow: 1, borderRadius: 1, justifyContent: 'space-around'}}>
          Instructions
        </Box>
        <p>{INSTRUCTION_VALUE.text}</p>
        {INSTRUCTION_VALUE.code}
      </Grid>
      <Grid item xs={6}>
        <Button size="small" variant="contained" color="primary" onClick={runCode}>
            Run
        </Button>
        <Editor
          height="50vh"
          theme="vs-dark"
          defaultLanguage="liquid"
          defaultValue={DEFAULT_VALUE}
          options={options}
          onChange={handleEditorChange}
        />
      </Grid>
      <Grid item xs={4}>

        <Box sx={{ typography: 'h6',p: 1, margin: 0, width: 1, bgcolor: '.main',boxShadow: 1, borderRadius: 1, justifyContent: 'space-around'}}>
              Tests
        </Box>

      </Grid>
      <Grid item xs={6}>

        <Box sx={{ typography: 'h6',p: 1, margin: 0, width: 1, bgcolor: '.main',boxShadow: 1, borderRadius: 1, justifyContent: 'space-around'}}>
              Results
          </Box>
        <div dangerouslySetInnerHTML={{__html: `${liquidHtml}`}} />
      </Grid>
    </Grid>
  );
}
