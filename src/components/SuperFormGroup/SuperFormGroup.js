/**
 * Created by xiaojing on 17/3/4.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormGroup, Col, ControlLabel, FormControl, option } from 'react-bootstrap';
import s from './SuperFormGroup.less';


/**
 * key：标识该输入元素，在一个表单群中必须唯一
 * label：输入元素的标题
 * bRequired: 输入元素是否必填
 * type: 输入元素的控件类型
 * options: 输入元素类型为select/superSelect时的选项,
 *          select为string数组,superSelect为[{guidKey:'',guidValue:'', nameKey:'', nameValue:''}]数组
 * layoutScale: 输入元素布局比例,默认为[4, 4, 8]
 * hide：是否隐藏当前输入元素，默认为false
 * typeRelated的取值与type相关
 *  type为select时，typeRelated(可选)是字符串数组，表示下拉列表框项的取值
 *  type为其他值时，typeRelated未使用
 * props：传递参数给被嵌入的组件
 */
const TypeEnum = ['readonly', 'text', 'number', 'select', 'superSelect'];
const ItemType = {
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bRequired: PropTypes.bool,
  type: PropTypes.oneOf(TypeEnum).isRequired,
  options: PropTypes.array,
  layoutScale: PropTypes.array,
  hide: PropTypes.bool,
  typeRelated: PropTypes.any,
  props: PropTypes.object
};

/**
 *onChange: input值改变事件处理回调函数,原型为func(groupKey, key, value)
 *onSuperChange: input类型为superSelect值改变事件处理回调函数,原型为func(groupKey, key, value) 用于触发请求更多数据
 */

class SuperFormGroup extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(ItemType)).isRequired,
    groupKey: PropTypes.string.isRequired,
    values: PropTypes.object,
    onChange: PropTypes.func,
    onSuperChange: PropTypes.func
  };

  onChange = (key, event) => {
    let {groupKey, onChange} = this.props;
    if (onChange) {
      onChange(groupKey, key, event.target.value);
    }
  };

  onSuperChange = (key, options, event) => {
    let {groupKey, onSuperChange, onChange} = this.props;
    let {value} = event.target;
    onSuperChange(groupKey, key, value);

    for (let item of options) {
      let {guidKey, guidValue, nameKey, nameValue} = item;
      if (guidValue === value) {
        onChange(groupKey, guidKey, guidValue);
        onChange(groupKey, nameKey, nameValue);
        break;
      }
    }
  };

  toSuperSelectCol = ({key, props, layoutScale, options=[]}, value) => {
    const onChange = this.onSuperChange.bind(this, key, options);
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl {...props} componentClass="select" value={value} onChange={onChange}>
          {options.map(({guidKey, guidValue, nameKey, nameValue}, index) => <option key={index} value={guidValue}>{nameValue}</option>)}
        </FormControl>
      </Col>
    );
  };

  toSelectCol = ({key, props, layoutScale, options=[]}, value) => {
    const onChange = this.onChange.bind(this, key);
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl {...props} componentClass="select" value={value} onChange={onChange}>
          {options.map((value, index) => <option key={index} value={value}>{value}</option>)}
        </FormControl>
      </Col>
    );
  };
  toTextCol = ({key, props, layoutScale}, value) => {
    const onChange = this.onChange.bind(this, key);
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl type="text" value={value} onChange={onChange} {...props}/>
      </Col>
    );
  };
  toValueCol = ({key, layoutScale}, value) => {
    return (
      <Col key={key} componentClass={ControlLabel} sm={layoutScale[2]} role="valueCol">
        {value}
      </Col>
    );
  };
  toLabelCol = (item, index) => {
    let { label, bRequired, layoutScale } = item;
    return (
      <Col key={index} componentClass={ControlLabel} sm={layoutScale[1]}>
        {label}:
        {bRequired ? <span key={index}>*</span> : null}
      </Col>
    );
  };
  toCellCol = (item, values, index, toComponent) => {
    let {key, layoutScale, hide} = item;
    if (!hide) {
      hide = false;
    }
    if (!layoutScale) {
      item.layoutScale = [4, 4, 8];
    }
    const value = values[key] || '';
    return hide ? null : (
      <Col key={index} sm={item.layoutScale[0]}>
        {this.toLabelCol(item, index)}
        {toComponent(item, value)}
      </Col>
    );
  };
  toCell = (item, values, index) => {
    let {type} = item;
    switch (type) {
      case 'text':
        return this.toCellCol(item, values, index, this.toTextCol);
      case 'select':
        return this.toCellCol(item, values, index, this.toSelectCol);
      case 'superSelect':
        return this.toCellCol(item, values, index, this.toSuperSelectCol);
      case 'readonly':
        return this.toCellCol(item, values, index, this.toValueCol);
      default:
        return null;
    }
  };
  toGroup = (items, values) => {
    return items.map( (item, index) => {
      return this.toCell(item, values, index);
    });
  };
  render() {
    let {items=[], groupKey='', values={}} = this.props;
    return (
      <FormGroup controlId={groupKey} bsSize="small" className={s.root}>
        {this.toGroup(items, values)}
      </FormGroup>
    );
  }
}

export default withStyles(s)(SuperFormGroup);
