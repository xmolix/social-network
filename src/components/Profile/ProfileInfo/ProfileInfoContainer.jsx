import React from 'react';
import {connect} from "react-redux";
import {getAvatar, getPanorama} from "../../../redux/selectors/appSelector";
import {getUserProfile, getUserStatus, updateStatus} from "../../../redux/reducers/profileReducer";
import {compose} from "redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import {useEffect} from "react";
import {getProfile, getStatus} from "../../../redux/selectors/profileSelector";
import {getMyID} from "../../../redux/selectors/authSelector";
import Loading from "../../commons/Loading/Loading";

const ProfileInfoContainer = (props) => {
    useEffect(() => {
        let userID = props.router.params.userId;
        if (!userID) userID = props.myID;
        props.getUserProfile(userID);
        props.getUserStatus(userID);

        return () => {
            let userID = props.router.params.userId;
            if (!userID) {
                userID = props.myID;
                props.getUserProfile(userID);
                props.getUserStatus(userID);
            }
        }
    }, [props.router.params.userId]);

    let user = [];
    user.push(props.profile);

    return (
        !props.profile
            ? <Loading/>
            : <ProfileInfo user={user} {...props}/>
    )
}

function withRouter(Component) {
    function ContainerWithRouterProps(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <Component {...props} router={{location, navigate, params}}/>
    }

    return ContainerWithRouterProps;
}

const mapStateToProps = (state) => ({
    defaultPanorama: getPanorama(state),
    profile: getProfile(state),
    defaultAvatar: getAvatar(state),
    status: getStatus(state),
    myID: getMyID(state),
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile, getUserStatus, updateStatus
    }),
    withRouter,
)(ProfileInfoContainer);