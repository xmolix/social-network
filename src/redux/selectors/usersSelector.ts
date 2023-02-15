import {AppStateType} from "../store";

export const getUsersArray = (state: AppStateType) => {
    return state.users.users;
}

export const getTotalCount = (state: AppStateType) => {
    return state.users.totalCount;
}

export const getUsersCount = (state: AppStateType) => {
    return state.users.usersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.users.currentPage;
}

export const getFilter = (state: AppStateType) => {
    return state.users.filter;
}

export const getLoading = (state: AppStateType) => {
    return state.users.isLoading;
}

export const getDisabled = (state: AppStateType) => {
    return state.users.isDisabled;
}