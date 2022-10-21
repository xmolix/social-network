import React, {useState} from 'react';
import classes from "../Profile.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileImage from "./ProfileImage/ProfileImage";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileData/ProfileDataForm";

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);
    const isOwner = props.myID === props.profile.userId;

    const onEditProfile = (toggle) => {
        setEditMode(toggle);
    }

    return (
        <div className={classes.info}>
            <img className={classes.info_panorama}
                 src={props.defaultPanorama} alt="Panorama"/>

            {props.user.map(u =>
                <>
                    <div className={classes.info_container} key={u.userId}>
                        <div className={classes.info_name}>{u.fullName}</div>
                        <div className={classes.content}>
                            <ProfileImage userPhoto={u.photos.large}
                                          defaultAvatar={props.defaultAvatar}
                                          isOwner={isOwner}
                                          updateImage={props.updateImage}/>
                            <div className={classes.info_about_me}>{u.aboutMe}</div>
                        </div>
                    </div>

                    <ProfileStatus status={props.status}
                                   isOwner={isOwner}
                                   updateStatus={props.updateStatus}/>

                    <div className={classes.info_data}>
                        {!editMode
                            ? <ProfileData jobSearch={u.lookingForAJob}
                                           jobDescription={u.lookingForAJobDescription}
                                           contacts={u.contacts}
                                           isOwner={isOwner}
                                           editProfile={onEditProfile}/>
                            : <ProfileDataForm fullName={u.fullName}
                                               aboutMe={u.aboutMe}
                                               jobSearch={u.lookingForAJob}
                                               jobDescription={u.lookingForAJobDescription}
                                               contacts={u.contacts}
                                               isOwner={isOwner}
                                               editProfile={onEditProfile}
                                               updateProfile={props.updateProfile}/>
                        }
                    </div>
                </>
            )}

        </div>
    )
}

export default ProfileInfo;