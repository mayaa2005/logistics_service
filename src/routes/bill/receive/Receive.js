/**
 * Created by pengxiaojing on 2017/3/13.
 */
import React from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../components/SuperTab';
import ReceiveEditContainer from './edit/ReceiveEditContainer';
import ListPageContainer from './main/ListPageContainer';

import s from './Receive.less';

class Receive extends React.Component {

  toTabPage = (currentKey) => {
    if (currentKey == "billReceiveIndex") {
      return <ListPageContainer {...this.props[currentKey]} />;
    }
    else {
      return <ReceiveEditContainer {...this.props[currentKey]} />;
    }
  };

  render() {
    const {init, tabs, currentKey, onTabChange} = this.props;
    if (init) return <p>加载中...</p>;
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={currentKey} callback={{onTabChange}}/>
        {this.toTabPage(currentKey)}
      </div>
    );
  }
}

export default withStyles(s)(Receive);
