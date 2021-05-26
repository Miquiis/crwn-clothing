import SignUpActionTypes from "./sign-up.types"

const INITIAL_STATE = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
}

const signUpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SignUpActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: ''
            }
        case SignUpActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: action.payload
            }
        case SignUpActionTypes.SIGN_UP_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}

export default signUpReducer;