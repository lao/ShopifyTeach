import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function About() {
  function handleEditorChange(value, event) {
    document.getElementById("result").innerHTML = value.replace("<div", "<br").replace("</div>", "");
  }

return (
  <Grid container sx={{ my: 1}}>
    <Grid item xs="auto">
      instructions here
    </Grid>
    <Grid item xs={6} sx={{border: '1px solid grey'}} >
        <Editor height="90vh"
        defaultLanguage="liquid"
        defaultValue="{% comment %}{% endcomment %}"
        onChange={handleEditorChange}
      />
    </Grid>
    <Grid item xs>
      results
    </Grid>
  </Grid>
);

}
