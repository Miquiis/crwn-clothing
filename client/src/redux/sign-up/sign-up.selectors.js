import { createSelector } from 'reselect';

const selectSignUp = state => state.signup;

export const selectDisplayName = createSelector(
    [selectSignUp],
    signup => signup.displayName
)

export const selectEmail = createSelector(
    [selectSignUp],
    signup => signup.email
)

export const selectPassword = createSelector(
    [selectSignUp],
    signup => signup.password
)

export const selectConfirmPassword = createSelector(
    [selectSignUp],
    signup => signup.confirmPassword
)

export const selectSignUpObject = createSelector(
    [selectSignUp],
    signup => signup
)