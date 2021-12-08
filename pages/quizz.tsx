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
  {% assign products = 'Tenis,T-shirt,Jeans,Dress,Suit' | split: ',' %}

  {% for item in products %}

  {% endfor %}
`;

const INSTRUCTION_VALUE = {
  text: `
    There are some different ways to create a list of cards with product information. At the right side, you see an example using a FOR iteration declaration. 
    Modify this code to show these informations in Results panel.
  `, 
  code: `
    {% assign products = 'Tenis,T-shirt,Jeans,Dress,Suit' | split: ',' %}

    {% for item in products %}

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

        // {{ item }}
        let res = document.getElementById("result");
        console.log(res.innerText.replaceAll('\n','').replaceAll(' ',''));
        res.innerText.replaceAll('\n','').replaceAll(' ','') == 'TenisT-shirtJeansDressSuit' ? res.style.color = 'green' : res.style.color = 'red'
        
      });
  }
  const options={
    miniMap:'false',
    wordWrap: 'on'
  };
  return (
    <Grid container sx={{ minHeight: '100%'}} rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4} >
        <Box sx={{ typography: 'h6', ml: 1, width: 1, color: 'grey', borderBottom: 1, borderColor: 'grey', justifyContent: 'space-around'}}>
          Instructions
        </Box>
        <Box sx={{ ml: 1, width: 1, color: 'black', justifyContent: 'space-around'}}>
          {INSTRUCTION_VALUE.text}<br/><br/>
          {INSTRUCTION_VALUE.code}
        </Box>        
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
        <Box sx={{ typography: 'h6', ml: 1, width: 1, color: 'grey', borderBottom: 1, borderColor: 'grey', justifyContent: 'space-around'}}>
          Tests
        </Box>
        <Box sx={{ ml: 1, width: 1, color: 'black', justifyContent: 'space-around'}}>
          
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ typography: 'h6', m: 0, width: 1, color: 'grey', borderBottom: 1, borderColor: 'grey', justifyContent: 'space-around'}}>
          Results
        </Box>
        <div id='result' dangerouslySetInnerHTML={{__html: `${liquidHtml!=undefined?liquidHtml:''}`}} />
      </Grid>
    </Grid>
  );
}
