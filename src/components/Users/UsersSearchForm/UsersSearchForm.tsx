import React, {FC, memo} from 'react';
import {Field, Form, Formik} from "formik";
import {FilterFriendType, FilterType} from "../../../redux/reducers/usersReducer";

export type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    friend: FilterFriendType
}

const UsersSearchForm: FC<PropsType> = memo(({ onFilterChanged,  friend }) => {
    const onSubmit = (values: FilterType,
                      {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <Formik initialValues={{term: "", friend: friend}} onSubmit={onSubmit}>
            <Form>
                <Field type={"text"} name={"term"} />
                <Field name={"friend"} as={"select"}>
                    <option value={"null"}>All</option>
                    <option value={"true"}>Only friends</option>
                    <option value={"false"}>Others unfollowed users</option>
                </Field>
                <button type={"submit"}>Find</button>
            </Form>
        </Formik>
    );
});

export default UsersSearchForm;