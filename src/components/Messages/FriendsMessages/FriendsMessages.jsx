import React from 'react';
import classes from "../Messages.module.css";

const FriendsMessages = (props) => {
    return (
        <>
            {props.friendMessage.map(fm =>
                <div className={classes.friend_message_container} key={fm.id}>
                    <div className={classes.friend_message_content}>
                        <img className={"avatar avatar_vary_small"} src={props.avatar} alt="Avatar"/>
                        <div className={classes.friend_message}>{fm.message}
                            <sub className={classes.time}>{fm.time}</sub>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FriendsMessages;