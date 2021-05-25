import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { UserActionTypes } from "./user.types";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'; 
import { signInFailure, signInSuccess } from "./user.actions";

export function* getSnapshopFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshopFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshopFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshopFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SECTION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([ call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession) ]);
}