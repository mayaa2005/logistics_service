import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import ChangeReceiveListContainer from './ChangeReceiveListContainer';
import ChangeReceiveEditContainer from './ChangeReceiveEditContainer';
import s from './ChangeReceive.less';


class ChangeReceive extends React.Component {
  componentDidMount() {
    this.props.onGetChangeReceiveEditUIInfo();
    this.props.onGetChangeReceiveInfo();
  };

  toTabPage = (tabKey) => {
    if (tabKey == "index") {
      return <ChangeReceiveListContainer /> ;
    }else {
      return <ChangeReceiveEditContainer rootType="changeReceive" tabKey={tabKey} />;
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

export default withStyles(s)(ChangeReceive);
