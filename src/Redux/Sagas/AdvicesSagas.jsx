import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index";
import { CREATE_ADVICES, CREATE_ADVICES_RED, GET_ADVICES, GET_ADVICES_RED, UPDATE_ADVICES, UPDATE_ADVICES_RED, DELETE_ADVICES, DELETE_ADVICES_RED  } from "../Constants";

function* createSagas(action) {
    let response = yield createRecord("advices", action.payload)
    yield put({ type: CREATE_ADVICES_RED, payload: response })
}

function* getSagas() {
    let response = yield getRecord("advices")
    yield put({ type: GET_ADVICES_RED, payload: response })
}

function* updateSagas(action) {
    yield updateRecord("advices", action.payload)
    yield put({ type: UPDATE_ADVICES_RED, payload: action.payload })
}

function* deleteSagas(action) {
    yield deleteRecord("advices", action.payload)
    yield put({ type: DELETE_ADVICES_RED, payload: action.payload })
}

export default function* advicesSagas() {
    yield takeEvery(CREATE_ADVICES, createSagas)
    yield takeEvery(GET_ADVICES, getSagas)
    yield takeEvery(UPDATE_ADVICES, updateSagas)
    yield takeEvery(DELETE_ADVICES, deleteSagas)
}
