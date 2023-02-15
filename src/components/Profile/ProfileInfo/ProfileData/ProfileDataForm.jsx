import React, {useState} from 'react';
import classes from "../../Profile.module.css";
import {Field, Form, Formik} from "formik";
import Textarea from "../../../../formik/Textarea/Textarea";
import Switch from "../../../../formik/Switch/Switch";
import Input from "../../../../formik/Input/Input";
import * as Yup from "yup";
import cn from "classnames";

const ProfileDataForm = (
    {aboutMe, fullName, jobSearch, jobDescription, editProfile, updateProfile, contacts}
) => {
    const [search, setSearch] = useState(jobSearch);
    let [restart, setRestart] = useState(10);

    const initialValues = {
        fullName: fullName,
        aboutMe: aboutMe,
        lookingForAJob: search,
        lookingForAJobDescription: jobDescription,
        contacts: {
            facebook: contacts.facebook,
            github: contacts.github,
            instagram: contacts.instagram,
            mainLink: contacts.mainLink,
            twitter: contacts.twitter,
            vk: contacts.vk,
            website: contacts.website,
            youtube: contacts.youtube,
        },
    }

    const onSwitchTumbler = () => {
        setSearch(current => !current);
    }

    const required = "*This is a required field!";
    const maxLength = 1000;
    const url = " must be a valid URL";
    const validationSchema = Yup.object({
        fullName: Yup.string().required(required),
        aboutMe: Yup.string().required(required),
        lookingForAJobDescription: Yup.string().required(required)
            .max(maxLength, `Max characters is ${maxLength}`),
        contacts: Yup.object().shape({
            facebook: Yup.string().url(`Facebook${url}`),
            github: Yup.string().url(`GitHub${url}`),
            instagram: Yup.string().url(`Instagram${url}`),
            mainLink: Yup.string().url(`MainLink${url}`),
            twitter: Yup.string().url(`Twitter${url}`),
            vk: Yup.string().url(`VK${url}`),
            website: Yup.string().url(`Website${url}`),
            youtube: Yup.string().url(`YouTube${url}`),
        }),
    });

    const onSubmit = (values, {setSubmitting, setStatus}) => {
        let {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts} = values;
        updateProfile(
            {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts, setStatus}
        );

        if (setSubmitting(false)) editProfile(false);

        const tick = () => {
            setRestart(prevCount => prevCount === 0 ? restart = 0 : prevCount - 1);
        };

        const interval = setInterval(tick, 1000);
        setRestart(10);
        return () => {
            clearInterval(interval);
        }
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}>
            {({status}) => (
            <Form>
                <div className={classes.data_input}>
                    <label htmlFor={"fullNameInput"}><b className={classes.data_name}>Name: </b></label>
                    <Field name={"fullName"}
                           children={(props) => <Input id={"fullNameInput"}
                                                       placeholder={"Enter your full name..."}
                                                       type={"text"}
                                                       {...props}/>}
                    />
                </div>

                <div className={classes.data_input}>
                    <label htmlFor={"aboutMeInput"}><b className={classes.data_name}>About me: </b></label>
                    <Field name={"aboutMe"}
                           children={(props) => <Input id={"aboutMeInput"}
                                                       placeholder={"About you..."}
                                                       type={"text"}
                                                       {...props}/>}
                    />
                </div>

                <div className={classes.data_search}>
                    <b className={classes.data_name}>Looking for a job: </b>
                        <Field name={"lookingForAJob"}
                               children={(props) => <Switch search={search} setSearch={setSearch}
                                                            onSwitchTumbler={onSwitchTumbler}
                                                            {...props}/>}
                        />
                </div>

                <div className={classes.data_description}>
                    <b className={cn(classes.data_description_name, classes.data_name)}>My professional skills: </b>
                    <Field name={"lookingForAJobDescription"}
                           children={(props) => <Textarea placeholder={"Enter the description..."}
                                                          cols={70} rows={7}
                                                          {...props}/>}
                    />
                </div>

                <div className={classes.data_contacts_block}>
                    <b className={classes.data_name}>Contacts:</b>
                    {Object.keys(contacts).map((key, index) =>
                        <div className={classes.data_contact_block} key={index}>
                            <label className={classes.data_contact_label} htmlFor={key}>
                                <b>{key[0].toUpperCase() + key.substring(1)}:</b>
                            </label>
                            <Field name={`contacts.${key}`}
                                   children={(props) => <Input id={key} type={"text"}
                                                               placeholder={`Enter the ${key} URL...`}
                                                               {...props}/>}/>
                        </div>
                    )}
                </div>

                {!status
                    ? <button className={cn(classes.data_edit_btn, classes.save)}
                              type={"submit"}/>
                    : <button className={classes.data_edit_btn}
                              type={"submit"} disabled={restart}>
                        {restart > 0
                            ? status + ". Please fixed wrong URL and try again after " + restart + " seconds"
                            : "SAVE"
                        }
                </button>}

            </Form>
            )}
        </Formik>
    );
};

export default ProfileDataForm;