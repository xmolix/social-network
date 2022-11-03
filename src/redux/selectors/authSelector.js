export const getAuth = (state) => {
    return state.auth.isAuth;
}

export const getMyID = (state) => {
    return state.auth.id;
}

export const getServerStatus = (state) => {
    return state.auth.serverStatus;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getCaptchaUrl = (state) => {
    return state.auth.captchaUrl;
}

