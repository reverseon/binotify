import { UserType } from "../../config/type";

const loginAction = (payload: UserType) => {
    return {
        type: 'LOGIN',
        payload: payload
    }
}

const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export { loginAction, logoutAction }