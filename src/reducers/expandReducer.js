/**
 * Created by pengxiaojing on 2017/2/14.
 */

const expandReducer = (state = true, action) => {
  if (action.type === 'expand') {
    return !state;
  }
  return state;
};

export default expandReducer;
