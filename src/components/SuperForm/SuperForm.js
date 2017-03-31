import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SuperForm.less';
import {FormControl, FormGroup} from 'react-bootstrap';
import SuperRadio from '../SuperRadio';

const ControlType = {
  key: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'select', 'radio']),
  title: PropTypes.string.isRequired,
  props: PropTypes.object,
  option: PropTypes.any
};

class SuperForm extends React.Component {
  static propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape(ControlType)).isRequired,
    value: PropTypes.object,
    bsSize: PropTypes.string,
    onChange: PropTypes.func
  };

  bindChangeEvent = (key) => {
    const onEvent = this.props['onChange'];
    const func = (e) => onEvent(key, e.target.value);
    return onEvent ? func : null;
  };

  toOption = ({value, title}, reactKey) => {
    return <option key={reactKey} value={value}>{title}</option>;
  };

  toSelect = (reactKey, {key, option=[]}) => {
    const onChange = this.bindChangeEvent(key);
    const value = this.props.value[key] || '';
    return (
      <FormControl componentClass='select' key={reactKey} value={value} onChange={onChange}>
        {option.map((obj, index) => this.toOption(obj, index))}
      </FormControl>
    );
  };

  toRadio = (reactKey, name, {value, title}, checked) => {
    const props = {
      name, value, checked,
      key: reactKey,
      onChange: this.bindChangeEvent(name)
    };
    return <SuperRadio {...props}>{title}</SuperRadio>;
  };

  toRadioGroup = (reactKey, {key, option=[]}, value) => {
    return (
      <div key={reactKey} role='radios'>
        {option.map((obj, index) => this.toRadio(index, key, obj, obj.value === value))}
      </div>
    );
  };

  toTextInput = (reactKey, {key}, value) => {
    const onChange = this.bindChangeEvent(key);
    return <FormControl type='text' key={reactKey} value={value} onChange={onChange} />;
  };

  toControl = (reactKey, control) => {
    const value = this.props.value[control.key] || '';
    switch (control.type) {
    case 'select':
      return this.toSelect(reactKey, control, value);
    case 'radio':
      return this.toRadioGroup(reactKey, control, value);
    default:
      return this.toTextInput(reactKey, control, value);
    }
  };

  toStatic = (reactKey, {title}) => {
    return <FormControl.Static key={reactKey}>{title}</FormControl.Static>;
  };

  toCols = (controls) => {
    let cols = [], index = 0;
    for (const control of controls) {
      cols.push(this.toStatic(index++, control));
      cols.push(this.toControl(index++, control));
      cols.push(<span key={index++}/>);
    }
    cols.pop();
    return cols;
  };

  toRow = (controls, index) => {
    return (
      <FormGroup bsSize='small' key={index}>
        {this.toCols(controls)}
      </FormGroup>
    );
  };

  toRows = (controls, num = 3) => {
    let rows = [], start = 0, rowIndex = 0, count = controls.length;
    for (start = 0; start < count; start += num) {
      rows.push(this.toRow(controls.slice(start, start + num), rowIndex));
      rowIndex++;
    }
    return rows;
  };

  render() {
    return (
      <form className={s.root}>
        {this.toRows(this.props.controls)}
      </form>
    );
  }
}

export default withStyles(s)(SuperForm);
