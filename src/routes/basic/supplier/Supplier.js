import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Supplier.less';
import SuperTab from '../../../components/SuperTab';
import Loading from '../../../components/Loading';
import MainPageContainer from './MainPageContainer';
import EditPageContainer from './EditPageContainer';

class Supplier extends React.Component {
  static propTypes = {
    init: PropTypes.bool,
    activeKey: PropTypes.string,
    tabs: PropTypes.array
  };

  toContent = (activeKey) => {
    if (activeKey === 'index') {
      return <MainPageContainer />
    } else {
      return <EditPageContainer />;
    }
  };

  renderPage = () => {
    const {activeKey, tabs, onTabChange} = this.props;
    const callback = {onTabChange};
    return (
      <div className={s.root}>
        <SuperTab activeKey={activeKey} tabs={tabs} callback={callback} />
        {this.toContent(activeKey)}
      </div>
    );
  };

  renderInitPage = () => {
    return <Loading />;
  };

  render() {
    return this.props.init ? this.renderInitPage() : this.renderPage();
  }
}

export default withStyles(s)(Supplier);

