import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "fde94f2a-3abb-4fb7-af27-9dcfc69a7638"
    },
});

const data = response => response.data;

export const authAPI = {
    getAuth() {
        return (
            instance.get(`auth/me`)
                .then(data)
        )
    },
    login(email, password, rememberMe = false, captcha = null) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe, captcha})
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
    getUser(userId) {
        return (
            instance.get(`profile/${userId}`)
                .then(data)
        )
    },
    getUserStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(data)
        )
    },
    updateStatus(status) {
        return (
            instance.put(`profile/status`, {status})
                .then(data)
        )
    },
    updateImage(image) {
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
    updateProfile(profileData) {
        return (
            instance.put(`profile`, profileData)
                .then(data)
        )
    },
};

export const usersAPI = {
    getUsers(usersCount = 5, currentPage = 1) {
        return (
            instance.get(`users?count=${usersCount}&page=${currentPage}`)
                .then(data)
        )
    },
    getFollow(userId) {
        return (
            instance.post(`follow/${userId}`)
                .then(data)
        )
    },
    getUnfollow(userId) {
        return (
            instance.delete(`follow/${userId}`)
                .then(data)
        )
    }
};

export const securityAPI = {
    getCaptcha() {
        return (
            instance.get(`security/get-captcha-url`)
                .then(data)
        )
    },
}