import { CREATE_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS } from "../Constants";

export function createUsers(data) {
    return {
        type: CREATE_USERS,
        payload: data
    }
}

export function getUsers() {
    return {
        type: GET_USERS
    }
}

export function updateUsers(data) {
    return {
        type: UPDATE_USERS,
        payload: data
    }
}

export function deleteUsers(data) {
    return {
        type: DELETE_USERS,
        payload: data
    }
}