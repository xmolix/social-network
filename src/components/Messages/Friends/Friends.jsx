import React from 'react';
import classes from "../Messages.module.css";
import {NavLink} from "react-router-dom";

const Friends = (props) => {
    const setActive = active => active.isActive ? classes.active : "";

    return (
        <>
            {props.friend.map(f =>
                <div className={classes.friend} key={f.id}>
                    <NavLink className={setActive} to={`/messages/${f.id}`}>
                        <div className={classes.friend_content}>
                            <img className="avatar avatar_small" src={props.avatar} alt="Avatar"/>
                            <div className={classes.friend_name}>{f.name}</div>
                        </div>
                    </NavLink>
                </div>
            )}
        </>
    )
}

export default Friends;