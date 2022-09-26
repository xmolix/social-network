import React from 'react';
import classes from "../Profile.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    return (
        <div className={classes.info}>
            <img className={classes.info_panorama} src={props.defaultPanorama} alt="Panorama"/>
            {props.user.map(u =>
                <div className={classes.info_container} key={u.userId}>
                    <div className={classes.info_name}>{u.fullName}</div>
                    <div className={classes.content}>
                        <img className={"avatar avatar_large"}
                             src={u.photos.large !== null ? u.photos.large : props.defaultAvatar}
                             alt="Avatar"/>
                        <div className={classes.info_about_me}>{u.aboutMe}</div>
                    </div>
                </div>
            )}
        <ProfileStatus status={props.status}
                       myID={props.myID}
                       userID={props.profile.userId}
                       updateStatus={props.updateStatus}/>
        </div>
    )
}

export default ProfileInfo;