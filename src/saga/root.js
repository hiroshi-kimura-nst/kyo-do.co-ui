import {fork} from 'redux-saga/effects'
import {loginSaga,logoutSaga,loginFailureSaga,loginFromRememberMeSaga} from './login'
import {loadDestinationSaga,changeDestinationSaga} from './mydestination'

/**
* Sagaの起点ポイント。ここから各Sagaをforkする
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export default function* rootSaga(){
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(loginFailureSaga);
  yield fork(loginFromRememberMeSaga);
  yield fork(loadDestinationSaga);
  yield fork(changeDestinationSaga);
}