import RouterHelper from '../RouteHelper';

const title = '物流计划';
const prefix = '/plan';
const planSidebar = '/api/plan/sidebar';

let children = [
  require('./transport').default
];

export default RouterHelper(prefix, title, children, planSidebar);
