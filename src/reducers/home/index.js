
const initState = {
  userName: '',
  password: ''
};

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'login':
      if (action.json) {
        if (action.json.return_code == 200) {
          console.log('login success !');
        } else {
          console.log('login failed !');
        }
      }
      return state;
    case 'loginInputChange':
      let {key, value} = action;
      let newState = Object.assign({}, state);
      newState[key] = value;
      return newState;
    default:
      return state;
  }
};

export default homeReducer;
