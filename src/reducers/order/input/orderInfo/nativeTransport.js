import {deepAssign} from '../../../toolFunction';

const nativeTransportReducer = (state, action) => {
  let {serviceKey, key, value} = action;
  let newServiceTypeList = state.data.serviceTypeList.map(item => {
    if (item.serviceTypeGuid === serviceKey) {
      let newServiceContent = Object.assign({}, item.serviceContent);
      newServiceContent[key] = value;
      return deepAssign(item, {serviceContent: newServiceContent});
    }else {
      return item;
    }
  });

  let newState = deepAssign(state, {serviceTypeList: newServiceTypeList}, 'data');
  return newState;
};

export default nativeTransportReducer;
