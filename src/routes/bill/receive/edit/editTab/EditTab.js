
import React from 'react';
import withStyles from '../../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTab from  '../../../../../components/SuperTab';
import PayInfo from './PayInfo';

import s from './EditTab.less';

class EditTab extends React.Component {

  toTabPage = (currentKey) => {
    if (currentKey === "index") {
      return <PayInfo {...this.props[currentKey]} /> ;
    }else if (currentKey === "orderInfo") {
      return <p>orderInfo</p> ;
    }else {
      return <p>others</p> ;
    }
  };

  render() {
    const {tabs=[], currentKey='', onTabChange} = this.props;
    return (
      <div className={s.root}>
        <SuperTab tabs={tabs} activeKey={currentKey} callback={{onTabChange}}/>
        {this.toTabPage(currentKey)}
      </div>
    );
  }
}

export default withStyles(s)(EditTab);
