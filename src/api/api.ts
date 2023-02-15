import axios, {AxiosResponse} from "axios";
import {FilterFriendType} from "../redux/reducers/usersReducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "fde94f2a-3abb-4fb7-af27-9dcfc69a7638"
    },
});

const data = (response: AxiosResponse) => response.data;

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptchaEnum {
    CaptchaIsRequired = 10,
}

type GetAuthType = {
    data: {
        id: number,
        email: string,
        login: string,
    },
    resultCode: ResultCodesEnum | ResultCodesForCaptchaEnum,
    messages: Array<string>,
}

type LoginType = {
    data: {
        userId: number,
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export const authAPI = {
    getAuth() {
        return (
            instance.get<GetAuthType>(`auth/me`)
                .then(data)
        )
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return (
            instance.post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
                .then(data)
        )
    },
    logout() {
        return (
            instance.delete(`auth/login`)
                .then(data)
        )
    }
};

export const profileAPI = {
    getUser(userId: number) {
        return (
            instance.get(`profile/${userId}`)
                .then(data)
        )
    },
    getUserStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(data)
        )
    },
    updateStatus(status: string) {
        return (
            instance.put(`profile/status`, {status})
                .then(data)
        )
    },
    updateImage(image: string) {
        const formData = new FormData();
        formData.append("image", image);

        return (
            instance.put(`profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(data)
        )
    },
    updateProfile(profileData: any) {
        return (
            instance.put(`profile`, profileData)
                .then(data)
        )
    },
};

export const usersAPI = {
    getUsers(usersCount = 5, currentPage = 1, term: string = "", friend: FilterFriendType) {
        return (
            instance.get(`users?count=${usersCount}&page=${currentPage}&term=${term}` + (friend === "" ? "" : `&friend=${friend}`))
                .then(data)
        )
    },
    getFollow(userId: number) {
        return (
            instance.post(`follow/${userId}`)
                .then(data)
        )
    },
    getUnfollow(userId: number) {
        return (
            instance.delete(`follow/${userId}`)
                .then(data)
        )
    }
};

export const securityAPI = {
    getCaptcha(param: null | undefined) {
        return (
            instance.get(`security/get-captcha-url`)
                .then(data)
        )
    },
};