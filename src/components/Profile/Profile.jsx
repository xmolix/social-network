import React from 'react';
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import ProfilePostsContainer from "./ProfilePosts/ProfilePostsContainer";

const Profile = () => {
    document.title = "Social Network - Profile";

    return (
        <>
            <ProfileInfoContainer/>
            <ProfilePostsContainer/>
        </>
    )
}

export default Profile;