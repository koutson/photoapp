import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography,Button } from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import { TextField } from "@mui/material";

import Cookies from 'js-cookie';

export default function LoginPage() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [location,setLocation] = useState('')
    const [description,setDescription] = useState('')
    const [occupation,setOccupation] = useState('')
    const [alert,setAlert] = useState('')
    const navigate = useNavigate();
    const sending1 = async () => {
        if(userName==''||password ==''){
            alert("fill all please")
            return
        }
        const log = {
            username : userName,
            password : password
        }
        try {
            const response = await fetch(
                'http://127.0.0.1:8081/api/account/admin/login',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(log)
                }
            )
            if(response.status == 200){
                const token = await response.json();
                setAlert("login successfully")
                Cookies.set('token', token.accessToken, { expires: 7, secure: true })
                navigate("/")
            }
            else{
                setAlert("account doesn't exits")
                console.log(error);
            }
            
        } catch (error) {
            setAlert("account doesn't exits")
            console.log(error);
        }
    }

    const sending2 = async() => {
        if(userName==''||password ==''||firstName == ''||lastName==''){
            setAlert("fill all please")
            return
        }
        if(location == ''){
            setLocation('no information')
        }
        if(description == ''){
            setDescription('no information')
        }
        if(occupation == ''){
            setOccupation('no information')
        }
        const log = {
            username : userName,
            password : password,
            first_name : firstName,
            last_name : lastName,
            location : location,
            description: description,
            occupation: occupation
        }
        await fetch(
            'http://127.0.0.1:8081/api/account/user',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(log)
            }
        ).then(function(res){ 
            if(res.status == 200){
                setAlert("register successfully")
                sending1();
            }
            else{
                setAlert("this username is already exits")
            }
        })
        .catch(function(res){ setAlert("account doesn't exits") })
    }
    if(login){
        return(
            <div onKeyDown={(e) => {
                if (e.key === "Enter")
                    sending1();
                }} style={{width: "100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <h1>Login</h1>
                <TextField onChange={(e)=>{setUsername(e.target.value)}} label="User name" variant="outlined" style={{margin:"10px"}}/>
                <TextField onChange={(e)=>{setPassword(e.target.value)}} label="Password" variant="outlined" style={{margin:"10px"}}/>
                {alert}
                <Button onClick={sending1} variant="contained" style={{marginTop:"10px"}}>Login</Button>
                <Button onClick={()=>{setLogin(false)}} variant="text" style={{marginTop:"10px"}}>go to register</Button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div style={{width: "100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <h1>Register</h1>
                <Grid spacing={2} >
                <Grid item xs={4}>
                <TextField onChange={(e)=>{setUsername(e.target.value)}} label="User name" variant="outlined" style={{margin:"10px"}}/>
                <TextField onChange={(e)=>{setPassword(e.target.value)}} label="Password" variant="outlined" style={{margin:"10px"}}/>
                </Grid>
                <Grid item xs={4}>
                <TextField onChange={(e)=>{setFirstName(e.target.value)}} label="First Name" variant="outlined" style={{margin:"10px"}}/>
                <TextField onChange={(e)=>{setLastName(e.target.value)}} label="Last Name" variant="outlined" style={{margin:"10px"}}/>
                </Grid>
                <Grid item xs={4}>
                <TextField onChange={(e)=>{setLocation(e.target.value)}} label="location" variant="outlined" style={{margin:"10px"}}/>
                <TextField onChange={(e)=>{setOccupation(e.target.value)}} label="occupation" variant="outlined" style={{margin:"10px"}}/>
                </Grid>
                <Grid item xs={4}>             
                <TextField onChange={(e)=>{setDescription(e.target.value)}} label="description" variant="outlined" style={{margin:"10px"}}/>
                </Grid>
                </Grid>
                {alert}
                <Button onClick={sending2} variant="contained" style={{marginTop:"10px"}}>Register</Button>
                <Button onClick={()=>{setLogin(true)}} variant="text" style={{marginTop:"10px"}}>go to login</Button>
                </div>
            </div>
        )
    }
}