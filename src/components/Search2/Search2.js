import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Form, FormGroup, FormControl, Button, Col} from 'react-bootstrap';
import s from './Search2.less';

/**
 * search: 搜索按钮的标题
 * reset：重置按钮的标题
 */
const ConfigType = {
  search: PropTypes.string.isRequired,
  reset: PropTypes.string.isRequired
};

/**
 * key: 唯一标识一个表单元素
 * title：表单元素旁边的标题
 * type：表单元素的类型
 * defaultValue: 表单中的默认值
 * typeRelated：type为select时，为字符串数组；type为其他值时未使用
 * props：传递给表单元素的额外属性
 */
const FilterType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  type: PropTypes.oneOf(['text',  'select']).isRequired,
  typeRelated: PropTypes.any,
  props: PropTypes.object
};

/**
 * onSearch，点击搜索按钮时触发，原型func()
 * onReset，点击重置按钮时触发，原型为func()
 * onChange，表单控件内容改变时触发，原型为func(key, value)
 */
const CallbackType = {
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func
};

class Search2 extends React.Component {
  static propTypes = {
    config: PropTypes.shape(ConfigType).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape(FilterType)).isRequired,
    callback: PropTypes.shape(CallbackType)
  };

  onChange = (key, event) => {
    const { callback = {} } = this.props;
    if (callback.onChange) {
      callback.onChange(key, event.target.value);
    }
  };

  toButton = (key, bsStyle, onClick) => {
    const {config} = this.props;
    const bsSize = 'small';
    return <Button {...{key, bsStyle, bsSize, onClick}}>{config[key]}</Button>;
  };

  toButtons = () => {
    const {callback = {}} = this.props;
    let buttons = [];
    buttons.push(this.toButton('search', 'default', callback.onSearch));
    buttons.push(this.toButton('reset', 'default', callback.onReset));
    return buttons;
  };

  toStatic = (title) => {
    return <FormControl.Static>{title}</FormControl.Static>;
  };

  toTextInput = (value, props, onChange) => {
    return <FormControl {...props} type="text" value={value} onChange={onChange}/>;
  };

  toSelectInput = (value, props, onChange, options = []) => {
    return (
      <FormControl {...props} componentClass="select" value={value} onChange={onChange}>
        {options.map((value, index) => <option key={index}>{value}</option>)}
      </FormControl>
    );
  };

  toFormControl = ({key, type, defaultValue, typeRelated, props}) => {
    const onChange = this.onChange.bind(this, key);
    switch (type) {
    case "select":
      return this.toSelectInput(defaultValue, props, onChange, typeRelated);
    default:
      return this.toTextInput(defaultValue, props, onChange);
    }
  };


  toFormGroup = (reactKey, comp1, comp2 = null) => {
    return (
      <FormGroup key={reactKey} bsSize='small'>
        {comp1}{comp2}
      </FormGroup>
    );
  };

  toFilter = (filter, index) => {
    return this.toFormGroup(index, this.toStatic(filter.title), this.toFormControl(filter));
  };

  toFormGroups = () => {
    let {filters} = this.props;
    let groups = filters.map((filter, index) => this.toFilter(filter, index));
    groups.push(this.toFormGroup(2, this.toButtons()));
    return groups;
  };

  render() {
    return (
      <Form className={s.root}>
        {this.toFormGroups()}
      </Form>
    );
  }
}

export default withStyles(s)(Search2);
