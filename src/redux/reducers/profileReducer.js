import {profileAPI} from "../../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const SET_USER_IMAGE = "profile/SET-USER-IMAGE";
const LIKE_POST = "profile/LIKE-POST";
const DISLIKE_POST = "profile/DISLIKE-POST";
const DELETE_POST = "profile/DELETE-POST";

let initialState = {
    profile: null,
    posts: [
        {id: 1, name: "Jura", post: "My first post", likesCount: 3154},
        {id: 2, name: "Jura", post: "Today is a good day!", likesCount: 531},
    ],
    status: "",
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let push = {id: state.posts.length + 1, name: "Jura", post: action.setPost, likesCount: 0};
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
        case SET_USER_IMAGE:
            return {
                ...state,
                profile: {...state.profile, photos: action.setImage},
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, likesCount: p.likesCount + 1}
                    : p),
            }
        case DISLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, likesCount: p.likesCount - 1}
                    : p),
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
export const setUserImage = (setImage) => ({type: SET_USER_IMAGE, setImage});
export const likePost = (id) => ({type: LIKE_POST, id});
export const dislikePost = (id) => ({type: DISLIKE_POST, id});
export const deletePost = (id) => ({type: DELETE_POST, id});

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        if (userId !== null) {
            const data = await profileAPI.getUser(userId);

            dispatch(setUserProfile(data));
        }
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        if (userId !== null) {
            const data = await profileAPI.getUserStatus(userId);

            dispatch(setUserStatus(data));
        }
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
}

export const updateImage = (image) => {
    return async (dispatch) => {
        const data = await profileAPI.updateImage(image);

        if (data.resultCode === 0) {
            dispatch(setUserImage(data.data.photos));
        }
    }
}

export const updateProfile = (profileData) => {
    return async (dispatch, getState) => {
        const setStatus = profileData.setStatus;
        const userId = getState().auth.id;
        const data = await profileAPI.updateProfile(profileData);

        if (data.resultCode === 0) {
            dispatch(setUserProfile());
            dispatch(getUserProfile(userId));
        } else {
            setStatus(data.messages[0]);
        }
    }
}

export default profileReducer;