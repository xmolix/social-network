import React, {ComponentType, FC} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getFriends, getFriendsMessages, getMyMessages} from "../../redux/selectors/messagesSelector";
import {getAvatar} from "../../redux/selectors/appSelector";
import Messages from "./Messages";
import {AppStateType} from "../../redux/store";

const MessagesContainer = (props) => {
    document.title = "Social Network - Messages";

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