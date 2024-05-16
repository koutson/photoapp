import React, { useState, useEffect } from "react";
import { Typography, Paper, Button } from "@mui/material";
import models from "../../modelData/models";

import "./styles.css";
import { useParams } from "react-router-dom";
import UserList from "../UserList";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail(props) {
    const user = props.data[0]
    return (
      <div style={{display:"flex",width:"100vw",justifyContent:"space-between"}}>
        <UserList newId = {props.newId}/>
        <Paper elevation={3} style={{ padding: 20, margin: 20,width:"80vw" }}>
          <Typography variant="h6">User Information</Typography>
          {/* <Typography variant="body1">ID: {data[0].}</Typography> */}
          <Typography variant="body1">FistName: {user.first_name}</Typography>
          <Typography variant="body1">LastName: {user.last_name}</Typography>
          <Typography variant="body1">
            Description: {user.description}
          </Typography>
          <Typography variant="body1">Occupation: {user.occupation}</Typography>
          <Button
            variant="contained"
            component="a"
            href={`/photos/${user._id}`}
            id="btn"
            >
            Picture Album
          </Button>
        </Paper>
      </div>
    );
}

export default UserDetail;
