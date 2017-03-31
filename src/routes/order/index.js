import RouterHelper from '../RouteHelper';
import inputUrl from './input.png';

const title = '订单管理';
const prefix = '/order';

let items = [
  {key: "/input", title: "订单录入", icon: inputUrl},
  {key: "/split", title: "订单拆分", icon: inputUrl},
  {key: "/job", title: "作业单维护", icon: inputUrl},
  {key: "/settle", title: "应收预结算", icon: inputUrl}
];

let children = [
  require('./input').default,
  require('./split').default,
  require('./job').default,
  require('./settle').default
];

export default RouterHelper(prefix, title, children, items);
