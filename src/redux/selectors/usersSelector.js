export const getUsersArray = (state) => {
    return state.users.users;
}

export const getTotalCount = (state) => {
    return state.users.totalCount;
}

export const getUsersCount = (state) => {
    return state.users.usersCount;
}

export const getCurrentPage = (state) => {
    return state.users.currentPage;
}

export const getLoading = (state) => {
    return state.users.isLoading;
}

export const getDisabled = (state) => {
    return state.users.isDisabled;
}