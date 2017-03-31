/*
 state结构如下：
  {
    edit,
    activePart,
    keys,
    key1(key2,key3等等),
  }
 */

const toEditState = (data, config) => {
  const edit = data ? true : false;
  const {children = {}, ...basic} = data || {};
  let state = {edit, config, activePart: config.parts[0].key, keys: []};
  return config.parts.reduce((state, part, index) => {
    state[part.key] = index === 0 ? (basic || {}) : (children[part.key] || []);
    state.keys.push(part.key);
    return state;
  }, state);
};

const toValue = (state) => {
  return state.config.parts.reduce((value, {key}) => {
    value[key] = state[key];
    return value;
  }, {});
};

const toEditParams = (state) => {
  const {activePart, config: {parts, footer}} = state;
  const value = toValue(state);
  return {activePart, parts, footer, value};
};

export {toEditState, toEditParams};
