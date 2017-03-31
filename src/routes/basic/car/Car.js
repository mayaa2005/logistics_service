import React, { PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Car.less';
import {Button, ButtonToolbar} from 'react-bootstrap';
import Search from '../../../components/Search';
import SuperTable2 from '../../../components/SuperTable2';
import SuperPagination from '../../../components/SuperPagination';
import AddCarContainer from '../add/AddCarContainer';

class Car extends React.Component {
  static propTypes = {
    init: PropTypes.bool,
    show: PropTypes.bool,
    config: PropTypes.object,
    table: PropTypes.object,
    search: PropTypes.object,
    pagination: PropTypes.object,
    toolbar: PropTypes.object,
    onInit: PropTypes.func
  };

  static events = {
    toolbar: {
      addCar: 'onAddCar'
    }
  };

  toTitle=()=>{
    return(
      <label>车辆细信息</label>
    )
  };
  toLin1=()=>{
    return(
      <hr className={s.hr1} />
    )
  };

  toSearch = (search) => {
    let newProps = Object.assign({}, search, {option: {bsSize: 'small'}});
    //console.log('ooo=',newProps);
    //const newProps = {
    //  ...search,
    //  option: {bsSize: 'small'},
    //};
    return <Search {...newProps}/>;
  };

  toButton = ({key, title, props}, bsSize) => {
    const onClick = this.props.onClick.bind(this, key);
    const btnProps = {
      ...props,
      bsSize,
      key,
      onClick
    };
    return <Button {...btnProps}>{title}</Button>;
  };

  toToolbar = (buttons) => {
    return (
      <ButtonToolbar className={s.toolbar1}>
        {buttons.map(button => this.toButton(button, 'small'))}
      </ButtonToolbar>
    );
  };

  toAddCar = () => {
    //console.log('toAddCar');
    return <AddCarContainer {...this.props.addCar}/>;
  };

  render() {
    const {search,toolbar,pagination,table} = this.props;
    //console.log('car render');
    return (
      <div className={`${s.root} modal-container`}>
        {this.toTitle()}
        {this.toLin1()}
        {this.toSearch(search)}
        <div className={s.content}>
          {this.toToolbar(toolbar.buttons)}
          <SuperTable2 cols={table.cols} items={table.items}  />
          <SuperPagination {...pagination} />
        </div>
        {this.toAddCar()}
      </div>
    );
  }
}

export default withStyles(s)(Car);
