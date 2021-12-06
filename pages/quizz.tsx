import React, { useState } from "react";

// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';

//Material UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { Liquid } from "liquidjs";

const engine = new Liquid({
  extname: ".html",
  cache: false,
});

const DEFAULT_VALUE = `
<h1>Isso deve ser rendered</h1>
<h2>{{ page_title }}</h2>
<ul>
  {%- for collection in collections -%}
    <li>
      <!--
        These control flow tags check to see if there is a featured image for a collection.
        If there isn't one, then we assign the image from the first product in the collection.
      -->
      {%- if collection.image -%}
        {%- assign collection_image = collection.image -%}
      {%- elsif collection.products.first and collection.products.first.images != empty -%}
        {%- assign collection_image = collection.products.first.featured_image -%}
      {%- else -%}
        {%- assign collection_image = blank -%}
      {%- endif -%}

      <a href="{{ collection.url }}">
        <img src="{{ collection_image | img_url: '480x' }}" alt="">
        {{ collection.title }}
      </a>
    </li>
  {%- endfor -%}
</ul>

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
      page_title: "Liquid",
      date: new Date(),
    };

    engine
      .parseAndRender(liquidTxt, ctx)
      .then(function (html) {
        setLiquidHtml(html);
      });
  }

  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs="auto">
        instructions here
      </Grid>
      <Grid item xs={6} sx={{ border: "1px solid grey" }}>
        <Editor
          height="90vh"
          defaultLanguage="liquid"
          defaultValue={DEFAULT_VALUE}
          onChange={handleEditorChange}
        />
      </Grid>
      <Grid item xs>
        <p id="run_results">{liquidHtml}</p>
        <Button variant="contained" onClick={runCode}>
          Run
        </Button>
      </Grid>
    </Grid>
  );
}
