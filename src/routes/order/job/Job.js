import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import OrderListContainer from '../../../components/OrderList/OrderListContainer';
import JobInfoContainer from './JobInfoContainer';

import s from './Job.less';


class Job extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  };
  componentWillReceiveProps = (props) => {
    props.onGetJobUnitsUIInfo();
  };
  toTabPage = (tabKey) => {
    let {orderList, jobInfoRoot} = this.props;
    let {jobInfo, orderInfo} = jobInfoRoot;
    if (tabKey == "index") {
      return <OrderListContainer rootType="job" {...orderList.job} /> ;
    }else {
      return <JobInfoContainer tabKey={tabKey} jobInfo={jobInfo[tabKey]} orderInfo={orderInfo[tabKey]} /> ;
    }
  };

  render() {
    const {onTabChange} = this.props;
    const {tabs, selectKey} = this.props.job;
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={selectKey} callback={{onTabChange}}/>
        {this.toTabPage(selectKey)}
      </div>
    );
  }
}

export default withStyles(s)(Job);
