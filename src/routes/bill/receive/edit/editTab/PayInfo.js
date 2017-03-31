
import React from 'react';
import withStyles from '../../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import SuperTable from  '../../../../../components/SuperTable';

import s from './PayInfo.less';

const option = {
  head: true,
  index: true,
  checkbox: false
};

class PayInfo extends React.Component {
  render() {
    const {config, data} = this.props;
    return (
      <div className={s.root}>
        <SuperTable cols={config.tableCols} items={data.table || []} option={option} />
        <p>{config.money}: {data.money}</p>
      </div>
    );
  }
}

export default withStyles(s)(PayInfo);
