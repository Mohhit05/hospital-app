import { CREATE_APPOINTMENTS, DELETE_APPOINTMENTS, GET_APPOINTMENTS, UPDATE_APPOINTMENTS } from "../Constants";

export function createAppointments(data) {
    return {
        type: CREATE_APPOINTMENTS,
        payload: data
    }
}

export function getAppointments() {
    return {
        type: GET_APPOINTMENTS
    }
}

export function updateAppointments(data) {
    return {
        type: UPDATE_APPOINTMENTS,
        payload: data
    }
}

export function deleteAppointments(data) {
    return {
        type: DELETE_APPOINTMENTS,
        payload: data
    }
}