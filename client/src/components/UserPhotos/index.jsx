import React, { useState, useEffect } from "react";
import { Typography, Paper,Button } from "@mui/material";
import models from "../../modelData/models";
import Cookies from 'js-cookie';
import "./styles.css";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const [data,setData] = useState(() => {
    // Check if props.photo exists and return it, otherwise return null
    return props.photo ? props.photo : [];
  })

  
  const user = jwtDecode(Cookies.get('token'))
  const [check,setCheck] = useState(true)

  useEffect(() => {
    if(props.photo){
      console.log( props.photo);
      setData(props.photo)
    }
  }, [props.photo]);

  useEffect(()=>{
    if(props.id != user.user.user_id){
      setCheck(false)
    }
    else{
      setCheck(true)
    }
  },[props.id])


  const [comment,setComment] = useState('');


  const [photo,setPhoto] = useState();

  const send = async()=>{
    setData(props.photo)
    console.log(props.photo[0]);
    const chose = document.getElementById("avatar");
    if (chose.files.length == 1) {
      try {
        const response = await fetch(
          'http://127.0.0.1:8081/api/photos/new',{
              method:'POST',
              headers: {Authorization: `Bearer ${Cookies.get('token')}`},
              body: photo
            }
          )
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      alert("you haven't chose photo yet")
    }
  }

  const choseFile =()=>{
    const chose = document.getElementById("avatar");
    chose.click();
    chose.addEventListener("change", () => {
      if (chose.files.length == 1) {
        const image = document.getElementById("avatar").files[0]
        console.log(image);
        setPhoto(image)
        alert("chose photo success")
      }
    });
  }

  const goComment = async(photoId) =>{
      try {
        const sentComment = {
          comment: comment,
          user_id: user.user.user_id
        }
        const response = await fetch(
          `http://127.0.0.1:8081/api/photos/commentsOfPhoto/${photoId}`,{
              method:'POST',
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(sentComment)
            }
          )
      }
      catch(err){
        console.log(err);
      }  
  }
  // Kiểm tra nếu mảng detail không stồn tại hoặc rỗng
return (
  <div>{check?
    <div style={{width:"65vw",marginTop:"15px",height:"36.5px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Button onClick={send} style={{margin:"0px 10px"}} variant="contained">Upload</Button>
      <Button variant="contained" onClick={choseFile}>Chose photo</Button>
      <input style={{display:"none"}} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
    </div>:
      <div style={{width:"65vw",marginTop:"15px",height:"36.5px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      </div>
    }
    {
      data.length > 0 ? (
        <div>

    { data.map(item => (
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 20 }}
        key={item._doc._id}
      >
        <Typography variant="h6">User Photo Information</Typography>
        {/* <Typography variant="body1">User ID: {item._doc.user_id}</Typography>
        <Typography variant="body1">Photo ID: {item._doc._id}</Typography> */}
        <Typography variant="body1">
          Creater: {props.name}
        </Typography>
        <Typography variant="body1">DateTime: {item._doc.date_time}</Typography>
        <img
          src={`data:image/png;base64,${item.base64}`}
          alt="error"
          style={{objectFit:"cover",width:"100%",height:"auto"}}
        />
        <Paper style={{display:"flex",flexDirection:"column"}}>
            <Typography variant="body1">
              Comment:
            </Typography>
            <textarea onChange={(e)=>{
              setComment(e.target.value)
            }} style={{minHeight:"100px",margin:"10px"}}>

            </textarea>
            <Paper style={{display:"flex",justifyContent:"end"}}>
              <Button onClick={()=>{goComment(item._doc._id)}} variant="contained"> Comment</Button>
            </Paper>
          </Paper>
          {item._doc.comments &&
          item._doc.comments.length > 0 &&
          item._doc.comments.map((cmt) => (
            <Paper
              elevation={3}
              style={{ padding: 20, margin: 20 }}
              key={cmt._id}
            >
              {/* <Typography variant="body1">Comment ID: {cmt._id}</Typography> */}
              {/* <a href={`/users/${cmt.user_id}`}> */}
                <Typography variant="body1">
                  User Comment: {cmt.user_id}
                </Typography>
              {/* </a> */}
              <Paper style={{minHeight:"50px",height:"auto",textWrap:"wrap"}}>
                {cmt.comment}
              </Paper>
              <Typography variant="body2">
                Comment Time: {cmt.date_time}
              </Typography>
            </Paper>
          ))}
      </Paper>
    ))}</div>
  ):
    (
      <p>No photos available.</p>
    )}
  </div>
  )
}
export default UserPhotos;
