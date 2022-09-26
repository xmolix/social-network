import React from 'react';
import classes from "./Messages.module.css";
import Friends from "./Friends/Friends";
import FriendsMessages from "./FriendsMessages/FriendsMessages";
import MyMessages from "./MyMessages/MyMessages";
import SendMessageContainer from "./SendMessage/SendMessageContainer";

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <div className={classes.friends}>
                <Friends friend={props.friends} avatar={props.defaultAvatar}/>
            </div>
            <div className={classes.chat}>
                <div className={classes.chat_content}>
                    <FriendsMessages friendMessage={props.friendMessages} avatar={props.defaultAvatar}/>
                    <MyMessages myMessage={props.myMessages}/>
                </div>
                <div className={classes.chat_textarea}>
                    <SendMessageContainer/>
                </div>
            </div>
        </div>
    )
}

export default Messages;