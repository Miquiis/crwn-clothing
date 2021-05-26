import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { UserActionTypes } from '../user/user.types';
import { clearCartFailure, clearCartSuccess } from "./cart.actions";

export function* isUserChangeAuth() {
    try {
        yield put(clearCartSuccess())
    } catch (error) {
        yield put(clearCartFailure(error))
    }
}

export function* onUserSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, isUserChangeAuth)
}

export function* onUserSignIn() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, isUserChangeAuth)
}

export function* cartSagas() {
    yield all([ call(onUserSignOut), call(onUserSignIn) ]);
}