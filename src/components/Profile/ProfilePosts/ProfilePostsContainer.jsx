import React from 'react';
import {connect} from "react-redux";
import {getPosts, getProfile} from "../../../redux/selectors/profileSelector";
import {getAvatar} from "../../../redux/selectors/appSelector";
import ProfilePosts from "./ProfilePosts";
import {deletePost, dislikePost, likePost} from "../../../redux/reducers/profileReducer";

const ProfilePostsContainer = (props) => {
    return props.profile
        ? <ProfilePosts {...props}/>
        : ""
}

const mapStateToProps = (state) => ({
    posts: getPosts(state),
    profile: getProfile(state),
    defaultAvatar: getAvatar(state),
});

export default connect(mapStateToProps, {deletePost, likePost, dislikePost})(ProfilePostsContainer);