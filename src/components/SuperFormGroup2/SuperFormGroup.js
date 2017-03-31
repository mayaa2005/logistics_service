/**
 * Created by xiaojing on 17/3/4.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormGroup, Grid, Col, ControlLabel, FormControl, option, Radio } from 'react-bootstrap';
import s from './SuperFormGroup.less';

const TypeEnum = ['readonly', 'text', 'radio', 'date', 'select'];
/**
 * key：标识该输入元素，在一个表单群中必须唯一
 * label：输入元素的标题
 * type: 输入元素的控件类型
 * bRequired: 输入元素是否必填
 * isUrl: 输入元素为select时值的类型是否为URL,默认为false
 * layoutScale: 输入元素布局比例,默认为[4, 4, 8]
 * hide：是否隐藏当前输入元素，默认为false
 * props：传递参数给被嵌入的组件
 * typeRelated的取值与type相关
 *  type为radio时，typeRelated是radio的数组：[{title:'是', value:1},{title:'否', value:0}]
 *  type为select时,typeRelated是option及相关联数据的数组,title、value为必须字段：
 *  [{title:'中国', value:'china', url:'/api/basic/client/country/china'},{title:'英国', value:'english', url:'...'}]
 */
const ItemType = {
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(TypeEnum).isRequired,
  bRequired: PropTypes.bool,
  isUrl: PropTypes.bool,
  layoutScale: PropTypes.array,
  hide: PropTypes.bool,
  props: PropTypes.object,
  typeRelated: PropTypes.any
};

/**
 *onChange: input值改变事件处理回调函数,原型为func(groupKey, index, key, isUrl, value)
 */

class SuperFormGroup extends React.Component {
  static propTypes = {
    groupKey: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(ItemType)).isRequired,
    values: PropTypes.object,
    onChange: PropTypes.func
  };

  onChange = (index, key, isUrl, event) => {
    let {groupKey, onChange} = this.props;
    if (onChange) {
      onChange(groupKey, index, key, isUrl, event.target.value);
    }
  };

  toValueCol = ({key, layoutScale=[4, 4, 8]}) => {
    let value = this.props.values[key] || '';
    return (
      <Col key={key} componentClass={ControlLabel} sm={layoutScale[2]} role="valueCol">
        {value}
      </Col>
    );
  };

  toTextCol = ({key, props, layoutScale=[4, 4, 8]},onChange) => {
    let value = this.props.values[key] || '';
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl type="text" value={value} onChange={onChange} {...props}/>
      </Col>
    );
  };

  toRadio = (value, onChange, scale, radio, index) => {
    let checked = value==''? false : radio.value == value;
    return (
      <Col key={index} sm={scale}>
        <Radio checked={checked} onChange={onChange} value={radio.value}>{radio.title}</Radio>
      </Col>
    );
  };
  toRadioCol = ({key, typeRelated=[], layoutScale=[4, 4, 8]},onChange) => {
    let value = this.props.values[key] || '';
    let scale = typeRelated.length ? 12/typeRelated.length : 12;
    return (
      <Col key={key} sm={layoutScale[2]} role="radioCol">
        {typeRelated.map(this.toRadio.bind(this, value, onChange, scale))}
      </Col>
    );
  };

  toDateCol = ({key, props, layoutScale=[4, 4, 8]},onChange) => {
    let value = this.props.values[key] || '';
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl type="date" value={value} onChange={onChange} {...props}/>
      </Col>
    );
  };

  toSelectCol = ({key, typeRelated=[], props, layoutScale=[4, 4, 8]},onChange) => {
    let value = this.props.values[key] || '';
    return (
      <Col key={key} sm={layoutScale[2]}>
        <FormControl {...props} componentClass="select" value={value} onChange={onChange}>
          {typeRelated.map((option, index) => <option key={index} value={option.value}>{option.title}</option>)}
        </FormControl>
      </Col>
    );
  };


  toLabelCol = ({ label, bRequired, layoutScale=[4, 4, 8] }, index) => {
    return (
      <Col key={index} componentClass={ControlLabel} sm={layoutScale[1]}>
        {label}:
        {bRequired ? <span key={index}>*</span> : null}
      </Col>
    );
  };
  toCellCol = (item, index, toComponent) => {
    let {key, isUrl=false, layoutScale=[4, 4, 8], hide=false} = item;
    const onChange = this.onChange.bind(this, index, key, isUrl);
    return hide ? null : (
      <Col key={index} sm={layoutScale[0]}>
        {this.toLabelCol(item, index)}
        {toComponent(item, onChange)}
      </Col>
    );
  };

  toCell = (item, index) => {
    let {type} = item;
    switch (type) {
      case 'readonly':
        return this.toCellCol(item, index, this.toValueCol);
      case 'text':
        return this.toCellCol(item, index, this.toTextCol);
      case 'radio':
        return this.toCellCol(item, index, this.toRadioCol);
      case 'date':
        return this.toCellCol(item, index, this.toDateCol);
      case 'select':
        return this.toCellCol(item, index, this.toSelectCol);
      default:
        return null;
    }
  };

  toGroup = (items) => {
    return items.map( (item, index) => {
      return this.toCell(item, index);
    });
  };

  render() {
    let {items=[], groupKey=''} = this.props;
    return (
      <FormGroup controlId={groupKey} bsSize="small" className={s.root}>
        <Grid>
          {this.toGroup(items)}
        </Grid>
      </FormGroup>
    );
  }
}

export default withStyles(s)(SuperFormGroup);
