import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Form, FormGroup, FormControl, Button, Col} from 'react-bootstrap';
import NumberInput from '../NumberInput';
import s from './Search.less';

/**
 * search: 搜索按钮的标题
 * more：更多按钮的标题
 * less：更少按钮的标题
 * reset：重置按钮的标题
 */
const ConfigType = {
  search: PropTypes.string.isRequired,
  more: PropTypes.string.isRequired,
  less: PropTypes.string.isRequired,
  reset: PropTypes.string.isRequired
};

/**
 * key: 唯一标识一个表单元素
 * title：表单元素旁边的标题
 * type：表单元素的类型
 * typeRelated：type为select时，为字符串数组；type为其他值时未使用
 * props：传递给表单元素的额外属性
 */
const FilterType = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'select']).isRequired,
  typeRelated: PropTypes.any,
  props: PropTypes.object
};

const OptionType = {
  bsSize: PropTypes.oneOf(['small', 'large'])
};

/**
 * onSearch，点击搜索按钮时触发，原型func()
 * onMore，点击更多按钮时触发，原型func()
 * onLess，点击更少按钮时触发，原型为func()
 * onReset，点击重置按钮时触发，原型为func()
 * onChange，表单控件内容改变时触发，原型为func(key, value)
 */
const CallbackType = {
  onSearch: PropTypes.func,
  onMore: PropTypes.func,
  onLess: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func
};

/**
 * isMore: 为true表示显示所有filters，为false只显示filters的前4个元素
 * data：传递给filters的默认值，为key:value的形式，此处的key为FilterType中的key
 */
class Search extends React.Component {
  static propTypes = {
    config: PropTypes.shape(ConfigType).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape(FilterType)).isRequired,
    isMore: PropTypes.bool.isRequired,
    data: PropTypes.object,
    option: PropTypes.shape(OptionType),
    callback: PropTypes.shape(CallbackType)
  };

  onChange = (key, event) => {
    const { callback = {} } = this.props;
    if (callback.onChange) {
      callback.onChange(key, event.target.value);
    }
  };

  toButton = (key, bsStyle, onClick) => {
    const {config, option = {}} = this.props;
    const bsSize = option.bsSize;
    return <Button {...{key, bsStyle, bsSize, onClick}}>{config[key]}</Button>;
  };

  toButtons = () => {
    const {isMore, callback = {}} = this.props;
    let buttons = [];
    buttons.push(this.toButton('search', 'primary', callback.onSearch));
    buttons.push(this.toButton('reset', 'link', callback.onReset));
    if (isMore) {
      buttons.push(this.toButton('less', 'link', callback.onLess));
    } else {
      buttons.push(this.toButton('more', 'link', callback.onMore));
    }
    return buttons;
  };

  toStatic = (title) => {
    return <FormControl.Static>{title}</FormControl.Static>;
  };

  toTextInput = (value, props, onChange) => {
    return <FormControl {...props} type="text" value={value} onChange={onChange}/>;
  };

  toNumberInput = (value, props, onChange) => {
    return <NumberInput {...props} defaultValue={value} onChange={onChange} />
  };

  toSelectInput = (value, props, onChange, options = []) => {
    return (
      <FormControl {...props} componentClass="select" value={value} onChange={onChange}>
        {options.map((value, index) => <option key={index}>{value}</option>)}
      </FormControl>
    );
  };

  toFormControl = ({key, type, typeRelated, props}) => {
    const { data = {} } = this.props;
    const value = data[key] || '';
    const onChange = this.onChange.bind(this, key);
    switch (type) {
    case "number":
      return this.toNumberInput(value, props, onChange);
    case "select":
      return this.toSelectInput(value, props, onChange, typeRelated);
    default:
      return this.toTextInput(value, props, onChange);
    }
  };

  toFormGroup = (reactKey, comp1, comp2 = null) => {
    const {option = {}} = this.props;
    return (
      <FormGroup key={reactKey} bsSize={option.bsSize}>
        {comp1}{comp2}
      </FormGroup>
    );
  };

  toLessFilter = (filter, index) => {
    return this.toFormGroup(index, this.toStatic(filter.title), this.toFormControl(filter));
  };

  toLess = (filters) => {
    let groups = filters.slice(0, 4).map((filter, index) => this.toLessFilter(filter, index));
    groups.push(this.toFormGroup(4, this.toButtons()));
    return groups;
  };

  toMoreButtonsRow = (index) => {
    return this.toFormGroup(index, <Col xs={12}>{this.toButtons()}</Col>);
  };

  toMoreRow = (filters, index) => {
    let cols = [];

    filters.every((filter, index) => {
      cols.push(<Col xs={1} key={index * 2}>{this.toStatic(filter.title)}</Col>);
      cols.push(<Col xs={2} key={index * 2 + 1}>{this.toFormControl(filter)}</Col>);
      return true;
    });

    if (filters.length < 4) {
      cols.push(<Col xs={3} key={4 * 2}>{this.toButtons()}</Col>);
    }

    return this.toFormGroup(index, cols);
  };

  toMore = (filters) => {
    const length = filters.length;
    let rows = [], index;

    for (index = 0; index < length; index += 4) {
      rows.push(this.toMoreRow(filters.slice(index, index + 4), index));
    }

    if (index === length) {
      rows.push(this.toMoreButtonsRow(index));
    }

    return rows;
  };

  render() {
    const {isMore, filters} = this.props;
    if (isMore) {
      return <Form className={s.more} horizontal>{this.toMore(filters)}</Form>;
    } else {
      return <Form className={s.less}>{this.toLess(filters)}</Form>;
    }
  }
}

export default withStyles(s)(Search);
