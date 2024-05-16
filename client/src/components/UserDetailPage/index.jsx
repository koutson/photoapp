import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography,Button} from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import TopBar from "../TopBar";
import UserDetail from "../UserDetail";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export default function UserDetailPage(){
    const a = window.location.pathname.split("/")
    const [id,newId] = useState(a[2])
    const name = jwtDecode(Cookies.get('token'))
    const [data,setData] = useState([name])
    useEffect(() => {
        try {
        const callData = async()=>{
            const tmp = await fetch(`http://127.0.0.1:8081/api/user/${id}`,
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

    const changeId = (e)=>{
        newId(e)
    }
    return(
        <div>
            <TopBar name={name.user.first_name} />
            <UserDetail data={data} newId={changeId}/>
        </div>
    )
}