import React from 'react';
import classes from "../../Profile.module.css";

const ProfileImage = (props) => {
    const onMainImageUpdate = (e) => {
        if (e.target.files.length) {
            props.updateImage(e.target.files[0]);
        }
    }

    return (
        <div className={`${classes.image_container} ${props.isOwner ? classes.margin : ""}`}>
            <img className={`avatar avatar_large ${classes.image}`}
                 src={props.userPhoto !== null ? props.userPhoto : props.defaultAvatar}
                 alt="Avatar"/>
            {props.isOwner && <input className={classes.update_image}
                               onChange={onMainImageUpdate}
                               type={"file"}/>}
        </div>
    );
};

export default ProfileImage;