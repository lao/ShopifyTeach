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
    <Container maxWidth="xl">
      <Box sx={{ my: 4, border: '1px solid grey' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            instructions
          </Grid>
          <Grid item xs={8}>
            <Editor height="50vh"
            defaultLanguage="liquid"
            defaultValue="//code here"
            onChange={handleEditorChange}
          />
          </Grid>
          <Grid item xs={4}>
            tips
          </Grid>
          <Grid item xs={8}>
            results
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
