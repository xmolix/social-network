import {authAPI, ResultCodesEnum, ResultCodesForCaptchaEnum, securityAPI} from "../../api/api"

const SET_USER_DATA_AUTH = "auth/SET-USER-DATA"
const SET_SERVER_STATUS = "auth/SET-SERVER-STATUS"
const GET_CAPTCHA_URL = "auth/SET-CAPTCHA-URL"

export type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    serverStatus: string,
    captchaUrl: string | null,
}

let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    serverStatus: "",
    captchaUrl: null,
}

const authReducer = (state = initialState, action: any): initialStateType => {
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
            return state
    }
}

export type setUserDataActionType = {
    type: typeof SET_USER_DATA_AUTH,
    payload: {
        id: number | null,
        email: string | null,
        login: string | null,
        captchaUrl?: string | null,
        isAuth: boolean
    }
}

export const setUserData = (
    id: number | null,
    email: string | null,
    login: string | null,
    captchaUrl: string | null,
    isAuth: boolean
): setUserDataActionType => ({
    type: SET_USER_DATA_AUTH,
    payload: { id, email, login, captchaUrl, isAuth }
});

export type setCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL,
    payload: { captchaUrl: string }
}

export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL, payload: { captchaUrl }
});

export type setServerStatusActionType = {
    type: typeof SET_SERVER_STATUS,
    setStatus: string,
}

export const setServerStatus = (setStatus: string): setServerStatusActionType => (
    {type: SET_SERVER_STATUS, setStatus}
);

export const getUserData = () => {
    return async (dispatch: any) => {
        const data = await authAPI.getAuth()

        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = data.data;
            dispatch(setUserData(id, email, login, null, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return async (dispatch: any) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getUserData())
            dispatch(getCaptcha(null))
            dispatch(setServerStatus(""))

        } else {
            if (data.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }

            dispatch(setServerStatus(data.messages))
        }
    }
}

export const getCaptcha = (param?: null) => {
    return async (dispatch: any) => {
        const data = await securityAPI.getCaptcha(param);
        const captcha = data.url;

        dispatch(setCaptchaUrl(captcha));
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        const data = await authAPI.logout();

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserData(null, null, null, null, false));
        }
    }
}

export default authReducer;