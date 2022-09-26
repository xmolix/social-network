import React from 'react';
import classes from "../Profile.module.css";
import SendPostContainer from "./SendPost/SendPostContainer";

const ProfilePosts = (props) => {
    return (
        <>
            <hr className={classes.hr}/>
            <SendPostContainer/>
            <div className={classes.posts}>
                {[...props.posts].reverse().map(p =>
                    <div className={classes.post} key={p.id}>
                        <div className={classes.post_name}>{p.name}</div>
                        <div className={classes.post_content}>
                            <img className={"avatar avatar_small"} src={props.defaultAvatar} alt="Avatar"/>
                            <div className={classes.post_text}>{p.post}</div>
                        </div>
                        <div className={classes.post_like_count}>Like - <span>{p.likesCount}</span></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePosts;