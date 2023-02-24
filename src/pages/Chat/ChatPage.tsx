import React, {UIEvent, FC, useEffect, useRef, useState, memo} from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikValues, useFormik} from "formik";
import Textarea from "../../formik/Textarea/Textarea";
import classes from "./ChatPage.module.css"
import {ChatMessageAPIType, StatusType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/reducers/chatReducer";
import * as Yup from "yup";

const ChatPage: FC = () => {
    return (
        <>
            <Chat />
        </>
    )
}

export const Chat: FC = memo(() => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        void dispatch(startMessagesListening())

        return () => {
            void dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <>
            <ChatMessages />
            <AddMessageForm />
        </>

    )
})

export const ChatMessages: FC = memo(() => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

    const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget

        let differenceWhatWeSee = element.scrollHeight - element.scrollTop
        // element.scrollHeight - высота всей таблицы пикселей - 3800 например.
        // element.scrollTop - сколько сейчас в верхней точке длинна пикселей - 3400 например
            // прокрутка вверх то тут уже 3300 и разница уже 500 пикселей.

        let value = Math.abs(differenceWhatWeSee - element.clientHeight)
        // let value = differenceWhatWeSee - element.clientHeight
        // element.clientHeight - всегда как у див тоесть = 400
        // 500 - 400 = 100

        if (value < 300) {
            if (!isAutoScrollActive) {
                setIsAutoScrollActive(true)
            }
        } else {
            if (isAutoScrollActive) {
                setIsAutoScrollActive(false)
            }
        }
    }

    useEffect(() => {
        if (isAutoScrollActive) {
            setTimeout(() => {
                messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
            }, 500)
        }
    }, [isAutoScrollActive, messages])

    return (
        <div className={classes.messages} onScroll={onScrollHandler}>
            {messages.map((m) => <ChatMessage key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}/>
        </div>
    )
})

export const ChatMessage: FC<{message: ChatMessageAPIType}> = memo(({ message }) => {
    return (
        <div>
            <img width={60} src={message.photo} alt="Avatar"/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

export const AddMessageForm: FC = memo(() => {
    type InitialValuesType = {
        messages: string
    }

    const status: StatusType = useSelector((state: AppStateType) => state.chat.status)
    const dispatch: AppDispatch = useDispatch()

    const initialValues: InitialValuesType = {
        messages: ""
    }

    const onSubmit = (values: FormikValues, {resetForm}: FormikHelpers<InitialValuesType>) => {
        void dispatch(sendMessage(values.messages))
        resetForm()
    }

    const validationSchema = Yup.object({
        messages: Yup.string().required("This is a required field!"),
    })

    status === "error" && alert("Some error occurred. Please refresh the page!")

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form className={classes.form}>
                <Field name={"messages"}
                       children={ (props: FieldProps) =>
                           <Textarea placeholder={"Enter the message..."} {...props} /> }
                />
                <button className={"send_btn"}
                        type={"submit"}
                        disabled={status !== "ready"}>&#5169;</button>
            </Form>
        </Formik>
    )
})

export default ChatPage;