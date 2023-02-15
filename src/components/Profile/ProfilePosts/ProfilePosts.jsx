import React from 'react';
import classes from "../Profile.module.css";
import SendPostContainer from "./SendPost/SendPostContainer";
import trash from "../../../img/trash.png";
import like from "../../../img/like.svg";
import dislike from "../../../img/dislike.svg";
import {actions} from "../../../redux/reducers/usersReducer";

const ProfilePosts = (props) => {
    const likeCountColor = (count) => {
        return count !== 0
            ? classes.like_count_color_green
            : classes.like_count_color_gray;
    }
    const dislikeCountColor = (count) => {
        return count !== 0
            ? classes.like_count_color_red
            : classes.like_count_color_gray;
    }


    const handlerLike = (id, event) => {
        if (event.target.checked) {
            props.actions.setLikePlusPost(id);
        } else {
            props.actions.setLikeMinusPost(id);
        }

        let findInput = document.querySelectorAll(`input[name]`);
        findInput.forEach(i => {
            if (i.name == id && i.value == 2 && i.checked == true) {
                i.checked = false;
                props.actions.setDislikePlusPost(id);
            }
        });
    };
    const handlerDislike = (id, event) => {
        if (event.target.checked) {
            props.actions.setDislikeMinusPost(id);
        } else {
            props.actions.setDislikePlusPost(id);
        }

        let findInput = document.querySelectorAll(`input[name]`);
        findInput.forEach(i => {
            if (i.name == id && i.value == 1 && i.checked == true) {
                i.checked = false;
                props.actions.setLikeMinusPost(id);
            }
        });
    };

    const likeLight = (bool) => bool ? classes.green : classes.gray;
    const dislikeLight = (bool) => bool ? classes.red : classes.gray;

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
                                <div className={`${classes.like_dislike} ${classes.like} ${likeLight(p.lightLike)}`}>
                                    <img className={classes.like_icon} src={like} alt="Like"/>
                                    <input className={classes.like_checkbox} type="checkbox" name={p.id}
                                           value={1} onClick={(e) => {handlerLike(p.id, e)}}/>
                                    <span className={likeCountColor(p.likesCount)}>{p.likesCount}</span>
                                </div>
                                <div className={`${classes.like_dislike} ${classes.dislike} ${dislikeLight(p.lightDislike)}`}>
                                    <img className={classes.dislike_icon} src={dislike} alt="Dislike"/>
                                    <input className={classes.dislike_checkbox} type="checkbox" name={p.id}
                                           value={2} onClick={(e) => {handlerDislike(p.id, e)}}/>
                                    <span className={dislikeCountColor(p.dislikeCount)}>{p.dislikeCount}</span>
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