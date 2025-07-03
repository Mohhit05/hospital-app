import { CREATE_FEEDBACK, DELETE_FEEDBACK, GET_FEEDBACK, UPDATE_FEEDBACK } from "../Constants";

export function createFeedback(data) {
    return {
        type: CREATE_FEEDBACK,
        payload: data
    }
}

export function getFeedback() {
    return {
        type: GET_FEEDBACK
    }
}

export function updateFeedback(data) {
    return {
        type: UPDATE_FEEDBACK,
        payload: data
    }
}

export function deleteFeedback(data) {
    return {
        type: DELETE_FEEDBACK,
        payload: data
    }
}