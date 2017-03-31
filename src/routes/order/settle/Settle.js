import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import OrderSettleListContainer from './OrderSettleListContainer';
import SettleEditContainer from './SettleEditContainer';
import s from './Settle.less';


class Settle extends React.Component {
  componentDidMount() {
    this.props.onGetSettleEditUIInfo();
    this.props.onGetSettleInfo();
  };

  toTabPage = (tabKey) => {
    if (tabKey == "index") {
      return <OrderSettleListContainer /> ;
    }else {
      return <SettleEditContainer rootType="settle" tabKey={tabKey} />;
    }
  };

  render() {
    const {tabs, selectKey, onTabChange} = this.props;
    //console.log('xxx===', this.props);
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={selectKey} callback={{onTabChange}}/>
        {this.toTabPage(selectKey)}
      </div>
    );
  }
}

export default withStyles(s)(Settle);
