import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography,Button} from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import TopBar from "../TopBar";
import UserDetail from "../UserDetail";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export default function HomePage(){
    const data = jwtDecode(Cookies.get('token'))
    const changeId = (e)=>{
        newId(e)
    }
    const a = window.location.pathname.split("/")
    const [id,newId] = useState(a[2])
    return(
        <div>
            <TopBar name={data.user.first_name} />
            <UserDetail data = {[data.user]} newId={changeId}/>
        </div>
    )
}