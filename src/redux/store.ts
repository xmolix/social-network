import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import authReducer from "./reducers/authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import appReducer from "./reducers/appReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import messagesReducer from "./reducers/messagesReducer";
import chatReducer from "./reducers/chatReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    chat: chatReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store


type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>
export type AppDispatch = typeof store.dispatch

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<AT extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, AT>