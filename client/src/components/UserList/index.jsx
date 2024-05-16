import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Paper
} from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
import Cookies from 'js-cookie';

/**
 * Define UserList, a React component of Project 4.
 */
function UserList(props) {
  //-----------fetch API-------------------
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/api/user/list",
          {
            method:"GET",
            headers: {Authorization: `Bearer ${Cookies.get('token')}`},
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const change = (id,name)=>{
    const a = window.location.pathname.split("/")
    if(a[1] == 'photos'){
      navigate(`/photos/${id}`)
      props.chooseName(id,name)
    }
    else{
      navigate(`/user/${id}`)
      props.newId(id)
    }
  }
  //----------end fetch API----------------
  return (
    <div>
      <Typography variant="body1">User List</Typography>
      <List component="nav">
        {data ? (
          <div>
          {data.map(item => (
            <Paper key={item._id}>
            <Button onClick={()=>change(item.user_id,item.first_name)} variant="contained" style={{margin:"5px",color:"white",textDecoration:"none",minWidth:"100px"}}>
              {item.first_name}
            </Button>
            <Divider />
          </Paper>
          ))}
        </div>
        ):{

        }
      }
      </List>
      <Typography variant="body1">
        End
      </Typography>
    </div>
  );
}

export default UserList;
