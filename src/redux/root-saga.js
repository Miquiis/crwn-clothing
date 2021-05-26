import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart/cart.sagas';

import { fetchCollectionStart } from './shop/shop.sagas';
import { signupSagas } from './sign-up/sign-up.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(fetchCollectionStart),
        call(userSagas),
        call(cartSagas),
        call(signupSagas)
    ]);
};