import { CREATE_ADVICES, DELETE_ADVICES, GET_ADVICES, UPDATE_ADVICES } from "../Constants";

export function createAdvices(data) {
    return {
        type: CREATE_ADVICES,
        payload: data
    }
}

export function getAdvices() {
    return {
        type: GET_ADVICES
    }
}

export function updateAdvices(data) {
    return {
        type: UPDATE_ADVICES,
        payload: data
    }
}

export function deleteAdvices(data) {
    return {
        type: DELETE_ADVICES,
        payload: data
    }
}