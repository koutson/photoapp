import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography ,Button} from "@mui/material";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const name = props.name
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" color="inherit">
             Hi {name}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={()=>{Cookies.remove("token")}} variant="contained">log out</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;
