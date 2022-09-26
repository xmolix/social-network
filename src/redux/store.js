import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/appReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import messagesReducer from "./reducers/messagesReducer";


const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
});

const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;