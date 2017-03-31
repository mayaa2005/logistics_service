import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import ChangePayListContainer from './ChangePayListContainer';
import ChangePayEditContainer from './ChangePayEditContainer';
import s from './ChangePay.less';


class ChangePay extends React.Component {
  componentDidMount() {
    this.props.onGetChangePayEditUIInfo();
    this.props.onGetChangePayInfo();
  };
  toTabPage = (tabKey) => {
    if (tabKey == "index") {
      return <ChangePayListContainer /> ;
    }else {
      return <ChangePayEditContainer rootType="changePay" tabKey={tabKey}/>;
    }
  };

  render() {
    const {tabs, selectKey, onTabChange} = this.props;
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={selectKey} callback={{onTabChange}}/>
        {this.toTabPage(selectKey)}
      </div>
    );
  }
}

export default withStyles(s)(ChangePay);
