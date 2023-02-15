import React, {FC, memo} from 'react';
import classes from "../Users.module.css";
import {NavLink} from "react-router-dom";
import cn from "classnames";
import {setFollow, setUnfollow} from "../../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getDisabled, getUsersArray} from "../../../redux/selectors/usersSelector";
import {getAvatar} from "../../../redux/selectors/appSelector";
import {AppDispatch} from "../../../redux/store";

export const User: FC = memo(() => {

    const users = useSelector(getUsersArray)
    const defaultAvatar = useSelector(getAvatar)
    const isDisabled = useSelector(getDisabled)

    const dispatch: AppDispatch = useDispatch()

    return (
        <>
            { users.map(u =>
                <div className={classes.user} key={u.id}>
                    <NavLink className={classes.user_link} to={`/profile/${u.id}`}>
                        <div className={classes.user_container}>
                            <div className={classes.user_name}>{ u.name }</div>
                            <div className={classes.user_contents}>
                                <div className={classes.content_one}>
                                    <img className={"avatar avatar_medium"}
                                         src={ u.photos.large ? u.photos.large : defaultAvatar }
                                         alt="Avatar"/>
                                    <div className={classes.user_status}>{ u.status }</div>
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
                        ? <button className={cn(classes.followed_btn, classes.unfollow)}
                                  onClick={() => void dispatch( setUnfollow(u.id) )}
                                  disabled={isDisabled.some(id => id === u.id)} />
                        : <button className={cn(classes.followed_btn, classes.follow)}
                                  onClick={() => void dispatch( setFollow(u.id) )}
                                  disabled={isDisabled.some(id => id === u.id)} />
                    }
                </div>
            ) }
        </>
    )
})