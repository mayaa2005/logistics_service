import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Split.less';
import SuperTab from '../../../components/SuperTab';
import ListPageContainer from './ListPageContainer';
import OrderInfoContainer from './OrderInfoContainer';

class Split extends React.Component {
  static propTypes = {
    init: PropTypes.bool,
    activeKey: PropTypes.string,
    tabs: PropTypes.array,
    props: PropTypes.object
  };

  toContent = (activeKey, props) => {
    if (activeKey === 'index') {
      return <ListPageContainer {...props} />
    } else {
      return <OrderInfoContainer {...props} />;
    }
  };

  renderPage = () => {
    const {activeKey, tabs, props, onTabChange} = this.props;
    const callback = {onTabChange};
    return (
      <div className={s.root}>
        <SuperTab activeKey={activeKey} tabs={tabs} callback={callback} />
        {this.toContent(activeKey, props)}
      </div>
    );
  };

  renderInitPage = () => {
    return <ListPageContainer init />;
  };

  render() {
    return this.props.init ? this.renderInitPage() : this.renderPage();
  }
}

export default withStyles(s)(Split);
