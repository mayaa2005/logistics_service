import { connect } from 'react-redux';
import Home from './Home';
import fetch from '../../core/fetch';
import { getPostParam } from '../../common/common';

const ActionType = {
  login: 'login',
  inputChange: 'loginInputChange'
};

const onLogin = async (userName, password, dispatch, getState) => {
  dispatch({ type: ActionType.login });
  let res = await fetch("/api/login", getPostParam({
      account: userName,
      password: password
    })
  );
  let json = await res.json();
  console.log('login result ==', json);
  dispatch({type: ActionType.login, json: json});
};
const onInputChange = (key, value) => {
  return {
    type: ActionType.inputChange,
    key,
    value
  }
};

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.home, props);
};

const mapDispatchToProps = {
  onLogin: (userName, password) => onLogin.bind(this, userName, password),
  onInputChange: (key, value) => onInputChange(key, value)
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
