import React from 'react';
import classes from "./LoginPage.module.css";
import {Field, Form, Formik} from "formik";
import Input from "../../formik/Input/Input";


const LoginPage = ({initialValues, onSubmit, validationSchema, status}) => {
    return (
        <div className={classes.login}>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                <Form className={classes.form}>
                    <div className={classes.title}>Login</div>
                    <div className={classes.label_input}>
                        <label htmlFor="email">E-mail: </label>
                        <Field id={"email"} name={"email"}
                               children={(props) => <Input type={"text"}
                                                           placeholder={"Enter the email..."}
                                                           {...props}/>}
                        />
                    </div>

                    <div className={classes.label_input}>
                        <label htmlFor="password">Password: </label>
                        <Field id={"password"} name={"password"}
                               children={(props) => <Input type={"password"}
                                                           placeholder={"Enter the password..."}
                                                           {...props}/>}
                        />
                    </div>

                    <div className={classes.label_checkbox}>
                        <label htmlFor="rememberMe">Remember me: </label>
                        <Field id={"rememberMe"} name={"rememberMe"} type={"checkbox"}/>
                        <div className={classes.server_status}>{status}</div>
                    </div>

                    <button className={classes.btn_login} type={"submit"}>submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage;