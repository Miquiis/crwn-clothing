import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import SignUpActionTypes from "./sign-up.types";

import { signUpChange, signUpFailure, signUpSuccess } from "./sign-up.actions";

export function* isSignUpStart({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield createUserProfileDocument(user, { displayName });
        const userSnapshot = yield userRef.get();
        yield put(signUpSuccess({'userSnapshot': userSnapshot}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(SignUpActionTypes.SIGN_UP_START, isSignUpStart)
}

export function* isSignUpChange(payload) {
    yield put(signUpChange(payload))
}

export function* onSignUpChange() {
    yield takeLatest(SignUpActionTypes.SIGN_UP_CHANGE, isSignUpChange)
}

export function* signupSagas() {
    yield all([ call(onSignUpStart)]);
}