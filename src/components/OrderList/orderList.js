/**
 * Created by pengxiaojing on 2017/2/8.
 */
import React, { PropTypes } from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button } from 'react-bootstrap';
import SuperTable from '../SuperTable';
import Search from '../Search';
import SuperPagination from '../SuperPagination';
import SetColModal from '../SetColModal';
import SuperButtonToolbar from '../SuperButtonToolbar';
import s from './orderList.less';

const option = {
  head: true,
  index: true,
  checkbox: true,
};


class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  };

  componentWillReceiveProps = (props) => {
    props.onGetUIInfo();
  };
  componentDidMount() {
    let {orderListCols, orderList, onOrderListCols, onOrderList} = this.props;
    if (!orderListCols) onOrderListCols();
    if (!orderList) onOrderList();
  }
  onSettingColsClick = () => {
    this.props.onChangeModalShow(true);
  };
  onHideModal = () => {
    this.props.onChangeModalShow(false);
  };

  onClick = (key) => {
    let {onNewOrder, onCopyNewOrder, onEditOrder, uiInfo} = this.props;
    switch (key) {
      case 'newOrder':
        return onNewOrder(uiInfo.new);
      case 'copyNew':
        return onCopyNewOrder(uiInfo.new);
      case 'edit':
        return onEditOrder();
    }
  };
  toButtonToolbar = (bsSize) => {
    let {rootType, uiInfo} = this.props;
    let buttons = [];
    switch (rootType) {
      case 'input':
        buttons = [
          {key:'newOrder', title:uiInfo.newBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'copyNew', title:uiInfo.copyNewBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'edit', title:uiInfo.editBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'delete', title:uiInfo.deleteBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'import', title:uiInfo.importBtn, props:{bsStyle:'default', bsSize:bsSize}}
        ];
        break;
      case 'split':
        buttons = [
          {key:'edit', title:uiInfo.editBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'delete', title:uiInfo.deleteBtn, props:{bsStyle:'default', bsSize:bsSize}}
        ];
        break;
      case 'job':
        buttons = [
          {key:'edit', title:uiInfo.editBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'delete', title:uiInfo.deleteBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'check', title:uiInfo.checkBtn, props:{bsStyle:'default', bsSize:bsSize}},
          {key:'settle', title:uiInfo.settleBtn, props:{bsStyle:'default', bsSize:bsSize}}
        ];
        break;
    }
    return <SuperButtonToolbar buttons={buttons} inline={true} onClick={this.onClick} />;
  }
  render() {
    if (!this.props.uiInfo) {
      return <p>正在加载</p>
    }
    const bsSize = "small";
    const callback = {
      onCheck: this.props.onCheck,
      onSort: this.props.onSort,
      onSwapCol: this.props.onSwapCol
    };
    const pageType = {
      maxRecords: 100,
      currentPage: 10,
      pageSize:  10
    };
    const config = {
      pageDesp: "共有{maxRecords}条记录，当前第 {currentPage}/{totalPage} 页",
      pageGoto: {placeholder: "跳转页数", btnTitle: "确定"},
      pageSize: {start: "每页显示", end: "条"},
      prevPage: "上一页",
      nextPage: "下一页",
      firstPage: "首页",
      lastPage: "尾页"
    };
    const searchConfig = {
      search: '搜索',
      more: '更多',
      less: '简化',
      reset: '重置'
    };

    const searchItems = [
      {type: 'select', key: 'client', title: '客户', typeRelated: ['<--->', '张艳为', '彭晓静', '黄家军', '袁杰']},
      {type: 'text', key: 'loadAddress', title: '装货地'},
      {type: 'text', key: 'destination', title: '目的地'},
      {type: 'text', key: 'transport', title: '运输方式'},
      {type: 'number', key: 'more1', title: '更多1', props: {real: true, sign: true}},
      {type: 'text', key: 'more2', title: '更多2'},
      {type: 'text', key: 'more3', title: '更多3'}
    ];

    const searchProps = {
      config: searchConfig,
      filters: searchItems,
      isMore: false,
      option: {bsSize: 'small'}
    };
    return (
      <div className={s.root}>
        <div className={s.search}>
          <Search {...searchProps} />
        </div>
        <div className={s.content}>
          <div>
            {this.toButtonToolbar(bsSize)}
            <Button bsSize={bsSize} bsStyle="primary" className={s.right} onClick={this.onSettingColsClick}>配置字段</Button>
          </div>
          <SetColModal show={this.props.showModal} cols={this.props.orderListCols || []} onHideModal={this.onHideModal} onCheckChange={this.props.onCheckChange} />
          <SuperTable cols={this.props.orderListCols || []} items={this.props.orderList || []} option={option} callback={callback}  />
          <SuperPagination page={pageType} config={config} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(OrderList);
