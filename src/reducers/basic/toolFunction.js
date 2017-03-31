
const deepCopy = (p, c = {}) => {
  for (var i in p) {
    if(! p.hasOwnProperty(i)){
      continue;
    }
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
};

/**
 * (直接修改原数组) 交换对象数组的两列，对象中必须有key属性
 */
const swapItems = (arr, key1, key2) => {
  const index1 = arr.findIndex(item => item.key == key1);
  const index2 = arr.findIndex(item => item.key == key2);
  const item = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = item;
  return arr;
};

/**
 * (不会修改原对象) 为对象的关键路径赋值，且在关键路径上遇到的每个对象都会生成一个新的对象
 * value：赋予的新值，必须是一个对象
 * keyPath：不定参数，用于指定关键路径，路径中的每一个key(字符串)都是对象中的属性，如果指定的key不存在则会创建
 */
const deepAssign = (obj, value, ...keyPath) => {
  let {...newObj} = obj;
  let last = keyPath.reduce((state, key) => {
    ({...state[key]} = state[key] || {});
    return state[key];
  }, newObj);
  Object.assign(last, value);
  return newObj;
};

/**
 * 获取对象关键路径的值，不存在则返回undefined
 */
const getValue = (obj, ...keyPath) => {
  let value = obj;
  for (const key of keyPath) {
    if (!keyPath || typeof value !== 'object') {
      return
    } else {
      value = value[key];
    }
  }
  return value;
};

export {swapItems, deepAssign, getValue};
