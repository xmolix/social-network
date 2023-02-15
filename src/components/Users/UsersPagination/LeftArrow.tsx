import React, {FC} from 'react';
import classes from "../Users.module.css";
import {setPage} from "../../../redux/reducers/usersReducer";
import {AppDispatch} from "../../../redux/store";
import {useDispatch} from "react-redux";
import {UsersType} from "../Users";
import {ArrowType} from "./RightArrow";

export const LeftArrow: FC<UsersType & ArrowType> = ({ usersCount, currentPage, filter, totalPages }) => {

    const dispatch: AppDispatch = useDispatch()
    const firstPage = () => {
        void dispatch(setPage(usersCount, 1, filter))
    }
    return (
        <>
            { currentPage > 11 && totalPages - 1 > currentPage + 9 &&
                <button className={classes.pagination_btn}
                        onClick={() => firstPage()}>
                    &lt;&lt;
                </button>
            }

        </>
    )
}