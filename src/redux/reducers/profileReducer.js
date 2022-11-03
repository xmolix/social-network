import {profileAPI} from "../../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const SET_USER_IMAGE = "profile/SET-USER-IMAGE";
const DELETE_POST = "profile/DELETE-POST";
const LIKE_PLUS_ONE_POST = "profile/LIKE-PLUS-ONE-POST";
const LIKE_MINUS_ONE_POST = "profile/LIKE-MINUS-ONE-POST";
const DISLIKE_PLUS_ONE_POST = "profile/DISLIKE-PLUS-ONE-POST";
const DISLIKE_MINUS_ONE_POST = "profile/DISLIKE-MINUS-ONE-POST";

let initialState = {
    profile: null,
    posts: [
        {id: 1, name: "Jura", post: "My first post", likesCount: 3154, lightLike: false, dislikeCount: -142,  lightDislike: false},
        {id: 2, name: "Jura", post: "Today is a good day!", likesCount: 531, lightLike: false, dislikeCount: -19, lightDislike: false},
    ],
    status: "",
    isDisabledLike: [],
    isDisabledDislike: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let push = {id: state.posts.length + 1 + Math.random(), name: "Jura", post: action.setPost, likesCount: 0, lightLike: false, dislikeCount: 0, lightDislike: false};
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id),
            }
        case LIKE_PLUS_ONE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, likesCount: p.likesCount + 1, lightLike: true}
                    : p),
            }
        case DISLIKE_PLUS_ONE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, dislikeCount: p.dislikeCount + 1, lightDislike: false}
                    : p),
            }
        case LIKE_MINUS_ONE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, likesCount: p.likesCount - 1, lightLike: false}
                    : p),
            }
        case DISLIKE_MINUS_ONE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id
                    ? {...p, dislikeCount: p.dislikeCount - 1, lightDislike: true}
                    : p),
            }
        default:
            return state;
    }
}

export const setNewPost = (setPost) => ({type: ADD_POST, setPost});
export const setUserProfile = (setProfile) => ({type: SET_USER_PROFILE, setProfile});
export const setUserStatus = (setStatus) => ({type: SET_USER_STATUS, setStatus});
export const setUserImage = (setImage) => ({type: SET_USER_IMAGE, setImage});
export const setLikePlusPost = (id) => ({type: LIKE_PLUS_ONE_POST, id});
export const setLikeMinusPost = (id) => ({type: LIKE_MINUS_ONE_POST, id});
export const setDislikePlusPost = (id) => ({type: DISLIKE_PLUS_ONE_POST, id});
export const setDislikeMinusPost = (id) => ({type: DISLIKE_MINUS_ONE_POST, id});
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