import {APIResponseType, ResultCodesEnum, usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/objects-helpers";
import {userType} from "../../types/types";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "../store";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_TOTAL_COUNT = "users/SET-TOTAL-COUNT";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_FILTER = "users/SET-FILTER";
const TOGGLE_IS_LOADING = "users/TOGGLE-IS-LOADING";
const TOGGLE_IS_DISABLED = "users/TOGGLE-IS-DISABLED";

let initialState = {
    users: [] as Array<userType>,
    usersCount: 4,
    totalCount: 0,
    currentPage: 1,
    filter: { term: "", friend: "" as FilterFriendType },
    isLoading: false,
    isDisabled: [] as Array<number>,
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
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
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
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

export const actions = {
    follow: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollow: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (userSet: Array<userType>) => ({type: SET_USERS, userSet} as const),
    setTotalCount: (usersTotal: number) => ({type: SET_TOTAL_COUNT, usersTotal} as const),
    setCurrentPage: (setPage: number) => ({type: SET_CURRENT_PAGE, setPage} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),
    setLoadingStatus: (setLoading: boolean) => (
        {type: TOGGLE_IS_LOADING, setLoading} as const
    ),
    setDisabledStatus: (setDisabled: boolean, userId: number) => (
        {type: TOGGLE_IS_DISABLED, setDisabled, userId} as const
    ),
}

export const getUsers = (usersCount: number, currentPage: number, filter: FilterType) => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.setLoadingStatus(true))
        let data = await usersAPI.getUsers(usersCount, currentPage, filter.term, filter.friend)

        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))

        dispatch(actions.setLoadingStatus(false))
    }
}

export const setPage = (usersCount: number, setPage: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setLoadingStatus(true))
        dispatch(actions.setCurrentPage(setPage))
        dispatch(actions.setFilter(filter));
        let data = await usersAPI.getUsers(usersCount, setPage, filter.term, filter.friend)

        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
        dispatch(actions.setLoadingStatus(false))
    }
}

export const setFollow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.getFollow.bind(usersAPI)
    await _followUnfollowFlow(dispatch, userId, apiMethod, actions.follow)
}

export const setUnfollow = (userId: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.getUnfollow.bind(usersAPI)
    await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollow)
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.setDisabledStatus(true, userId))
    let data = await apiMethod(userId)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.setDisabledStatus(false, userId))
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type FilterFriendType = "" | "null" | "true" | "false"
type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>