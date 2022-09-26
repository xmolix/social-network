import {getUserData} from "./authReducer";
import avatar from "../../img/default-avatar.jpg";
import panorama from "../../img/panorama.avif";

const INIRIALIZING = "app/INITIALIZING";

let initialState = {
    initialize: false,
    defaultAvatar: avatar,
    defaultPanorama: panorama,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIRIALIZING:
            return {
                ...state,
                initialize: true,
            }
        default:
            return state;
    }
}

export const successInitializing = () => ({type: INIRIALIZING});

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(successInitializing());
            });
    }
}

export default appReducer;