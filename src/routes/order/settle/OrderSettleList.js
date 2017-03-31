import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import { ButtonToolbar, Button } from 'react-bootstrap';
import SuperTable from '../../../components/SuperTable';
import Search from '../../../components/Search';
import SuperPagination from '../../../components/SuperPagination';
import SetColModal from '../../../components/SetColModal';
import s from './OrderSettleList.less';

const option = {
  head: true,
  index: true,
  checkbox: true,
};

class OrderSettleList extends React.Component {
  componentDidMount() {
    this.props.onSettleListCols();
    this.props.onSettleList();
  }
  onSettingColsClick = () => {
    this.props.onChangeModalShow(true);
  };
  onHideModal = () => {
    this.props.onChangeModalShow(false);
  };

  toButtonToolbar = ( bsSize) => {
    return (
      <ButtonToolbar className={s.toolbar}>
        <Button bsSize={bsSize} onClick={this.props.onModifyOrder}>编辑</Button>
        <Button bsSize={bsSize}>审核</Button>
        <Button bsSize={bsSize}>撤销审核</Button>
        <Button bsSize={bsSize} bsStyle="primary" className={s.right} onClick={this.onSettingColsClick}>配置字段</Button>
        <SetColModal show={this.props.showModal} cols={this.props.settleListCols} onHideModal={this.onHideModal} onCheckChange={this.props.onCheckChange} />
      </ButtonToolbar>
    );
  }
  render() {
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
          {this.toButtonToolbar(bsSize)}
          <SuperTable cols={this.props.settleListCols} items={this.props.settleList} option={option} callback={callback}  />
          <SuperPagination page={pageType} config={config} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(OrderSettleList);
