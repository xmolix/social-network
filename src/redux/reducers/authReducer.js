import {authAPI, securityAPI} from "../../api/api";

const SET_USER_DATA_AUTH = "auth/SET-USER-DATA";
const SET_SERVER_STATUS = "auth/SET-SERVER-STATUS";
const GET_CAPTCHA_URL = "auth/SET-CAPTCHA-URL";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    serverStatus: "",
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA_AUTH:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        case SET_SERVER_STATUS:
            return {
                ...state,
                serverStatus: action.setStatus,
            }
        default:
            return state;
    }
}

export const setUserData = (id, email, login, captchaUrl, isAuth) => ({
    type: SET_USER_DATA_AUTH,
    payload: {id, email, login, captchaUrl, isAuth}
});
export const setCaptchaUrl = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});
export const setServerStatus = (setStatus) => ({type: SET_SERVER_STATUS, setStatus});

export const getUserData = () => {
    return async (dispatch) => {
        const data = await authAPI.getAuth();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setUserData(id, email, login, null, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);

        if (data.resultCode === 0) {
            dispatch(getUserData());
            dispatch(getCaptcha(null));
            dispatch(setServerStatus(""));

        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptcha());
            }

            dispatch(setServerStatus(data.messages));
        }
    }
}

export const getCaptcha = () => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptcha();
        const captcha = data.url;

        dispatch(setCaptchaUrl(captcha));
    }
}

export const logout = () => {
    return async (dispatch) => {
        const data = await authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}

export default authReducer;