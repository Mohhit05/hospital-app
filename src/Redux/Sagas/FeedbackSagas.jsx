import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index";
import { CREATE_FEEDBACK, CREATE_FEEDBACK_RED, GET_FEEDBACK, GET_FEEDBACK_RED, UPDATE_FEEDBACK, UPDATE_FEEDBACK_RED, DELETE_FEEDBACK, DELETE_FEEDBACK_RED  } from "../Constants";

function* createSagas(action) {
    let response = yield createRecord("feedback", action.payload)
    yield put({ type: CREATE_FEEDBACK_RED, payload: response })
}

function* getSagas() {
    let response = yield getRecord("feedback")
    yield put({ type: GET_FEEDBACK_RED, payload: response })
}

function* updateSagas(action) {
    yield updateRecord("feedback", action.payload)
    yield put({ type: UPDATE_FEEDBACK_RED, payload: action.payload })
}

function* deleteSagas(action) {
    yield deleteRecord("feedback", action.payload)
    yield put({ type: DELETE_FEEDBACK_RED, payload: action.payload })
}

export default function* feedbackSagas() {
    yield takeEvery(CREATE_FEEDBACK, createSagas)
    yield takeEvery(GET_FEEDBACK, getSagas)
    yield takeEvery(UPDATE_FEEDBACK, updateSagas)
    yield takeEvery(DELETE_FEEDBACK, deleteSagas)
}
