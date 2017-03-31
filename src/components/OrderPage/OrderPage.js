import React, { PropTypes } from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './OrderPage.less';
import Search from '../Search';
import SuperTable from '../SuperTable';
import SuperPagination from '../SuperPagination';
import SuperToolbar from '../SuperToolbar';
import Loading from '../Loading';

const TableType = {
  cols: PropTypes.array,
  items: PropTypes.array
};

const SearchType = {
  config: PropTypes.object,
  filters: PropTypes.array,
  data: PropTypes.object,
  isMore: PropTypes.bool
};

const PaginationType = {
  config: PropTypes.object,
  pageSizeType: PropTypes.array,
  page: PropTypes.object
};

const ToolbarType = {
  buttons: PropTypes.array
};

class OrderPage extends React.Component {
  static propTypes = {
    init: PropTypes.bool,
    table: PropTypes.shape(TableType),
    search: PropTypes.shape(SearchType),
    pagination: PropTypes.shape(PaginationType),
    toolbar: PropTypes.shape(ToolbarType)
  };

  static events = {
    search: ['onChange', 'onSearch', 'onMore', 'onLess', 'onReset'],
    table: ['onCheck', 'onSort', 'onSwapCol'],
    pagination: ['onPageNumberChange', 'onPageSizeChange'],
    toolbar: ['onClick']
  };

  getCallback = (key) => {
    return OrderPage.events[key].reduce((callback, key) => {
      callback[key] = this.props[key];
      return callback;
    }, {});
  };

  toSearch = (key) => {
    const {config, filters, data, isMore} = this.props[key];
    const props = {
      config,
      filters,
      data,
      isMore,
      option: {bsSize: 'small'},
      callback: this.getCallback(key)
    };
    return <Search {...props}/>;
  };

  toLine = () => {
    return <hr role='line'/>;
  };

  toToolbar = (key) => {
    const {buttons} = this.props[key];
    const props = {
      buttons,
      option: {bsSize: 'small'},
      callback: this.getCallback(key)
    };
    return <SuperToolbar {...props} />;
  };

  toTable = (key) => {
    const {cols, items} = this.props[key];
    const props = {
      cols,
      items,
      option: {index: true, checkbox: true},
      callback: this.getCallback(key)
    };
    return <div role='container'><SuperTable {...props}/></div>;
  };

  toPagination = (key) => {
    const {config, page, pageSizeType} = this.props[key];
    const props = {
      config,
      page,
      option: {pageSizeType},
      callback: this.getCallback(key)
    };
    return <SuperPagination {...props}/>;
  };

  renderPage = () => {
    return (
      <div className={s.root}>
        {this.toSearch('search')}
        {this.toLine()}
        {this.toToolbar('toolbar')}
        {this.toTable('table')}
        {this.toPagination('pagination')}
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

export default withStyles(s)(OrderPage);
