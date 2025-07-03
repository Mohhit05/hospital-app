import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index";
import { CREATE_USERS, CREATE_USERS_RED, GET_USERS, GET_USERS_RED, UPDATE_USERS, UPDATE_USERS_RED, DELETE_USERS, DELETE_USERS_RED  } from "../Constants";

function* createSagas(action) {
    let response = yield createRecord("users", action.payload)
    yield put({ type: CREATE_USERS_RED, payload: response })
}

function* getSagas() {
    let response = yield getRecord("users")
    yield put({ type: GET_USERS_RED, payload: response })
}

function* updateSagas(action) {
    yield updateRecord("users", action.payload)
    yield put({ type: UPDATE_USERS_RED, payload: action.payload })
}

function* deleteSagas(action) {
    yield deleteRecord("users", action.payload)
    yield put({ type: DELETE_USERS_RED, payload: action.payload })
}

export default function* usersSagas() {
    yield takeEvery(CREATE_USERS, createSagas)
    yield takeEvery(GET_USERS, getSagas)
    yield takeEvery(UPDATE_USERS, updateSagas)
    yield takeEvery(DELETE_USERS, deleteSagas)
}
