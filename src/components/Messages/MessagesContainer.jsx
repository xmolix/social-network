import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getFriends, getFriendsMessages, getMyMessages} from "../../redux/selectors/messagesSelector";
import {getAvatar} from "../../redux/selectors/appSelector";
import Messages from "./Messages";


const MessagesContainer = (props) => {
    return (
        <Messages {...props}/>
    )
}

const mapStateToProps = (state) => ({
    friends: getFriends(state),
    friendMessages: getFriendsMessages(state),
    myMessages: getMyMessages(state),
    defaultAvatar: getAvatar(state),
});

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(MessagesContainer)