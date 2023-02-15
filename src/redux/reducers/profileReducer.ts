import {profileAPI} from "../../api/api";
import {photosType, postsType, profileType} from "../../types/types";
import {BaseThunkType, InferActionsTypes} from "../store";

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
    profile: undefined as profileType | undefined,
    posts: [
        {id: 1, name: "Jura", post: "My first post", likesCount: 3154, lightLike: false, dislikeCount: -142,  lightDislike: false},
        {id: 2, name: "Jura", post: "Today is a good day!", likesCount: 531, lightLike: false, dislikeCount: -19, lightDislike: false},
    ] as Array<postsType>,
    status: "",
}

const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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
                profile: { ...state.profile, photos: action.setImage } as profileType,
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

export const actions = {
    setNewPost: (setPost: string) => ({ type: ADD_POST, setPost } as const),
    setUserProfile: (setProfile?: profileType) => ({ type: SET_USER_PROFILE, setProfile } as const),
    setUserStatus: (setStatus: string) => ({ type: SET_USER_STATUS, setStatus } as const),
    setUserImage: (setImage: photosType) => ({ type: SET_USER_IMAGE, setImage } as const),
    setLikePlusPost: (id: number) => ({ type: LIKE_PLUS_ONE_POST, id } as const),
    setLikeMinusPost: (id: number) => ({ type: LIKE_MINUS_ONE_POST, id } as const),
    setDislikePlusPost: (id: number) => ({ type: DISLIKE_PLUS_ONE_POST, id } as const),
    setDislikeMinusPost: (id: number) => ({ type: DISLIKE_MINUS_ONE_POST, id } as const),
    deletePost: (id: number) => ({ type: DELETE_POST, id } as const),
}

export const getUserProfile = (userId: number | null): ThankType => {
    return async (dispatch) => {
        if (userId !== null) {
            const data = await profileAPI.getUser(userId);

            dispatch(actions.setUserProfile(data));
        }
    }
}

export const getUserStatus = (userId: number): ThankType => {
    return async (dispatch) => {
        if (userId !== null) {
            const data = await profileAPI.getUserStatus(userId);

            dispatch(actions.setUserStatus(data));
        }
    }
}

export const updateStatus = (status: string): ThankType => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        } else {
            alert(data.messages);
        }
    }
}

export const updateImage = (image: any): ThankType => {
    return async (dispatch) => {
        const data = await profileAPI.updateImage(image);

        if (data.resultCode === 0) {
            dispatch(actions.setUserImage(data.data.photos));
        }
    }
}

export const updateProfile = (profileData: any): ThankType => {
    return async (dispatch, getState) => {
        const setStatus = profileData.setStatus;
        const userId = getState().auth.id;
        const data = await profileAPI.updateProfile(profileData);

        if (data.resultCode === 0) {
            dispatch(actions.setUserProfile());
            dispatch(getUserProfile(userId));
        } else {
            setStatus(data.messages[0]);
        }
    }
}

export default profileReducer;


export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>

type ThankType = BaseThunkType<ActionType>

// type DispatchType = Dispatch<ActionType>
// type GetStateType = () => AppStateType
// return async (dispatch: DispatchType, getState: GetStateType) => {