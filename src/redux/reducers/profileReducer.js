import {profileAPI} from "../../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const DELETE_POST = "profile/DELETE-POST";

let initialState = {
    profile: null,
    posts: [
        {id: 1, name: "Lain", post: "My first post", likesCount: 3154},
        {id: 2, name: "Lain", post: "Today is a good day!", likesCount: 531},
    ],
    status: "",
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let push = {id: state.posts.length + 1, name: "Lain", post: action.setPost, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, push],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.setProfile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.setStatus,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id),
            }
        default:
            return state;
    }
}

export const setNewPost = (setPost) => ({type: ADD_POST, setPost});
export const setUserProfile = (setProfile) => ({type: SET_USER_PROFILE, setProfile});
export const setUserStatus = (setStatus) => ({type: SET_USER_STATUS, setStatus});
export const deletePost = (id) => ({type: DELETE_POST, id})

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        if (userId !== null) {
            let data = await profileAPI.getUser(userId);

            dispatch(setUserProfile(data));
        }
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        if (userId !== null) {
            let data = await profileAPI.getUserStatus(userId);

            dispatch(setUserStatus(data));
        }
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
}

export default profileReducer;