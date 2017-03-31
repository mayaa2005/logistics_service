import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Transport.less';
import OrderPage from '../../../components/OrderPage';
import SplitDialogContainer from '../split/SplitDialogContainer';
import OptimizeDialogContainer from '../optimize/OptimizeDialogContainer';

class Transport extends React.Component {
  static events = {
    split: 'onSplit',
    collapse: 'onCollapse',
    optimize: 'onOptimize',
    append: 'onAppend',
    commit: 'onCommit',
    config: 'onConfig'
  };

  onBtnClick = (key) => {
    const callback = this.props[Transport.events[key]];
    if (callback) {
      callback();
    }
  };

  toOrderPage = (props) => {
    return <OrderPage {...props} onClick={this.onBtnClick}/>;
  };

  toSplitDialog = (props) => {
    return <SplitDialogContainer {...props} container={this}/>;
  };

  toOptimizeDialog = (props) => {
    return <OptimizeDialogContainer {...props} container={this}/>;
  };

  renderPage = () => {
    const {split, optimize, ...other} = this.props;
    return (
      <div className={`${s.root} modal-container`}>
        {this.toOrderPage(other)}
        {split ? this.toSplitDialog(split) : null}
        {optimize ? this.toOptimizeDialog(optimize) : null}
      </div>
    );
  };

  renderInitPage = () => {
    return <OrderPage init />;
  };

  render() {
    return this.props.init ? this.renderInitPage() : this.renderPage();
  }
}

export default withStyles(s)(Transport);
