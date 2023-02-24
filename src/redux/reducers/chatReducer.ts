import {chatAPI, ChatMessageAPIType, StatusType} from "../../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "../store";
import {Dispatch} from "redux";
import {v1} from "uuid";

const MESSAGES_RECEIVED = "chat/MESSAGES-RECEIVED"
const STATUS_CHANGED = "chat/STATUS-CHANGED"

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
}

type ChatMessageType = ChatMessageAPIType & {id: string}

const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100),
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: MESSAGES_RECEIVED, payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED, payload: { status }
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}

export default chatReducer

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
