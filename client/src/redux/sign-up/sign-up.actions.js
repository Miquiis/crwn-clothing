import SignUpActionTypes from "./sign-up.types";


export const signUpStart = (signup) => ({
    type: SignUpActionTypes.SIGN_UP_START,
    payload: signup
});

export const signUpSuccess = (user) => ({
    type: SignUpActionTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signUpFailure = (error) => ({
    type: SignUpActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const signUpChange = (change) => ({
    type: SignUpActionTypes.SIGN_UP_CHANGE,
    payload: change
})