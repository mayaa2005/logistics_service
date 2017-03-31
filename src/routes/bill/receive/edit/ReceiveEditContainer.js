/**
 * Created by pengxiaojing on 2017/3/13.
 */
import { connect } from 'react-redux';
import fetch from '../../../../core/fetch';
import ReceiveEdit from './ReceiveEdit';

const editConfig = {
  title1: '业务单据信息',
  title2: '应收明细信息',
  tabTitle1:'应付信息',
  tabTitle2:'订单信息',
  newBtn: '新建',
  copyNewBtn: '复制新增',
  deleteBtn: '删除',
  saveBtn: '保存',
  cancelBtn: '取消',
  tableCols: [
    {key: 'index', title: '序号', type: 'index'},
    {key: 'checkbox', title: '', type: 'checkbox'},
    {key: 'key1', title: '费用来源', type: "text"},
    {key: 'key2', title: '单据编号', type: "text"},
    {key: 'key3', title: '费用类型', type: "text"},
    {key: 'key4', title: '业务属性', type: "text"},
    {key: 'key5', title: '费用名称', type: "text"},
    {key: 'key6', title: '结算单位', type: "text"},
    {key: 'key7', title: '计税方式', type: "text"},
    {key: 'key8', title: '单价', type: "number", props: {real: true}},
    {key: 'key9', title: '数量', type: "number", props: {real: true}},
    {key: 'key10', title: '税率', type: "number", props: {real: true}},
    {key: 'key11', title: '税额', type: "number", props: {real: true}},
    {key: 'key12', title: '净价', type: "number", props: {real: true}},
    {key: 'key13', title: '应收金额', type: "number", props: {real: true}},
    {key: 'key14', title: '备注', type: "text"}
  ]
};
const indexConfig = {
  money: '应付总金额',
  tableCols: [
    {key: 'key1', title: '费用来源'},
    {key: 'key2', title: '单据编号'},
    {key: 'key3', title: '费用类型'},
    {key: 'key4', title: '业务属性'},
    {key: 'key5', title: '费用名称'},
    {key: 'key6', title: '计税方式'},
    {key: 'key7', title: '单价'},
    {key: 'key8', title: '数量'},
    {key: 'key9', title: '税率'},
    {key: 'key10', title: '税额'},
    {key: 'key11', title: '净价'},
    {key: 'key12', title: '应收金额'},
    {key: 'key13', title: '备注'}
  ]
};

const defaultData = {
  table: [{},{},{}],
  index:{
    table:[{},{},{},{}],
    money: '10000'
  },
  orderInfo:{}
};

const ActionType = {
  init: 'billReceiveEditInit',
  tabChange: 'billReceiveEditTabChange'
};

const onInit = () => (dispatch) => {
  let tabs = [
    {key:'index', title:editConfig.tabTitle1},
    {key:'orderInfo', title:editConfig.tabTitle2},
    {key:'others', title:'待解析订单信息作业单元'}
  ];
  const initState = {
    init: false,
    config: editConfig,
    table: defaultData.table,
    tab: {
      tabs: tabs,
      currentKey: 'index',
      index: {
        config: indexConfig,
        data: defaultData.index
      },
      //orderInfo: {
      //  config: orderInfoConfig,
      //  data: defaultData.orderInfo
      //},
      //others: {}
    }
  };
  setTimeout(() => {
    dispatch({type: ActionType.init, initState});
  }, 0);
};

const onTabChange = (currentKey) => {
  return {type: ActionType.tabChange, currentKey};
};

const mapStateToProps = (state, props) => {
  return props;
};

const actionCreators = {
  onInit: onInit,
  onTabChange: onTabChange
};

const mergeProps = (stateProps, dispatchProps) => {
  if (stateProps.init) {
    if (!global.isServer) {
      dispatchProps.onInit();
    }
  }
  return Object.assign({}, stateProps, dispatchProps);
};

const ReceiveEditContainer = connect(mapStateToProps, actionCreators, mergeProps)(ReceiveEdit);

export default ReceiveEditContainer;
