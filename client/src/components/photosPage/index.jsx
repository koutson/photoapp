import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography,Button} from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import TopBar from "../TopBar";
import UserDetail from "../UserDetail";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import UserPhotos from "../UserPhotos";
import UserList from "../UserList";

export default function PhotosPage(){
    const user = jwtDecode(Cookies.get('token'))
    const [data, setData] = useState(null);
    const a = window.location.pathname.split("/")
    const [name,setName] = useState(user.user.first_name);
    const [id,setId] = useState(a[2]);
    const chooseName = (newId,firstName) => {
        setName(firstName)
        setId(newId)
    };
    useEffect(() => {
        try {
        const callData = async()=>{
            const tmp = await fetch(`http://127.0.0.1:8081/api/photos/photosOfUser/${id}`,
                {
                method: "GET",
                headers: {Authorization: `Bearer ${Cookies.get('token')}`},
                }
            )
            const response = await tmp.json()
            setData(response)
        }
        callData()
        } catch (error) {
        console.log(error);
        }
    },[id])

    return(
        <div>
            <TopBar name={user.user.first_name} />
            <div style={{display:"flex",width:"100vw"}}>
                <UserList chooseName={chooseName}/>
                <UserPhotos photo={data} name={name} id={id}/>
            </div>
        </div>
    )
}