import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './ListPage.less';
import OrderPage from '../../../components/OrderPage';

class ListPage extends React.Component {
  toOrderPage = (props) => {
    return <OrderPage {...props} />;
  };

  toSearchConfigDialog = (props) => {
    return null;
  };

  toTableConfigDialog = (props) => {
    return null;
  };

  render() {
    const {searchConfig, tableConfig, ...other} = this.props;
    return (
      <div className={`${s.root} modal-container`}>
        {this.toOrderPage(other)}
        {searchConfig ? this.toSearchConfigDialog(searchConfig) : null}
        {tableConfig ? this.toTableConfigDialog(tableConfig) : null}
      </div>
    );
  }
}

export default withStyles(s)(ListPage);
