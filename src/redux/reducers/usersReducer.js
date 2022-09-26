import {usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/objects-helpers";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_TOTAL_COUNT = "users/SET-TOTAL-COUNT";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const TOGGLE_IS_LOADING = "users/TOGGLE-IS-LOADING";
const TOGGLE_IS_DISABLED = "users/TOGGLE-IS-DISABLED";

let initialState = {
    users: [],
    usersCount: 4,
    totalCount: 0,
    currentPage: 1,
    pagination: [],
    isLoading: false,
    isDisabled: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", {followed: true}
                ),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users, action.userId, "id", {followed: false}
                ),
            }
        case SET_USERS:
            return {
                ...state,
                users: action.userSet,
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.usersTotal,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.setPage,
            }
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.setLoading,
            }
        case TOGGLE_IS_DISABLED:
            return {
                ...state,
                isDisabled: action.setDisabled
                    ? [...state.isDisabled, action.userId]
                    : state.isDisabled.filter(id => id !== action.userId),
            }
        default:
            return state;
    }
}

export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (userSet) => ({type: SET_USERS, userSet});
export const setTotalCount = (usersTotal) => ({type: SET_TOTAL_COUNT, usersTotal});
export const setCurrentPage = (setPage) => ({type: SET_CURRENT_PAGE, setPage});
export const setLoadingStatus = (setLoading) => ({type: TOGGLE_IS_LOADING, setLoading});
export const setDisabledStatus = (setDisabled, userId) => ({type: TOGGLE_IS_DISABLED, setDisabled, userId});

export const getUsers = (usersCount, currentPage) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true));
        let data = await usersAPI.getUsers(usersCount, currentPage);

        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
        dispatch(setLoadingStatus(false));
    }
}

export const setPage = (usersCount, setPage) => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true));
        dispatch(setCurrentPage(setPage));
        let data = await usersAPI.getUsers(usersCount, setPage);

        dispatch(setUsers(data.items));
        dispatch(setLoadingStatus(false));
    }
}

export const setFollow = (userId) => (dispatch) => {
    let apiMethod = usersAPI.getFollow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, follow);
}

export const setUnfollow = (userId) => (dispatch) => {
    let apiMethod = usersAPI.getUnfollow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setDisabledStatus(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(setDisabledStatus(false, userId));
}

export default usersReducer;