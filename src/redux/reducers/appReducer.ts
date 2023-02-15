import {getUserData} from "./authReducer";
import avatar from "../../img/default-avatar.jpg"
import panorama from "../../img/panorama.avif"

const INITIALIZING = "app/INITIALIZING"

type initialStateType = {
    initialize: boolean,
    defaultAvatar: string,
    defaultPanorama: string,
}

let initialState: initialStateType = {
    initialize: false,
    defaultAvatar: avatar,
    defaultPanorama: panorama,
}

type initializingActionType = {
    type: typeof INITIALIZING
}

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZING:
            return {
                ...state,
                initialize: true,
            }
        default:
            return state;
    }
}

export const successInitializing = ():initializingActionType => ({ type: INITIALIZING })

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getUserData())

        Promise.all([promise])
            .then(() => {
                dispatch(successInitializing())
            })
    }
}

export default appReducer