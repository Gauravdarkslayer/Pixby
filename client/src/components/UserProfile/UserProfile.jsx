import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

// import ProfilePic from "./profile.jpg";

const Profile = () => {
  const [userPhotos, setUserPhotos] = useState([]); // User's posts
  
  const [userData, setUserData] = useState({}); // User's data : _id, name, email

  let token = localStorage.getItem("token");

  const {userid}  = useParams();

  const axiosConfig = {
    headers: {
      "Content-type": "application/json",
      "responseType": "json",
      "Authorization": token,
    },
  };

  const fetchUserImage = async () => {
    try {
        const { data } = await axios.get(
            `http://localhost:5050/user/${userid}`,
            axiosConfig
          );
          setUserPhotos(data.posts);
          setUserData(data.user);
        
    }catch(e) {
        console.log(e)
    }
  };
  

  const followUser = (id) => {
    axios
      .put("http://localhost:5050/follow", { followId: id }, axiosConfig)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unFollowUser = (id) => {
    axios
      .put("http://localhost:5050/unfollow", { unfollowId: id }, axiosConfig)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  useEffect(() => {
    fetchUserImage();
  });

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          <img
            id="profile-image"
            
            style={{ borderRadius: "50%", margin: "2rem 4rem" }}
          />
          {/* {console.log(userData._id)} */}
          <div>
            <h4>{userData.name}</h4>
            <div style={{ display: "flex", gap: "1rem"}}>
              <h5>Post: {userPhotos.length}</h5>
              <h5>{userData.following.length} following</h5>
              <h5>{userData.followers.length} followers</h5>
            </div>
            <button onClick={()=> {followUser(userData._id)}}>Follow</button>
            <button onClick={()=> {unFollowUser(userData._id)}}>Unfollow</button>
          </div>
        </div>

        <div style={{ display: "flex" }} id="gallery">
          {userPhotos.map((item, key) => {
            return (
              <>
                <img src={item.photo} key={item._id} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
