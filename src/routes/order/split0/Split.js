import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import OrderListContainer from '../../../components/OrderList/OrderListContainer';
import OrderInfoContainer from '../../../components/OrderInfo/OrderInfoContainer';
import SuperTab from '../../../components/SuperTab';

import s from './Split.less';


class Split extends React.Component {
  toTabPage = (tabKey) => {
    let {orderList, orderInfoRoot} = this.props;
    let {orderInfo, goodsModalRoot, jobSplitModal} = orderInfoRoot;
    if (tabKey == "index") {
      return <OrderListContainer rootType="split" {...orderList.split} />;
    }else {
      return <OrderInfoContainer rootType="split" tabKey={tabKey} orderInfo={orderInfo[tabKey]} goodsModalRoot={goodsModalRoot} jobSplitModal={jobSplitModal[tabKey]} />;
    }
  };

  render() {
    const {tabs, selectKey} = this.props.split;
    const {onTabChange} = this.props;
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={selectKey} callback={{onTabChange}}/>
        {this.toTabPage(selectKey)}
      </div>
    );
  }
}

export default withStyles(s)(Split);
