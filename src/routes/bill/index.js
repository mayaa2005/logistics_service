import RouterHelper from '../RouteHelper';

const title = '计费与对账';
const prefix = '/bill';

const items = [
  {key: '/receive', title: '应收管理', icon: '/default.png'},
  {key: '/pay', title: '应付管理', icon: '/default.png'},
  {key: '/extra', title: '额外费用', icon: '/default.png'},
  {key: '/change_receive', title: '应付改单', icon: '/default.png'},
  {key: '/change_pay', title: '应收改单', icon: '/default.png'}
];


let children = [
  require('./receive').default,
  require('./pay').default,
  require('./extra').default,
  require('./change_receive').default,
  require('./change_pay').default
];

export default RouterHelper(prefix, title, children, items);
