import {authAPI} from "../../api/api";

const SET_USER_DATA_AUTH = "auth/SET-USER-DATA";
const SET_SERVER_STATUS = "auth/SET-SERVER-STATUS";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    serverStatus: "",
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA_AUTH:
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

export const setUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA_AUTH,
    payload: {id, email, login, isAuth}
});
export const setServerStatus = (setStatus) => ({type: SET_SERVER_STATUS, setStatus});

export const getUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuth();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe);

        if (data.resultCode === 0) {
            dispatch(getUserData());
        } else {
            dispatch(setServerStatus(data.messages));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}

export default authReducer;