import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index";
import { CREATE_APPOINTMENTS, CREATE_APPOINTMENTS_RED, GET_APPOINTMENTS, GET_APPOINTMENTS_RED, UPDATE_APPOINTMENTS, UPDATE_APPOINTMENTS_RED, DELETE_APPOINTMENTS, DELETE_APPOINTMENTS_RED  } from "../Constants";

function* createSagas(action) {
    let response = yield createRecord("appointments", action.payload)
    yield put({ type: CREATE_APPOINTMENTS_RED, payload: response })
}

function* getSagas() {
    let response = yield getRecord("appointments")
    yield put({ type: GET_APPOINTMENTS_RED, payload: response })
}

function* updateSagas(action) {
    yield updateRecord("appointments", action.payload)
    yield put({ type: UPDATE_APPOINTMENTS_RED, payload: action.payload })
}

function* deleteSagas(action) {
    yield deleteRecord("appointments", action.payload)
    yield put({ type: DELETE_APPOINTMENTS_RED, payload: action.payload })
}

export default function* appointmentsSagas() {
    yield takeEvery(CREATE_APPOINTMENTS, createSagas)
    yield takeEvery(GET_APPOINTMENTS, getSagas)
    yield takeEvery(UPDATE_APPOINTMENTS, updateSagas)
    yield takeEvery(DELETE_APPOINTMENTS, deleteSagas)
}
