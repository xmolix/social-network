import React from 'react';
import classes from "../Profile.module.css";
import SendPostContainer from "./SendPost/SendPostContainer";
import trash from "../../../img/trash.png";
import like from "../../../img/like.svg";
import dislike from "../../../img/dislike.svg";

const ProfilePosts = (props) => {
    const likeCountColor = (count) => {
        return count >= 0
            ? classes.like_count_color_green
            : classes.like_count_color_red;
    }

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
                        <div className={classes.post_options}>
                            <div className={classes.post_like_count}>
                                Like - <span className={likeCountColor(p.likesCount)}>{p.likesCount}</span>
                                <div className={classes.like_dislike_container}>
                                    <button className={`${classes.like_dislike_btn} ${classes.like_btn}`}
                                            onClick={() => {props.likePost(p.id)}}>
                                        <img className={classes.like_dislike_img} src={like} alt="Like icon"/>
                                    </button>
                                    <button className={`${classes.like_dislike_btn} ${classes.dislike_btn}`}
                                            onClick={() => {props.dislikePost(p.id)}}>
                                        <img className={classes.like_dislike_img} src={dislike} alt="Dislike icon"/>
                                    </button>
                                </div>
                            </div>
                            <button className={classes.btn_delete}
                                    onClick={() => {props.deletePost(p.id)}}>
                                <img className={classes.trash} src={trash} alt="Trash icon"/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePosts;