export const getAuth = (state) => {
    return state.auth.isAuth;
}

export const getMyID = (state) => {
    return state.auth.id;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getServerStatus = (state) => {
    return state.auth.serverStatus;
}