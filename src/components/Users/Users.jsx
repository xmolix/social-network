import React from 'react';
import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";

const Users = (props) => {
    return (
        <div className={classes.users}>
            {props.users.map(u =>
                <div className={classes.user} key={u.id}>
                    <NavLink className={classes.user_link} to={`/profile/${u.id}`}>
                        <div className={classes.user_container}>
                            <div className={classes.user_name}>{u.name}</div>
                            <div className={classes.user_contents}>
                                <div className={classes.content_one}>
                                    <img className={"avatar avatar_medium"}
                                         src={u.photos.large ? u.photos.large : props.defaultAvatar}
                                         alt="Avatar"/>
                                    <div className={classes.user_status}>{u.status}</div>
                                </div>
                                <div className={classes.content_two}>
                                    <div className={classes.location}>
                                        u.country, u.city
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                    {u.followed
                        ? <button className={`${classes.followed_btn} ${classes.unfollow}`}
                                  onClick={() => props.setUnfollow(u.id)}
                                  disabled={props.isDisabled.some(id => id === u.id)}/>
                        : <button className={`${classes.followed_btn} ${classes.follow}`}
                                  onClick={() => props.setFollow(u.id)}
                                  disabled={props.isDisabled.some(id => id === u.id)}/>
                    }
                </div>
            )}
            <div className={classes.pagination}>
                {props.currentPage > 11 && props.totalPages - 1 > props.currentPage + 9 &&
                    <button className={classes.pagination_btn}
                            onClick={() => props.firstPage()}>&lt;&lt;</button>
                }

                {props.pagination.map(p =>
                        <button className={`${classes.pagination_btn} 
                                            ${props.currentPage === p ? classes.active_page : ""}`}
                                onClick={() => props.pageChange(p)}
                                key={p}>{p}</button>
                )}

                {props.totalPages - 1 > props.currentPage + 10 &&
                    <button className={classes.pagination_btn}
                            onClick={() => props.lastPage()}>&gt;&gt;</button>
                }
            </div>
        </div>
    )
}

export default Users;