import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import OrderInfoContainer from '../../../components/OrderInfo/OrderInfoContainer';

import JobUnit from '../../../components/JobUnit';
import s from './JobInfo.less';

//作业单元配置数据,先静态加载，测试布局
import configDemo from '../../../api/order/job/jobUnitConfig/configDemo';
import jobUnit1 from '../../../api/order/job/jobUnitConfig/jobUnit1';
import jobUnit2 from '../../../api/order/job/jobUnitConfig/jobUnit2';
import jobUnit3 from '../../../api/order/job/jobUnitConfig/jobUnit3';


class JobInfo extends React.Component {

  toTabPage = (secondTabSelectKey, props) => {
    let {orderData } = props;
    let { tabKey, orderInfo, onTabCancel} = this.props;
    if (secondTabSelectKey == 'index')
    {
      return <OrderInfoContainer rootType="job" tabKey={tabKey} orderInfo={orderInfo} />;
    }else {
      switch (secondTabSelectKey) {
        case '001':
          return <JobUnit {...configDemo} />;
        case '002':
          return <JobUnit {...jobUnit1} /> ;
        case '003':
          return <JobUnit {...jobUnit2} /> ;
        case '004':
          return <JobUnit {...jobUnit3} /> ;
        default:
          return null;
      }
    }
  };

  render() {
    const {secondTabs, secondTabSelectKey, ...otherProps} = this.props.jobInfo;
    const callback = {
      onTabChange: (eventKey) => this.props.onTabChange(eventKey)
    };
    return (
      <div className={s.root}>
        <SuperTab tabs={secondTabs} activeKey={secondTabSelectKey} callback={callback}/>
        {this.toTabPage(secondTabSelectKey, otherProps)}
      </div>
    );
  }
}

export default withStyles(s)(JobInfo);
